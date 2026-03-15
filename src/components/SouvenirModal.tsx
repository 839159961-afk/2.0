import { BEASTS, Beast, Rarity } from '../data/gameData';
import { motion } from 'motion/react';
import LandscapeBackground from './LandscapeBackground';
import BeastGraphic from './BeastGraphic';
import { Cloud, CloudRain, Sun, Snowflake } from 'lucide-react';

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

export default function SouvenirModal({ beastId, onClose }: { beastId: string, onClose: () => void }) {
  const beast = BEASTS.find(b => b.id === beastId);
  if (!beast) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-[#2c2e2f]/80 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`bg-[#f0ece1] w-full max-w-sm rounded-sm p-8 flex flex-col items-center text-center relative shadow-2xl border-2 ${getRarityBorder(beast.rarity)}`}
      >
        <div className="absolute -top-5 bg-[#b84b4b] text-[#f0ece1] px-6 py-1.5 rounded-sm shadow-md border border-[#b84b4b] text-lg tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          药童归来
        </div>

        <div className="mt-6 mb-6 text-[11px] text-[#6b7072] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          带回了一卷新的山海图鉴
        </div>

        <div className="w-48 h-64 rounded-sm shadow-inner flex flex-col items-center justify-center text-[#f0ece1] p-4 relative overflow-hidden mb-8 border border-[#d3cbb8]">
          <div className="absolute inset-0">
            <LandscapeBackground weather={beast.weather} colors={beast.colors} />
          </div>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
          
          {/* Beast Graphic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BeastGraphic seed={beast.shapeSeed} className="w-3/4 h-3/4" />
          </div>

          {/* Weather Badge */}
          <div className="absolute top-2 right-2 bg-[#f0ece1]/80 backdrop-blur-sm px-1.5 py-1 rounded-sm border border-[#d3cbb8] flex flex-col items-center gap-1 shadow-sm">
            <WeatherIcon weather={beast.weather} className="w-3 h-3 text-[#2c2e2f]" />
            <span className="text-[8px] font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              <WeatherLabel weather={beast.weather} />
            </span>
          </div>

          {/* Rarity Badge */}
          <div className="absolute top-2 left-2 bg-[#f0ece1]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-sm border border-[#d3cbb8] shadow-sm">
            <span className="text-[10px] font-bold" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              <RarityLabel rarity={beast.rarity} />
            </span>
          </div>

          <h3 className="font-bold text-3xl tracking-[0.5em] relative z-10 drop-shadow-md text-white pointer-events-none" style={{ writingMode: 'vertical-rl', fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{beast.name}</h3>
        </div>

        <div className="bg-[#e5dfd1] w-full p-5 rounded-sm mb-8 relative border border-[#d3cbb8]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2c2e2f] text-[#f0ece1] text-[10px] px-3 py-0.5 rounded-sm tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>山海经载</div>
          <p className="text-[11px] text-[#4a5540] leading-relaxed mt-1" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
            「{beast.shanhaijingRecord}」
          </p>
        </div>

        <button 
          onClick={onClose}
          className="bg-[#2c2e2f] text-[#f0ece1] px-10 py-2.5 rounded-sm hover:bg-[#b84b4b] active:scale-95 transition-all shadow-md text-sm tracking-widest w-full border border-[#2c2e2f] hover:border-[#b84b4b]"
          style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
        >
          收下
        </button>
      </motion.div>
    </motion.div>
  );
}
