import { GameState } from '../store/useGameStore';
import { motion, AnimatePresence } from 'motion/react';
import { useMemo, useState, useEffect } from 'react';
import HerbGraphic from './HerbGraphic';
import { Package } from 'lucide-react';

export default function Courtyard({ 
  state, 
  onHarvest,
  hasPackage,
  onOpenPackage
}: { 
  state: GameState, 
  onHarvest: () => void,
  hasPackage: boolean,
  onOpenPackage: () => void
}) {
  const herbPositions = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    left: `${15 + (i % 4) * 20 + Math.random() * 10}%`,
    top: `${60 + Math.floor(i / 4) * 8 + Math.random() * 5}%`,
    scale: 0.5 + Math.random() * 0.3,
    rotate: -15 + Math.random() * 30,
  })), []);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  // Time of day simulation for color changes (0-24)
  const [timeOfDay, setTimeOfDay] = useState(0);

  useEffect(() => {
    // Simulate time passing for color changes
    const timeInterval = setInterval(() => {
      setTimeOfDay((prev) => (prev + 0.1) % 24);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

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

  // Calculate dynamic colors based on timeOfDay
  // Fuchun Mountains Palette: Ink wash, ochre, muted greens
  const isDay = timeOfDay > 6 && timeOfDay < 18;
  const isDawnDusk = (timeOfDay > 5 && timeOfDay <= 6) || (timeOfDay >= 18 && timeOfDay < 19);
  
  // Dynamic classes for smooth transitions
  const bgClass = isDay ? 'bg-[#e8e4d9]' : isDawnDusk ? 'bg-[#d1c7b8]' : 'bg-[#a39e93]';
  const sunMoonClass = isDay ? 'bg-[#c96a52]' : isDawnDusk ? 'bg-[#b84b4b]' : 'bg-[#e5dfd1]';
  const distantMountainClass = isDay ? 'fill-[#8c9485]' : isDawnDusk ? 'fill-[#7a7d74]' : 'fill-[#5c6366]';
  const groundClass = isDay ? 'fill-[#8b9b7c]' : isDawnDusk ? 'fill-[#7a8b6c]' : 'fill-[#5b6b4c]';

  return (
    <div className={`h-full flex flex-col relative transition-colors duration-1000 ${bgClass}`}>
      
      {/* Background Landscape (Ink Wash Mountains) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
        {/* Sun/Moon */}
        <div className={`absolute top-12 right-16 w-12 h-12 rounded-full opacity-80 mix-blend-multiply blur-[1px] transition-colors duration-1000 ${sunMoonClass}`}></div>
        
        {/* Minimalist Mountains */}
        <div className="absolute bottom-[25%] left-0 w-full h-[30%] pointer-events-none">
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={`w-full h-full ${distantMountainClass} opacity-30 transition-colors duration-1000`}>
            <path d="M0,200 Q250,50 500,150 T1000,100 L1000,200 Z" />
          </svg>
        </div>

        {/* Fog/Clouds */}
        <div className={`absolute top-48 left-0 w-full h-32 bg-gradient-to-b from-transparent via-current to-current blur-md opacity-50 transition-colors duration-1000 text-[#e8e4d9]`}></div>
      </div>

      {/* Minimalist Tree Branch & Trunk */}
      <svg className="absolute top-0 left-0 w-[40%] h-[70%] pointer-events-none z-10" viewBox="0 0 200 600" preserveAspectRatio="none">
        {/* Trunk */}
        <path d="M 0 600 L 60 600 Q 70 300 0 0 L 0 0 Z" fill="#3a3e40" opacity="0.85" />
        {/* Branch */}
        <path d="M 40 200 Q 120 180 180 250" fill="none" stroke="#3a3e40" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        {/* Leaves */}
        <circle cx="150" cy="220" r="20" fill="#4a5540" opacity="0.5" filter="blur(2px)" />
        <circle cx="180" cy="250" r="15" fill="#4a5540" opacity="0.6" filter="blur(1px)" />
        {/* Tree Hole */}
        <ellipse cx="30" cy="520" rx="15" ry="25" fill="#1a1c1d" />
      </svg>

      {/* Package in Tree Hole */}
      <AnimatePresence>
        {hasPackage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ y: { repeat: Infinity, duration: 2 }, opacity: { duration: 0.3 } }}
            className="absolute left-[5%] bottom-[20%] w-16 h-16 cursor-pointer z-30 flex items-center justify-center"
            onClick={onOpenPackage}
          >
            <div className="absolute inset-0 bg-[#e5dfd1] rounded-full blur-md opacity-70 animate-pulse"></div>
            <Package className="w-8 h-8 text-[#f4f1eb] drop-shadow-[0_0_8px_rgba(229,223,209,0.9)] relative z-10" />
            
            {/* Click me indicator */}
            <motion.div 
              className="absolute -top-6 whitespace-nowrap text-[10px] font-bold text-[#f4f1eb] bg-[#2c2e2f]/80 px-2 py-1 rounded-md tracking-widest"
              style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              发现包裹！
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Garden Area (Ground) */}
      <div className="absolute bottom-0 w-full h-[45%] cursor-pointer z-10" onClick={onHarvest}>
        {/* Ground Texture */}
        <svg className="absolute bottom-0 w-full h-full opacity-30 transition-colors duration-1000" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M0,100 Q100,80 200,110 T400,90 L400,200 L0,200 Z" className={groundClass} />
        </svg>

        <div className="absolute top-4 right-4 text-[10px] text-[#6b7072] border border-[#d3cbb8] bg-[#f0ece1]/80 px-2 py-1 rounded pointer-events-none tracking-widest shadow-sm z-20" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          点击庭院采摘草药
        </div>

        {/* Herbs */}
        {Array.from({ length: state.gardenHerbs }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: herbPositions[i].scale, opacity: 1, y: 0, rotate: herbPositions[i].rotate }}
            className="absolute"
            style={{ left: herbPositions[i].left, top: herbPositions[i].top }}
          >
            <HerbGraphic className="w-10 h-10 drop-shadow-sm" />
          </motion.div>
        ))}
      </div>

      {/* Character Area */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {state.boyState === 'home' ? (
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Minimalist Cute Boy - Reading */}
            <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-md">
              {/* Cushion */}
              <ellipse cx="50" cy="90" rx="30" ry="8" fill="#a39e93" opacity="0.5" />
              {/* Body */}
              <path d="M 30 60 Q 50 45 70 60 L 75 85 Q 50 95 25 85 Z" fill="#f4f1eb" stroke="#5c564b" strokeWidth="2" strokeLinejoin="round" />
              {/* Collar */}
              <path d="M 40 60 L 50 70 L 60 60" fill="none" stroke="#5c564b" strokeWidth="2" />
              {/* Head */}
              <circle cx="50" cy="40" r="18" fill="#fce4d6" stroke="#5c564b" strokeWidth="2" />
              {/* Hair */}
              <path d="M 32 40 Q 50 20 68 40 A 18 18 0 0 1 32 40" fill="#2c2e2f" />
              <circle cx="35" cy="22" r="7" fill="#2c2e2f" />
              <circle cx="65" cy="22" r="7" fill="#2c2e2f" />
              {/* Face */}
              <path d="M 42 42 Q 45 40 47 42" fill="none" stroke="#2c2e2f" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 53 42 Q 55 40 58 42" fill="none" stroke="#2c2e2f" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="40" cy="46" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
              <ellipse cx="60" cy="46" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
              {/* Scroll */}
              <rect x="35" y="65" width="30" height="15" fill="#e8e4d9" stroke="#5c564b" strokeWidth="1.5" transform="rotate(-10 50 72)" />
              <line x1="40" y1="68" x2="60" y2="68" stroke="#5c564b" strokeWidth="1" transform="rotate(-10 50 72)" />
              <line x1="40" y1="72" x2="55" y2="72" stroke="#5c564b" strokeWidth="1" transform="rotate(-10 50 72)" />
            </svg>
            
            <div className="mt-2 bg-[#f0ece1]/90 backdrop-blur-sm px-4 py-1.5 rounded border border-[#d3cbb8] text-[11px] font-bold text-[#2c2e2f] shadow-sm tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              药童正在研读医书
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center z-10">
            {/* Traveling Silhouette */}
            <motion.svg 
              animate={{ x: [0, 8, 0], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              viewBox="0 0 100 100" className="w-24 h-24 opacity-70 drop-shadow-md"
            >
              {/* Staff */}
              <line x1="75" y1="15" x2="60" y2="95" stroke="#5c564b" strokeWidth="3" strokeLinecap="round" />
              {/* Gourd */}
              <circle cx="71" cy="35" r="5" fill="#b84b4b" />
              <circle cx="70" cy="28" r="3" fill="#b84b4b" />
              {/* Body */}
              <path d="M 35 50 L 60 50 L 65 90 L 30 90 Z" fill="#f4f1eb" stroke="#5c564b" strokeWidth="2" strokeLinejoin="round" />
              {/* Head */}
              <circle cx="48" cy="35" r="15" fill="#fce4d6" stroke="#5c564b" strokeWidth="2" />
              {/* Hat */}
              <path d="M 25 30 Q 48 10 70 30 Z" fill="#8c9485" stroke="#5c564b" strokeWidth="2" strokeLinejoin="round" />
            </motion.svg>

            <div className="mt-4 bg-[#f0ece1]/80 backdrop-blur-sm px-4 py-1.5 rounded border border-[#d3cbb8] text-[11px] font-bold text-[#6b7072] tracking-widest shadow-sm" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
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
