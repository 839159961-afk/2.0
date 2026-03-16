import React from 'react';

export const PixelArtSharedDefs = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
    <defs>
      <filter id="pixelate" x="0" y="0">
        <feFlood x="4" y="4" height="2" width="2"/>
        <feComposite width="10" height="10"/>
        <feTile result="a"/>
        <feComposite in="SourceGraphic" in2="a" operator="in"/>
        <feMorphology operator="dilate" radius="5"/>
      </filter>
    </defs>
  </svg>
);

export const PixelSpring = () => (
  <div className="absolute inset-0 w-full h-full bg-[#87CEEB] overflow-hidden" style={{ imageRendering: 'pixelated' }}>
    {/* Pixel Sun */}
    <div className="absolute top-10 right-10 w-16 h-16 bg-[#FFD700] rounded-none shadow-[4px_4px_0_0_#FFA500]"></div>
    
    {/* Pixel Clouds */}
    <div className="absolute top-20 left-20 w-24 h-8 bg-white shadow-[4px_4px_0_0_#D3D3D3]">
      <div className="absolute -top-4 left-4 w-12 h-8 bg-white"></div>
      <div className="absolute -top-6 left-10 w-10 h-8 bg-white"></div>
    </div>
    <div className="absolute top-10 left-60 w-16 h-6 bg-white shadow-[4px_4px_0_0_#D3D3D3]">
      <div className="absolute -top-3 left-2 w-8 h-6 bg-white"></div>
    </div>

    {/* Pixel Mountains/Hills */}
    <div className="absolute bottom-0 w-full h-1/2">
      {/* Back Hill */}
      <div className="absolute bottom-0 left-[-10%] w-[60%] h-[80%] bg-[#2E8B57] rounded-t-full" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      {/* Middle Hill */}
      <div className="absolute bottom-0 right-[-10%] w-[70%] h-[60%] bg-[#3CB371] rounded-t-full" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      {/* Front Ground */}
      <div className="absolute bottom-0 w-full h-[40%] bg-[#90EE90] border-t-4 border-[#32CD32]"></div>
    </div>
  </div>
);

export const PixelSummer = () => (
  <div className="absolute inset-0 w-full h-full bg-[#191970] overflow-hidden" style={{ imageRendering: 'pixelated' }}>
    {/* Pixel Moon */}
    <div className="absolute top-12 left-12 w-14 h-14 bg-[#F0F8FF] rounded-full shadow-[inset_-4px_-4px_0_0_#B0C4DE]"></div>
    
    {/* Pixel Stars */}
    {[...Array(20)].map((_, i) => (
      <div key={i} className="absolute w-1 h-1 bg-white" style={{ 
        top: `${Math.random() * 60}%`, 
        left: `${Math.random() * 100}%`,
        opacity: Math.random() > 0.5 ? 1 : 0.5
      }}></div>
    ))}

    {/* Pixel Night Hills */}
    <div className="absolute bottom-0 w-full h-1/2">
      <div className="absolute bottom-0 left-[-20%] w-[80%] h-[70%] bg-[#000080]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 right-[-20%] w-[90%] h-[50%] bg-[#483D8B]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 w-full h-[30%] bg-[#2F4F4F] border-t-4 border-[#000000]"></div>
    </div>
  </div>
);

export const PixelAutumn = () => (
  <div className="absolute inset-0 w-full h-full bg-[#FFDAB9] overflow-hidden" style={{ imageRendering: 'pixelated' }}>
    {/* Pixel Sun */}
    <div className="absolute top-16 right-20 w-12 h-12 bg-[#FF8C00] shadow-[4px_4px_0_0_#D2691E]"></div>
    
    {/* Pixel Clouds/Wind */}
    <div className="absolute top-24 left-10 w-20 h-2 bg-[#FFE4B5]"></div>
    <div className="absolute top-28 left-16 w-16 h-2 bg-[#FFE4B5]"></div>

    {/* Pixel Autumn Hills */}
    <div className="absolute bottom-0 w-full h-1/2">
      <div className="absolute bottom-0 left-[-10%] w-[70%] h-[75%] bg-[#CD853F]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 right-[-10%] w-[60%] h-[65%] bg-[#D2691E]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 w-full h-[35%] bg-[#DEB887] border-t-4 border-[#8B4513]"></div>
    </div>
  </div>
);

export const PixelWinter = () => (
  <div className="absolute inset-0 w-full h-full bg-[#E0FFFF] overflow-hidden" style={{ imageRendering: 'pixelated' }}>
    {/* Pixel Snowflakes */}
    {[...Array(30)].map((_, i) => (
      <div key={i} className="absolute w-2 h-2 bg-white" style={{ 
        top: `${Math.random() * 100}%`, 
        left: `${Math.random() * 100}%`,
        opacity: Math.random() > 0.3 ? 1 : 0.6
      }}></div>
    ))}

    {/* Pixel Snow Hills */}
    <div className="absolute bottom-0 w-full h-1/2">
      <div className="absolute bottom-0 left-[-15%] w-[75%] h-[80%] bg-[#AFEEEE]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 right-[-15%] w-[85%] h-[60%] bg-[#ADD8E6]" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-0 w-full h-[40%] bg-white border-t-4 border-[#B0E0E6]"></div>
    </div>
  </div>
);

export const PIXEL_BACKGROUNDS = [
  { id: 'spring', name: '像素春山', component: PixelSpring, groundColor: '#90EE90', groundShadow: '#32CD32' },
  { id: 'summer', name: '像素星夜', component: PixelSummer, groundColor: '#2F4F4F', groundShadow: '#000000' },
  { id: 'autumn', name: '像素秋叶', component: PixelAutumn, groundColor: '#DEB887', groundShadow: '#8B4513' },
  { id: 'winter', name: '像素初雪', component: PixelWinter, groundColor: '#FFFFFF', groundShadow: '#B0E0E6' },
];
