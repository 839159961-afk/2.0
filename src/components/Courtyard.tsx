import { GameState } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Image as ImageIcon, X, Check } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { PIXEL_BACKGROUNDS, PixelArtSharedDefs } from './PixelBackgrounds';

export default function Courtyard({ state, onHarvest }: { state: GameState, onHarvest: () => void }) {
  const herbPositions = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    left: `${15 + (i % 4) * 20 + Math.random() * 10}%`,
    top: `${60 + Math.floor(i / 4) * 8 + Math.random() * 5}%`,
    scale: 0.6 + Math.random() * 0.4,
  })), []);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  // Custom background state
  const [bgId, setBgId] = useState<string>('spring');
  const [showBgSelector, setShowBgSelector] = useState(false);

  const currentBg = PIXEL_BACKGROUNDS.find(b => b.id === bgId) || PIXEL_BACKGROUNDS[0];
  const BgComponent = currentBg.component;

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
      <PixelArtSharedDefs />
      
      {/* Background Landscape */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={bgId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <BgComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Settings Button for Background */}
      <div className="absolute top-4 right-4 z-40">
        <button 
          onClick={() => setShowBgSelector(true)}
          className="p-2 bg-[#f0ece1]/80 backdrop-blur-sm border border-[#d3cbb8] rounded-sm text-[#6b7072] hover:text-[#2c2e2f] hover:border-[#2c2e2f] transition-colors shadow-sm"
          title="更换庭院背景"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Background Selector Modal */}
      <AnimatePresence>
        {showBgSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-4 z-50 bg-[#f0ece1] p-3 rounded-sm border-2 border-[#d3cbb8] shadow-xl w-48 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>更换庭院背景</span>
              <button onClick={() => setShowBgSelector(false)} className="text-[#6b7072] hover:text-[#b84b4b]">
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {PIXEL_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setBgId(bg.id);
                    setShowBgSelector(false);
                  }}
                  className={`text-left px-3 py-2 text-[11px] rounded-sm transition-colors border ${
                    bgId === bg.id 
                      ? 'bg-[#2c2e2f] text-[#f0ece1] border-[#2c2e2f]' 
                      : 'bg-[#e5dfd1] text-[#2c2e2f] border-[#d3cbb8] hover:border-[#2c2e2f]'
                  }`}
                  style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Garden Area (Ground) */}
      <div className="absolute bottom-0 w-full h-[45%] cursor-pointer z-10" onClick={onHarvest}>
        {/* Pixel Ground Texture */}
        <div className="absolute bottom-0 w-full h-full opacity-80" style={{ backgroundColor: currentBg.groundColor, imageRendering: 'pixelated' }}>
          {/* Simple pixel pattern for ground */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(${currentBg.groundShadow} 2px, transparent 2px)`,
            backgroundSize: '16px 16px',
            opacity: 0.3
          }}></div>
        </div>

        <div className="absolute top-4 left-4 text-[10px] text-[#6b7072] border border-[#d3cbb8] bg-[#f0ece1]/80 px-2 py-1 rounded pointer-events-none tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          点击庭院采摘草药
        </div>

        {/* Herbs */}
        {Array.from({ length: state.gardenHerbs }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: herbPositions[i].scale, opacity: 1, y: 0 }}
            className="absolute"
            style={{ left: herbPositions[i].left, top: herbPositions[i].top }}
          >
            {/* Pixel Sprout */}
            <div className="relative w-6 h-6" style={{ imageRendering: 'pixelated' }}>
              <div className="absolute bottom-0 left-2 w-2 h-4 bg-[#228B22]"></div>
              <div className="absolute bottom-2 left-0 w-3 h-2 bg-[#32CD32]"></div>
              <div className="absolute bottom-3 left-3 w-3 h-2 bg-[#32CD32]"></div>
            </div>
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
            {/* Pixel Boy */}
            <div className="relative w-16 h-20" style={{ imageRendering: 'pixelated' }}>
              {/* Head */}
              <div className="absolute top-0 left-4 w-8 h-8 bg-[#FFE4C4] border-2 border-[#8B4513]"></div>
              {/* Hair */}
              <div className="absolute -top-1 left-3 w-10 h-3 bg-[#000000]"></div>
              <div className="absolute top-1 left-2 w-2 h-4 bg-[#000000]"></div>
              <div className="absolute top-1 right-2 w-2 h-4 bg-[#000000]"></div>
              {/* Eyes */}
              <div className="absolute top-3 left-5 w-1 h-1 bg-[#000000]"></div>
              <div className="absolute top-3 right-5 w-1 h-1 bg-[#000000]"></div>
              {/* Body */}
              <div className="absolute top-8 left-3 w-10 h-10 bg-[#4682B4] border-2 border-[#000080]"></div>
              {/* Sash */}
              <div className="absolute top-12 left-2 w-12 h-2 bg-[#FF4500]"></div>
              {/* Legs */}
              <div className="absolute bottom-0 left-4 w-3 h-4 bg-[#000000]"></div>
              <div className="absolute bottom-0 right-4 w-3 h-4 bg-[#000000]"></div>
            </div>
            
            <div className="mt-2 bg-[#f0ece1]/90 backdrop-blur-sm px-4 py-1.5 rounded border-2 border-[#d3cbb8] text-[11px] font-bold text-[#2c2e2f] shadow-[2px_2px_0_0_#d3cbb8] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
              药童正在研读医书
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center z-10">
            {/* Pixel Traveling Silhouette */}
            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-16 h-20 opacity-50" style={{ imageRendering: 'pixelated' }}
            >
              {/* Head */}
              <div className="absolute top-0 left-4 w-8 h-8 bg-[#000000]"></div>
              {/* Body */}
              <div className="absolute top-8 left-3 w-10 h-10 bg-[#000000]"></div>
              {/* Stick */}
              <div className="absolute top-4 left-0 w-16 h-1 bg-[#000000] rotate-45 origin-top-left"></div>
              {/* Bundle */}
              <div className="absolute top-12 left-10 w-6 h-6 bg-[#000000] rounded-sm"></div>
              {/* Legs */}
              <div className="absolute bottom-0 left-4 w-3 h-4 bg-[#000000]"></div>
              <div className="absolute bottom-0 right-4 w-3 h-4 bg-[#000000]"></div>
            </motion.div>

            <div className="mt-4 bg-[#f0ece1]/80 backdrop-blur-sm px-4 py-1.5 rounded border-2 border-[#d3cbb8] text-[11px] font-bold text-[#6b7072] shadow-[2px_2px_0_0_#d3cbb8] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
              药童外出游历中...
            </div>
            {timeLeft !== null && (
              <div className="text-[10px] mt-2 font-mono bg-[#2c2e2f]/10 px-2 py-1 rounded text-[#4a5540] border border-[#d3cbb8]" style={{ imageRendering: 'pixelated' }}>
                预计归来: {timeLeft}s
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logs Overlay */}
      <div className="absolute bottom-24 left-6 right-6 pointer-events-none z-30">
        <div className="bg-[#f0ece1]/90 backdrop-blur-md border-2 border-[#d3cbb8] text-[#2c2e2f] text-[11px] p-4 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-h-32 overflow-hidden flex flex-col-reverse gap-2 relative" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          {/* Scroll decorative edges */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d3cbb8] via-[#e5dfd1] to-[#d3cbb8]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d3cbb8] via-[#e5dfd1] to-[#d3cbb8]"></div>
          
          {state.logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === 0 ? 1 : 0.6, x: 0 }}
              className={`transition-all duration-300 tracking-wide ${i === 0 ? 'font-bold text-[#b84b4b]' : ''}`}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
