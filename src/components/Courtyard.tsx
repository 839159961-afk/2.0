import { GameState } from '../store/useGameStore';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

export default function Courtyard({ state, onHarvest }: { state: GameState, onHarvest: () => void }) {
  const herbPositions = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    left: `${15 + (i % 4) * 20 + Math.random() * 10}%`,
    top: `${60 + Math.floor(i / 4) * 8 + Math.random() * 5}%`,
    scale: 0.6 + Math.random() * 0.4,
  })), []);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (state.boyState === 'traveling' && state.travelEndTime) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((state.travelEndTime! - Date.now()) / 1000));
        setTimeLeft(remaining);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(null);
    }
  }, [state.boyState, state.travelEndTime]);

  return (
    <div className="h-full flex flex-col relative bg-[#f0ece1]">
      
      {/* Background Landscape (Ink Wash Mountains) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
        {/* Sun/Moon */}
        <div className="absolute top-12 right-16 w-12 h-12 rounded-full bg-[#b84b4b] opacity-80 mix-blend-multiply blur-[1px]"></div>
        
        {/* Distant Mountains */}
        <svg className="absolute top-20 w-full h-64 opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 Q50,100 100,130 T200,80 T300,120 T400,90 L400,200 Z" fill="#6b7072" />
          <path d="M0,200 L0,180 Q80,120 150,160 T280,110 T400,150 L400,200 Z" fill="#4a5540" opacity="0.5" />
        </svg>

        {/* Midground Mountains */}
        <svg className="absolute top-40 w-full h-64 opacity-50" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M-50,200 L-50,120 Q30,60 120,100 T250,40 T450,110 L450,200 Z" fill="#2c2e2f" />
        </svg>

        {/* Fog/Clouds */}
        <div className="absolute top-48 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#f0ece1]/80 to-[#f0ece1] blur-md"></div>
      </div>

      {/* Interactive Garden Area (Ground) */}
      <div className="absolute bottom-0 w-full h-[45%] cursor-pointer z-10" onClick={onHarvest}>
        {/* Ground Texture */}
        <svg className="absolute bottom-0 w-full h-full opacity-20" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M0,100 Q100,80 200,110 T400,90 L400,200 L0,200 Z" fill="#7a8b6c" />
          <path d="M0,140 Q150,110 250,150 T400,130 L400,200 L0,200 Z" fill="#4a5540" />
        </svg>

        <div className="absolute top-4 left-4 text-[10px] text-[#6b7072] border border-[#d3cbb8] bg-[#f0ece1]/80 px-2 py-1 rounded pointer-events-none tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          点击庭院采摘草药
        </div>

        {/* Herbs */}
        {Array.from({ length: state.gardenHerbs }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: herbPositions[i].scale, opacity: 1, y: 0 }}
            className="absolute text-[#4a5540]"
            style={{ left: herbPositions[i].left, top: herbPositions[i].top }}
          >
            <Leaf className="w-8 h-8 fill-current drop-shadow-sm -rotate-12" />
          </motion.div>
        ))}
      </div>

      {/* Character Area */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {state.boyState === 'home' ? (
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Custom SVG Boy */}
            <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-xl">
              {/* Basket */}
              <path d="M 25 40 L 75 40 L 65 85 L 35 85 Z" fill="#8B5A2B" />
              <path d="M 25 40 Q 50 35 75 40" fill="none" stroke="#6b4423" strokeWidth="3" />
              <line x1="35" y1="40" x2="40" y2="85" stroke="#6b4423" strokeWidth="2" />
              <line x1="65" y1="40" x2="60" y2="85" stroke="#6b4423" strokeWidth="2" />
              <line x1="28" y1="55" x2="72" y2="55" stroke="#6b4423" strokeWidth="2" />
              <line x1="32" y1="70" x2="68" y2="70" stroke="#6b4423" strokeWidth="2" />
              
              {/* Body/Robe */}
              <path d="M 35 50 L 65 50 L 75 95 L 25 95 Z" fill="#7a8b6c" />
              <path d="M 45 50 L 55 50 L 60 95 L 40 95 Z" fill="#5b6b4c" opacity="0.5" />
              
              {/* Sash */}
              <rect x="30" y="65" width="40" height="6" fill="#b84b4b" />
              
              {/* Head */}
              <circle cx="50" cy="35" r="16" fill="#fce4d6" />
              
              {/* Hair Buns */}
              <circle cx="36" cy="22" r="7" fill="#2c2e2f" />
              <circle cx="64" cy="22" r="7" fill="#2c2e2f" />
              
              {/* Hair Base */}
              <path d="M 36 28 Q 50 18 64 28 A 16 16 0 0 1 36 28" fill="#2c2e2f" />
              
              {/* Face */}
              <path d="M 44 36 Q 46 34 48 36" fill="none" stroke="#2c2e2f" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 52 36 Q 54 34 56 36" fill="none" stroke="#2c2e2f" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="40" cy="40" r="2.5" fill="#ffb6c1" opacity="0.7" />
              <circle cx="60" cy="40" r="2.5" fill="#ffb6c1" opacity="0.7" />
              
              {/* Reading Book */}
              <path d="M 35 55 L 50 65 L 65 55 L 50 45 Z" fill="#f0ece1" stroke="#2c2e2f" strokeWidth="1" />
              <line x1="50" y1="45" x2="50" y2="65" stroke="#2c2e2f" strokeWidth="1" />
            </svg>
            
            <div className="mt-2 bg-[#f0ece1]/90 backdrop-blur-sm px-4 py-1.5 rounded border border-[#d3cbb8] text-[11px] font-bold text-[#2c2e2f] shadow-sm tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              药童正在研读医书
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center z-10">
            {/* Traveling Silhouette */}
            <motion.svg 
              animate={{ x: [0, 10, 0], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              viewBox="0 0 100 100" className="w-20 h-20 opacity-40 drop-shadow-md"
            >
              <path d="M 45 60 L 55 60 L 60 90 L 40 90 Z" fill="#2c2e2f" />
              <circle cx="50" cy="50" r="8" fill="#2c2e2f" />
              <path d="M 35 45 L 65 45" stroke="#2c2e2f" strokeWidth="2" strokeLinecap="round" />
              <path d="M 65 45 L 65 90" stroke="#2c2e2f" strokeWidth="1.5" />
            </motion.svg>

            <div className="mt-4 bg-[#f0ece1]/80 backdrop-blur-sm px-4 py-1.5 rounded border border-[#d3cbb8] text-[11px] font-bold text-[#6b7072] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              药童外出游历中...
            </div>
            {timeLeft !== null && (
              <div className="text-[10px] mt-2 font-mono bg-[#2c2e2f]/10 px-2 py-1 rounded text-[#4a5540]">
                预计归来: {timeLeft}s
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logs Overlay */}
      <div className="absolute bottom-24 left-6 right-6 pointer-events-none z-30">
        <div className="bg-[#f0ece1]/80 backdrop-blur-md border border-[#d3cbb8] text-[#2c2e2f] text-[11px] p-4 rounded shadow-[0_4px_15px_rgba(0,0,0,0.05)] max-h-32 overflow-hidden flex flex-col-reverse gap-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          {state.logs.map((log, i) => (
            <div key={i} className={`transition-opacity duration-300 tracking-wide ${i === 0 ? 'opacity-100 font-bold text-[#b84b4b]' : 'opacity-60'}`}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
