import { motion } from 'motion/react';
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
        className="bg-[#f0ece1] w-full max-w-sm rounded-sm p-8 flex flex-col items-center text-center relative shadow-2xl border border-[#d3cbb8]"
      >
        <div className="w-24 h-24 rounded-full border-2 border-[#b84b4b] overflow-hidden mb-4 bg-[#e5dfd1] flex items-center justify-center">
          {/* Medicine boy SVG head/bust */}
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            {/* Simplified boy */}
            <circle cx="50" cy="40" r="25" fill="#fce4d6" />
            <circle cx="35" cy="15" r="10" fill="#2c2e2f" />
            <circle cx="65" cy="15" r="10" fill="#2c2e2f" />
            <path d="M 35 40 Q 50 50 65 40" stroke="#2c2e2f" strokeWidth="2" fill="none" />
            <path d="M 20 80 Q 50 60 80 80 L 80 100 L 20 100 Z" fill="#7a8b6c" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#b84b4b] mb-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>药童的信</h3>
        <div className="text-sm text-[#6b7072] mb-6 font-mono">达成 {milestone} 收集成就</div>
        
        <p className="text-base text-[#2c2e2f] leading-loose mb-8" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          「{dialogue}」
        </p>

        <button 
          onClick={onClose}
          className="bg-[#2c2e2f] text-[#f0ece1] px-10 py-2.5 rounded-sm hover:bg-[#b84b4b] active:scale-95 transition-all shadow-md text-sm tracking-widest w-full border border-[#2c2e2f] hover:border-[#b84b4b]"
          style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
        >
          继续游历
        </button>
      </motion.div>
    </motion.div>
  );
}
