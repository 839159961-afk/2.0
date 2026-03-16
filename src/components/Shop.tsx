import { ITEMS, Item } from '../data/gameData';
import { Leaf } from 'lucide-react';

export default function Shop({ herbs, inventory, onBuy }: { herbs: number, inventory: Record<string, number>, onBuy: (id: string, price: number) => void }) {
  return (
    <div className="p-6 overflow-y-auto h-full pb-28 bg-[#f0ece1]">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#2c2e2f]" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
        <span className="w-1 h-6 bg-[#b84b4b] inline-block"></span>
        市集
      </h2>
      
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-bold text-[#2c2e2f] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              干粮
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[#d3cbb8] to-transparent"></div>
            <span className="text-[10px] text-[#6b7072] border border-[#d3cbb8] px-2 py-0.5 rounded-sm">远行必备</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {ITEMS.filter(i => i.type === 'food').map(item => (
              <ShopItem key={item.id} item={item} herbs={herbs} owned={inventory[item.id] || 0} onBuy={onBuy} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-bold text-[#2c2e2f] tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              行囊
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[#d3cbb8] to-transparent"></div>
            <span className="text-[10px] text-[#6b7072] border border-[#d3cbb8] px-2 py-0.5 rounded-sm">奇遇之引</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {ITEMS.filter(i => i.type === 'tool').map(item => (
              <ShopItem key={item.id} item={item} herbs={herbs} owned={inventory[item.id] || 0} onBuy={onBuy} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopItem({ item, herbs, owned, onBuy }: { key?: string, item: Item, herbs: number, owned: number, onBuy: (id: string, price: number) => void }) {
  const canAfford = herbs >= item.price;

  return (
    <div className="bg-[#f7f5ef] p-4 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 border border-[#d3cbb8] hover:border-[#b84b4b] transition-colors relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#e5dfd1] to-transparent opacity-50"></div>

      <div className="text-3xl bg-[#f0ece1] w-14 h-14 rounded-sm flex items-center justify-center border border-[#d3cbb8] shadow-inner shrink-0">
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-[#2c2e2f] truncate text-base" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{item.name}</h4>
          <span className="text-[10px] text-[#6b7072] font-mono bg-[#e5dfd1] px-1.5 py-0.5 rounded-sm border border-[#d3cbb8]">持有: {owned}</span>
        </div>
        <p className="text-[11px] text-[#6b7072] line-clamp-2 leading-relaxed">{item.description}</p>
      </div>
      <button
        onClick={() => onBuy(item.id, item.price)}
        disabled={!canAfford}
        className={`flex items-center gap-1 px-3 py-2 rounded-sm text-[11px] font-bold transition-all shrink-0 border ${
          canAfford 
            ? 'bg-[#f0ece1] text-[#2c2e2f] border-[#2c2e2f] hover:bg-[#2c2e2f] hover:text-[#f0ece1] active:scale-95' 
            : 'bg-transparent text-[#a0a096] border-[#d3cbb8] cursor-not-allowed'
        }`}
      >
        <Leaf className="w-3.5 h-3.5" />
        {item.price}
      </button>
    </div>
  );
}
