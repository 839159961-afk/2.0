import React, { useEffect, useRef } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const ANIMALS = ['🦊', '🦌', '🐇', '🦋', '🐟', '🐉', '🐢', '🦅'];

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on base canvas
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 4000; // Reduced for performance and chunkier look
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      friction: number;
      ease: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.tx = this.x;
        this.ty = this.y;
        this.vx = 0;
        this.vy = 0;
        const colors = [
          '#2c2e2f', // Dark
          '#4a5540', // Greenish
          '#b84b4b', // Reddish
          '#d3cbb8', // Light brown
          '#e5dfd1'  // Very light
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() > 0.8 ? 12 : 6; // Larger, more pixelated sizes
        this.friction = Math.random() * 0.04 + 0.9; // 0.9 to 0.94
        this.ease = Math.random() * 0.02 + 0.01;   // 0.01 to 0.03
      }

      update(mouseX: number, mouseY: number) {
        // Mouse repulsion
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150;
          this.vx -= (dxMouse / distMouse) * force * 5;
          this.vy -= (dyMouse / distMouse) * force * 5;
        }

        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        this.vx += dx * this.ease;
        this.vy += dy * this.ease;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        // Snap to grid for pixel art feel
        const snapX = Math.round(this.x / 4) * 4;
        const snapY = Math.round(this.y / 4) * 4;
        ctx.fillRect(snapX, snapY, this.size, this.size);
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function getPointsFromText(text: string) {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!octx) return [];

      octx.fillStyle = 'black';
      octx.fillRect(0, 0, width, height);
      octx.fillStyle = 'white';
      
      const fontSize = Math.min(width, height) * 0.6;
      octx.font = `bold ${fontSize}px sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(text, width / 2, height / 2 - 20);

      const imageData = octx.getImageData(0, 0, width, height).data;
      const points = [];
      
      // Sample points based on screen size to roughly match particle count
      const step = Math.max(2, Math.floor(Math.min(width, height) / 150)); 
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData[(y * width + x) * 4];
          if (alpha > 128) {
            points.push({ x, y });
          }
        }
      }
      return points;
    }

    let currentAnimalIndex = 0;
    let animationFrameId: number;

    function changeShape() {
      const points = getPointsFromText(ANIMALS[currentAnimalIndex]);
      if (points.length > 0) {
        // Shuffle points
        for (let i = points.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [points[i], points[j]] = [points[j], points[i]];
        }

        particles.forEach((p, i) => {
          const target = points[i % points.length];
          // Add some noise to the target position for a more organic look
          p.tx = target.x + (Math.random() - 0.5) * 20;
          p.ty = target.y + (Math.random() - 0.5) * 20;
        });
      }

      currentAnimalIndex = (currentAnimalIndex + 1) % ANIMALS.length;
    }

    // Initial shape
    changeShape();
    const intervalId = setInterval(changeShape, 5000);

    let mouseX = -1000;
    let mouseY = -1000;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

    function animate() {
      // Solid background for pixel art feel
      ctx.fillStyle = '#f0ece1'; 
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      changeShape();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f0ece1] overflow-hidden">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
      
      <div className="z-20 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[0.3em] text-[#2c2e2f] mb-16 drop-shadow-sm" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '4px 4px 0px #d3cbb8' }}>
          游此山海
        </h1>
        
        <button 
          onClick={onEnter}
          className="pointer-events-auto px-12 py-4 bg-[#f0ece1] text-[#b84b4b] transition-all duration-300 tracking-[0.4em] border-4 border-[#b84b4b] shadow-[4px_4px_0_0_#b84b4b] hover:translate-y-1 hover:shadow-[0_0_0_0_#b84b4b]"
          style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}
        >
          入梦
        </button>
      </div>
    </div>
  );
}
