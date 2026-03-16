import { useState } from 'react';
import { BEASTS, Beast, Rarity } from '../data/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, CloudRain, Sun, Snowflake } from 'lucide-react';
import LandscapeBackground from './LandscapeBackground';
import BeastGraphic from './BeastGraphic';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

const WeatherIcon = ({ weather, className = "" }: { weather: Beast['weather'], className?: string }) => {
  switch(weather) {
    case 'sunny': return <Sun className={className} />;
    case 'rainy': return <CloudRain className={className} />;
    case 'cloudy': return <Cloud className={className} />;
    case 'snowy': return <Snowflake className={className} />;
  }
};

const WeatherLabel = ({ weather }: { weather: Beast['weather'] }) => {
  switch(weather) {
    case 'sunny': return '晴';
    case 'rainy': return '雨';
    case 'cloudy': return '阴';
    case 'snowy': return '雪';
  }
};

const RarityLabel = ({ rarity }: { rarity: Rarity }) => {
  switch(rarity) {
    case 'common': return <span className="text-[#7a8b6c]">凡品</span>;
    case 'rare': return <span className="text-[#4a7c89]">珍品</span>;
    case 'epic': return <span className="text-[#8b5a7c]">极品</span>;
    case 'legendary': return <span className="text-[#b84b4b]">绝品</span>;
  }
};

const getRarityBorder = (rarity: Rarity) => {
  switch(rarity) {
    case 'common': return 'border-[#7a8b6c]/50';
    case 'rare': return 'border-[#4a7c89]/60';
    case 'epic': return 'border-[#8b5a7c]/70';
    case 'legendary': return 'border-[#b84b4b]/80';
  }
};

export default function Collection({ collection }: { collection: string[] }) {
  const [selectedBeast, setSelectedBeast] = useState<Beast | null>(null);

  const collectedCount = collection.length;
  const totalCount = BEASTS.length;

  return (
    <div className="p-6 h-full flex flex-col pb-28 bg-[#f0ece1]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '2px 2px 0px #d3cbb8' }}>
          <span className="w-1 h-6 bg-[#2c2e2f] inline-block shadow-[2px_2px_0_0_#d3cbb8]"></span>
          山海图鉴
        </h2>
        <span className="text-[11px] font-mono font-bold text-[#6b7072] border-2 border-[#d3cbb8] px-2 py-1 rounded-sm bg-[#e5dfd1] shadow-[2px_2px_0_0_#d3cbb8]">
          收集度: {collectedCount}/{totalCount}
        </span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 overflow-y-auto"
      >
        {BEASTS.map(beast => {
          const isUnlocked = collection.includes(beast.id);
          
          return (
            <motion.div 
              variants={itemAnim}
              key={beast.id}
              onClick={() => isUnlocked && setSelectedBeast(beast)}
              whileHover={isUnlocked ? { scale: 1.05, y: -2 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
              className={`aspect-[3/4] rounded-sm relative overflow-hidden transition-all border-2 ${isUnlocked ? `cursor-pointer shadow-[4px_4px_0_0_#d3cbb8] hover:shadow-[4px_4px_0_0_#2c2e2f] ${getRarityBorder(beast.rarity)}` : 'opacity-40 grayscale cursor-not-allowed border-dashed border-[#d3cbb8] bg-[#e5dfd1]'}`}
            >
              {isUnlocked ? (
                <>
                  <div className="absolute inset-0">
                    <LandscapeBackground weather={beast.weather} colors={beast.colors} />
                  </div>
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
                  
                  {/* Beast Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BeastGraphic seed={beast.shapeSeed} className="w-3/4 h-3/4" />
                  </div>

                  {/* Weather Badge */}
                  <div className="absolute top-2 right-2 bg-[#f0ece1]/80 backdrop-blur-sm px-1.5 py-1 rounded-sm border-2 border-[#d3cbb8] flex flex-col items-center gap-1 shadow-[2px_2px_0_0_#2c2e2f]">
                    <WeatherIcon weather={beast.weather} className="w-3 h-3 text-[#2c2e2f]" />
                    <span className="text-[8px] font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
                      <WeatherLabel weather={beast.weather} />
                    </span>
                  </div>

                  {/* Rarity Badge */}
                  <div className="absolute top-2 left-2 bg-[#f0ece1]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-sm border-2 border-[#d3cbb8] shadow-[2px_2px_0_0_#2c2e2f]">
                    <span className="text-[10px] font-bold" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
                      <RarityLabel rarity={beast.rarity} />
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-[#f0ece1] pointer-events-none">
                    <h3 className="font-bold text-2xl tracking-[0.4em] drop-shadow-md text-white" style={{ writingMode: 'vertical-rl', fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{beast.name}</h3>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                    <span className="text-[10px] font-bold bg-[#2c2e2f]/70 text-[#f0ece1] px-2 py-0.5 rounded-sm backdrop-blur-sm border-2 border-[#f0ece1]/30 tracking-widest shadow-[2px_2px_0_0_#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
                      {beast.location}
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl text-[#6b7072] font-serif opacity-50">?</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBeast && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#2c2e2f]/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedBeast(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`bg-[#f0ece1] w-full max-w-sm rounded-sm overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] border-4 ${getRarityBorder(selectedBeast.rarity)}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="h-56 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                  <LandscapeBackground weather={selectedBeast.weather} colors={selectedBeast.colors} />
                </div>
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
                
                {/* Beast Graphic */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <BeastGraphic seed={selectedBeast.shapeSeed} className="w-2/3 h-2/3" />
                </motion.div>

                {/* Weather Badge */}
                <div className="absolute top-4 left-4 bg-[#f0ece1]/80 backdrop-blur-sm px-2 py-1.5 rounded-sm border-2 border-[#d3cbb8] flex flex-col items-center gap-1 shadow-[2px_2px_0_0_#2c2e2f]">
                  <WeatherIcon weather={selectedBeast.weather} className="w-4 h-4 text-[#2c2e2f]" />
                  <span className="text-[10px] font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
                    <WeatherLabel weather={selectedBeast.weather} />
                  </span>
                </div>

                <button onClick={() => setSelectedBeast(null)} className="absolute top-4 right-4 bg-[#f0ece1]/80 text-[#2c2e2f] rounded-sm p-1.5 hover:bg-[#b84b4b] hover:text-white transition-colors backdrop-blur-sm border-2 border-[#d3cbb8] shadow-[2px_2px_0_0_#2c2e2f]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 relative">
                <div className="absolute -top-8 left-8 bg-[#f0ece1] px-4 py-2 rounded-sm shadow-[4px_4px_0_0_#d3cbb8] text-xl font-bold text-[#2c2e2f] border-2 border-[#d3cbb8] tracking-widest flex items-center gap-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '1px 1px 0px #d3cbb8' }}>
                  {selectedBeast.name}
                  <span className="text-xs border-l-2 border-[#d3cbb8] pl-2" style={{ imageRendering: 'pixelated' }}>
                    <RarityLabel rarity={selectedBeast.rarity} />
                  </span>
                </div>
                <div className="absolute -top-5 right-8 text-[10px] font-bold text-[#f0ece1] drop-shadow-md bg-[#2c2e2f]/80 px-2 py-1 rounded-sm backdrop-blur-sm border-2 border-[#f0ece1]/20 tracking-widest shadow-[2px_2px_0_0_#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>
                  {selectedBeast.location}
                </div>
                
                <div className="mt-6">
                  <p className="text-[13px] leading-loose text-[#2c2e2f] mb-8 font-medium" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                    「{selectedBeast.description}」
                  </p>
                  
                  <div className="bg-[#e5dfd1] p-5 rounded-sm border-2 border-[#d3cbb8] relative shadow-[inset_2px_2px_0_0_rgba(0,0,0,0.05)]">
                    <div className="absolute -top-3 left-4 bg-[#b84b4b] text-[#f0ece1] text-[10px] px-2 py-0.5 rounded-sm tracking-widest shadow-[2px_2px_0_0_#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', imageRendering: 'pixelated' }}>山海经载</div>
                    <p className="text-xs text-[#4a5540] leading-relaxed mt-1" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                      {selectedBeast.shanhaijingRecord}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
