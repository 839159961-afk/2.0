import { useState } from 'react';
import { PREDEFINED_DIARIES } from '../data/diaries';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ScrollText } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function DiaryList({ unlockedDiaries }: { unlockedDiaries: string[] }) {
  const [selectedDiary, setSelectedDiary] = useState<string | null>(null);

  const unlockedCount = unlockedDiaries.length;
  const totalCount = PREDEFINED_DIARIES.length;

  return (
    <div className="p-6 h-full flex flex-col pb-28 bg-[#f0ece1]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '2px 2px 0px #d3cbb8' }}>
          <span className="w-1 h-6 bg-[#2c2e2f] inline-block shadow-[2px_2px_0_0_#d3cbb8]"></span>
          游历日记
        </h2>
        <span className="text-[11px] font-mono font-bold text-[#6b7072] border-2 border-[#d3cbb8] px-2 py-1 rounded-sm bg-[#e5dfd1] shadow-[2px_2px_0_0_#d3cbb8]">
          收集度: {unlockedCount}/{totalCount}
        </span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto pr-2 space-y-3"
      >
        {PREDEFINED_DIARIES.map((diary, index) => {
          const diaryId = `pd_${index}`;
          const isUnlocked = unlockedDiaries.includes(diaryId);
          
          return (
            <motion.div 
              variants={itemAnim}
              key={diaryId}
              onClick={() => isUnlocked && setSelectedDiary(diaryId)}
              whileHover={isUnlocked ? { scale: 1.02, x: 4 } : {}}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
              className={`p-4 rounded-sm border-2 transition-all flex items-center gap-4 ${
                isUnlocked 
                  ? 'bg-[#e5dfd1] border-[#2c2e2f] cursor-pointer shadow-[4px_4px_0_0_#d3cbb8] hover:shadow-[4px_4px_0_0_#b84b4b] hover:border-[#b84b4b]' 
                  : 'bg-[#e5dfd1]/50 border-dashed border-[#d3cbb8]/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border-2 border-[#2c2e2f] shadow-[2px_2px_0_0_#2c2e2f] ${isUnlocked ? 'bg-[#b84b4b] text-[#f0ece1]' : 'bg-[#d3cbb8] text-[#f0ece1]'}`}>
                <ScrollText className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#2c2e2f] truncate" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  {isUnlocked ? diary.title : `第 ${index + 1} 篇日记`}
                </h3>
                <p className="text-xs text-[#6b7072] mt-1 truncate">
                  {isUnlocked ? diary.content.substring(0, 20) + '...' : '尚未解锁'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDiary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#2c2e2f]/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedDiary(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#f0ece1] w-full max-w-sm rounded-sm overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] border-4 border-[#2c2e2f] relative flex flex-col max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
              
              <div className="p-4 border-b-2 border-[#2c2e2f] flex justify-between items-center bg-[#e5dfd1] relative z-10 shrink-0">
                <h3 className="font-bold text-lg text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '1px 1px 0px #d3cbb8' }}>
                  {PREDEFINED_DIARIES[parseInt(selectedDiary.split('_')[1])]?.title}
                </h3>
                <button onClick={() => setSelectedDiary(null)} className="text-[#2c2e2f] hover:text-[#b84b4b] transition-colors border-2 border-transparent hover:border-[#b84b4b] rounded-sm p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto relative z-10 flex-1">
                <p className="text-[14px] leading-loose text-[#2c2e2f] whitespace-pre-wrap" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  {PREDEFINED_DIARIES[parseInt(selectedDiary.split('_')[1])]?.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
