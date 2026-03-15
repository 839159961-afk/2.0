import { useState } from 'react';
import { DIARIES } from '../data/gameData';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScrollText } from 'lucide-react';

export default function DiaryList({ unlockedDiaries }: { unlockedDiaries: string[] }) {
  const [selectedDiary, setSelectedDiary] = useState<string | null>(null);

  const unlockedCount = unlockedDiaries.length;
  const totalCount = DIARIES.length;

  return (
    <div className="p-6 h-full flex flex-col pb-28 bg-[#f0ece1]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          <span className="w-1 h-6 bg-[#2c2e2f] inline-block"></span>
          游历日记
        </h2>
        <span className="text-[11px] font-mono font-bold text-[#6b7072] border border-[#d3cbb8] px-2 py-1 rounded-sm bg-[#e5dfd1]">
          收集度: {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {DIARIES.map((diary, index) => {
          const isUnlocked = unlockedDiaries.includes(diary.id);
          
          return (
            <motion.div 
              key={diary.id}
              onClick={() => isUnlocked && setSelectedDiary(diary.id)}
              whileHover={isUnlocked ? { scale: 1.02, x: 4 } : {}}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
              className={`p-4 rounded-sm border transition-all flex items-center gap-4 ${
                isUnlocked 
                  ? 'bg-[#e5dfd1] border-[#d3cbb8] cursor-pointer shadow-sm hover:shadow-md' 
                  : 'bg-[#e5dfd1]/50 border-dashed border-[#d3cbb8]/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-[#b84b4b] text-[#f0ece1]' : 'bg-[#d3cbb8] text-[#f0ece1]'}`}>
                <ScrollText className="w-5 h-5" />
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
      </div>

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
              className="bg-[#f0ece1] w-full max-w-sm rounded-sm overflow-hidden shadow-2xl border-2 border-[#d3cbb8] relative flex flex-col max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
              
              <div className="p-4 border-b border-[#d3cbb8] flex justify-between items-center bg-[#e5dfd1] relative z-10 shrink-0">
                <h3 className="font-bold text-lg text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  {DIARIES.find(d => d.id === selectedDiary)?.title}
                </h3>
                <button onClick={() => setSelectedDiary(null)} className="text-[#6b7072] hover:text-[#b84b4b] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto relative z-10 flex-1">
                <p className="text-[14px] leading-loose text-[#2c2e2f] whitespace-pre-wrap" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  {DIARIES.find(d => d.id === selectedDiary)?.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
