import { GameState } from '../store/useGameStore';
import { ITEMS } from '../data/gameData';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function Bag({ state, onPack, onUnpack }: { state: GameState, onPack: (id: string, type: 'food'|'tool') => void, onUnpack: (type: 'food'|'tool') => void }) {
  const packedFood = state.bag.food ? ITEMS.find(i => i.id === state.bag.food) : null;
  const packedTool = state.bag.tool ? ITEMS.find(i => i.id === state.bag.tool) : null;

  const inventoryItems = Object.entries(state.inventory)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => ({ item: ITEMS.find(i => i.id === id)!, count }));

  return (
    <div className="p-6 h-full flex flex-col pb-28 bg-[#f0ece1]">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif', textShadow: '2px 2px 0px #d3cbb8' }}>
        <span className="w-1 h-6 bg-[#7a8b6c] inline-block shadow-[2px_2px_0_0_#2c2e2f]"></span>
        行囊
      </h2>
      <p className="text-[11px] text-[#6b7072] mb-8 leading-relaxed">
        为药童准备出行的物品。必须携带干粮方可远行，佩戴道具可引来奇遇。
      </p>

      {/* Bag Slots */}
      <div className="flex gap-4 mb-10">
        <div className="flex-1 bg-[#f7f5ef] rounded-sm p-4 border-2 border-[#2c2e2f] flex flex-col items-center justify-center relative min-h-[130px] shadow-[4px_4px_0_0_#d3cbb8]">
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#b84b4b]"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#b84b4b]"></div>
          
          <span className="absolute top-3 left-3 text-[10px] font-bold text-[#b84b4b] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>干粮</span>
          
          {packedFood ? (
            <>
              <div className="text-5xl mb-3 drop-shadow-sm" style={{ imageRendering: 'pixelated' }}>{packedFood.icon}</div>
              <span className="text-xs font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{packedFood.name}</span>
              <button onClick={() => onUnpack('food')} className="absolute -top-3 -right-3 bg-[#f0ece1] text-[#2c2e2f] border-2 border-[#2c2e2f] rounded-sm p-1 shadow-[2px_2px_0_0_#2c2e2f] hover:bg-[#b84b4b] hover:text-white hover:border-[#b84b4b] active:scale-95 transition-all">
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <span className="text-[11px] text-[#a0a096] italic" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>空置</span>
          )}
        </div>

        <div className="flex-1 bg-[#f7f5ef] rounded-sm p-4 border-2 border-[#2c2e2f] flex flex-col items-center justify-center relative min-h-[130px] shadow-[4px_4px_0_0_#d3cbb8]">
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#7a8b6c]"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#7a8b6c]"></div>
          
          <span className="absolute top-3 left-3 text-[10px] font-bold text-[#7a8b6c] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>道具</span>
          
          {packedTool ? (
            <>
              <div className="text-5xl mb-3 drop-shadow-sm" style={{ imageRendering: 'pixelated' }}>{packedTool.icon}</div>
              <span className="text-xs font-bold text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{packedTool.name}</span>
              <button onClick={() => onUnpack('tool')} className="absolute -top-3 -right-3 bg-[#f0ece1] text-[#2c2e2f] border-2 border-[#2c2e2f] rounded-sm p-1 shadow-[2px_2px_0_0_#2c2e2f] hover:bg-[#b84b4b] hover:text-white hover:border-[#b84b4b] active:scale-95 transition-all">
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <span className="text-[11px] text-[#a0a096] italic" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>空置</span>
          )}
        </div>
      </div>

      {/* Inventory */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-sm font-bold text-[#2c2e2f] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
            库藏
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-[#d3cbb8] to-transparent"></div>
        </div>

        {inventoryItems.length === 0 ? (
          <div className="text-center text-[#a0a096] text-xs py-12 bg-[#f7f5ef] rounded-sm border-2 border-[#d3cbb8] border-dashed" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
            行囊空空如也，去集市看看吧。
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-3"
          >
            {inventoryItems.map(({ item, count }) => (
              <motion.button
                variants={itemAnim}
                key={item.id}
                onClick={() => onPack(item.id, item.type)}
                className="bg-[#f7f5ef] p-3 rounded-sm shadow-[2px_2px_0_0_#d3cbb8] border-2 border-[#2c2e2f] flex flex-col items-center gap-2 hover:border-[#b84b4b] hover:shadow-[2px_2px_0_0_#b84b4b] active:scale-95 transition-all relative group"
              >
                <div className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform" style={{ imageRendering: 'pixelated' }}>{item.icon}</div>
                <span className="text-[10px] font-medium truncate w-full text-center text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{item.name}</span>
                <span className="absolute -top-2 -right-2 bg-[#2c2e2f] text-[#f0ece1] text-[10px] font-mono w-5 h-5 rounded-sm flex items-center justify-center border-2 border-[#f0ece1] shadow-[2px_2px_0_0_#2c2e2f]">
                  {count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
