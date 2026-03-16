import { motion, AnimatePresence } from 'motion/react';
import { DIARIES } from '../data/gameData';
import { X, ScrollText } from 'lucide-react';

interface DiaryModalProps {
  diaryId: string | null;
  onClose: () => void;
}

export default function DiaryModal({ diaryId, onClose }: DiaryModalProps) {
  const diary = DIARIES.find(d => d.id === diaryId);

  return (
    <AnimatePresence>
      {diary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2c2e2f]/80 backdrop-blur-sm"
          onClick={onClose}
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
              <div className="flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-[#b84b4b]" />
                <h3 className="font-bold text-lg text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  新日记解锁！
                </h3>
              </div>
              <button onClick={onClose} className="text-[#6b7072] hover:text-[#b84b4b] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto relative z-10 flex-1 flex flex-col gap-4">
              <h4 className="text-xl font-bold text-center text-[#b84b4b] mb-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                {diary.title}
              </h4>
              <p className="text-[14px] leading-loose text-[#2c2e2f] whitespace-pre-wrap" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                {diary.content}
              </p>
            </div>
            
            <div className="p-4 bg-[#e5dfd1] border-t border-[#d3cbb8] relative z-10 shrink-0">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#2c2e2f] text-[#f0ece1] rounded-sm font-bold tracking-widest hover:bg-[#b84b4b] transition-colors"
                style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
              >
                收起日记
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
