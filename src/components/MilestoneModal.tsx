import { motion } from 'framer-motion';
import { MILESTONE_DIALOGUES } from '../data/gameData';

export default function MilestoneModal({ milestone, onClose }: { milestone: number, onClose: () => void }) {
  const dialogue = MILESTONE_DIALOGUES[milestone] || `师傅，我已经收集了${milestone}种异兽了！这大荒世界真是无奇不有！`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-[#2c2e2f]/80 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#f0ece1] w-full max-w-sm rounded-sm p-8 flex flex-col items-center text-center relative shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] border-4 border-[#d3cbb8]"
      >
        <div className="w-24 h-24 rounded-sm border-4 border-[#b84b4b] overflow-hidden mb-4 bg-[#e5dfd1] flex items-center justify-center shadow-[4px_4px_0_0_#2c2e2f]">
          {/* Medicine boy SVG head/bust */}
          <svg viewBox="0 0 100 100" className="w-20 h-20" style={{ imageRendering: 'pixelated' }}>
            {/* Simplified boy */}
            <rect x="25" y="15" width="50" height="50" fill="#fce4d6" />
            <rect x="30" y="5" width="10" height="10" fill="#2c2e2f" />
            <rect x="60" y="5" width="10" height="10" fill="#2c2e2f" />
            <rect x="35" y="40" width="30" height="5" fill="#2c2e2f" />
            <rect x="20" y="65" width="60" height="35" fill="#7a8b6c" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#b84b4b] mb-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '1px 1px 0px #d3cbb8' }}>药童的信</h3>
        <div className="text-sm text-[#6b7072] mb-6 font-mono" style={{ imageRendering: 'pixelated' }}>达成 {milestone} 收集成就</div>
        
        <p className="text-base text-[#2c2e2f] leading-loose mb-8" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          「{dialogue}」
        </p>

        <button 
          onClick={onClose}
          className="bg-[#2c2e2f] text-[#f0ece1] px-10 py-2.5 rounded-sm hover:bg-[#b84b4b] active:scale-95 transition-all shadow-[4px_4px_0_0_#d3cbb8] hover:shadow-[2px_2px_0_0_#d3cbb8] hover:translate-x-[2px] hover:translate-y-[2px] text-sm tracking-widest w-full border-2 border-[#2c2e2f] hover:border-[#b84b4b]"
          style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
        >
          继续游历
        </button>
      </motion.div>
    </motion.div>
  );
}
