import { useState } from 'react';
import { motion } from 'motion/react';
import { ENCOUNTERS, ITEMS } from '../data/gameData';
import { Leaf } from 'lucide-react';

export default function EncounterModal({ encounterId, onResolve }: { encounterId: string, onResolve: (choiceIndex: number) => void }) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  
  const encounter = ENCOUNTERS.find(e => e.id === encounterId);
  if (!encounter) return null;

  const handleChoice = (index: number) => {
    setSelectedChoice(index);
  };

  const handleClose = () => {
    if (selectedChoice !== null) {
      onResolve(selectedChoice);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-[#2c2e2f]/80 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#f0ece1] w-full max-w-sm rounded-sm p-8 flex flex-col items-center text-center relative shadow-2xl border-2 border-[#b84b4b]"
      >
        <div className="absolute -top-4 bg-[#b84b4b] text-[#f0ece1] px-4 py-1 rounded-sm text-sm tracking-widest font-bold shadow-md border border-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
          奇遇
        </div>

        <h3 className="text-2xl font-bold text-[#2c2e2f] mt-4 mb-1" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{encounter.character}</h3>
        <div className="text-xs text-[#b84b4b] mb-6 font-bold tracking-widest border-b border-[#d3cbb8] pb-2 w-full" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{encounter.title}</div>
        
        {selectedChoice === null ? (
          <>
            <p className="text-sm text-[#2c2e2f] leading-loose mb-8 text-left w-full" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              {encounter.description}
            </p>

            <div className="w-full space-y-3">
              {encounter.choices.map((choice, index) => (
                <button 
                  key={index}
                  onClick={() => handleChoice(index)}
                  className="w-full bg-[#e5dfd1] text-[#2c2e2f] px-4 py-3 rounded-sm hover:bg-[#2c2e2f] hover:text-[#f0ece1] transition-colors border border-[#d3cbb8] text-sm tracking-widest font-bold"
                  style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-[#2c2e2f] leading-loose mb-6 text-left w-full" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              {encounter.choices[selectedChoice].resultText}
            </p>

            <div className="bg-[#e5dfd1] p-4 rounded-sm border border-[#d3cbb8] w-full mb-8 flex items-center justify-center gap-2">
              <span className="text-xs text-[#6b7072]">获得:</span>
              {encounter.choices[selectedChoice].reward.type === 'herbs' ? (
                <span className="flex items-center gap-1 text-[#7a8b6c] font-bold text-sm">
                  <Leaf className="w-4 h-4" />
                  {encounter.choices[selectedChoice].reward.amount}
                </span>
              ) : (
                <span className="text-[#2c2e2f] font-bold text-sm" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
                  {ITEMS.find(i => i.id === encounter.choices[selectedChoice].reward.id)?.name} x{encounter.choices[selectedChoice].reward.amount}
                </span>
              )}
            </div>

            <button 
              onClick={handleClose}
              className="bg-[#b84b4b] text-[#f0ece1] px-10 py-2.5 rounded-sm hover:bg-[#8a3a3a] active:scale-95 transition-all shadow-md text-sm tracking-widest w-full border border-[#2c2e2f]"
              style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
            >
              拜别
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
