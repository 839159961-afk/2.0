import { motion } from 'framer-motion';

export default function BeastGraphic({ seed, className = "" }: { seed: number, className?: string }) {
  const type = seed % 6;
  
  const pseudoRandom = (s: number) => {
    let x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const getPath = () => {
    if (type === 0) {
      // Bird-like
      return `M 50 80 Q 30 50 10 30 Q 50 40 50 20 Q 50 40 90 30 Q 70 50 50 80`;
    } else if (type === 1) {
      // Quadruped
      return `M 20 80 Q 20 50 40 40 Q 30 20 50 30 Q 70 20 60 40 Q 80 50 80 80 Q 60 70 50 70 Q 40 70 20 80`;
    } else if (type === 2) {
      // Serpent
      return `M 20 80 Q 10 50 40 60 T 60 40 T 40 20 Q 50 10 60 20`;
    } else if (type === 3) {
      // Fish-like
      return `M 20 50 Q 50 20 80 50 Q 50 80 20 50 M 80 50 L 95 35 L 95 65 Z`;
    } else if (type === 4) {
      // Multi-tailed/tentacled
      return `M 50 30 Q 30 50 20 80 M 50 30 Q 50 60 50 90 M 50 30 Q 70 50 80 80 M 50 30 Q 50 10 50 30`;
    } else {
      // Blob/Amorphous with spikes
      return `M 50 80 Q 20 80 20 50 Q 20 20 50 20 Q 80 20 80 50 Q 80 80 50 80 M 20 50 L 5 50 M 80 50 L 95 50 M 50 20 L 50 5 M 50 80 L 50 95`;
    }
  };

  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id={`ink-wash-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="1.5" result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.g 
        filter={`url(#ink-wash-${seed})`} 
        fill="none"
        stroke="#1a1c1d"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
        animate={{ 
          y: [0, -3, 0],
          scale: [1, 1.03, 1]
        }}
        transition={{ 
          duration: 3 + pseudoRandom(seed) * 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <path d={getPath()} fill={type === 3 || type === 5 ? "#1a1c1d" : "none"} />
        {/* Ink splatters */}
        <circle cx={20 + pseudoRandom(seed)*60} cy={20 + pseudoRandom(seed+1)*60} r={pseudoRandom(seed+2)*5} fill="#1a1c1d" stroke="none" opacity="0.7" />
        <circle cx={20 + pseudoRandom(seed+3)*60} cy={20 + pseudoRandom(seed+4)*60} r={pseudoRandom(seed+5)*3} fill="#1a1c1d" stroke="none" opacity="0.5" />
        <circle cx={20 + pseudoRandom(seed+6)*60} cy={20 + pseudoRandom(seed+7)*60} r={pseudoRandom(seed+8)*2} fill="#1a1c1d" stroke="none" opacity="0.3" />
      </motion.g>
    </svg>
  );
}
