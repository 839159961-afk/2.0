import React from 'react';

export const SharedDefs = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
    <defs>
      {/* Dry brush & wet watercolor filter */}
      <filter id="q-watercolor" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.8" result="blurred" />
        <feComposite in="blurred" in2="SourceGraphic" operator="in" />
      </filter>
      {/* Soft glow for sun/moon/stars */}
      <filter id="q-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  </svg>
);

export const CuteSpring = () => (
  <div className="absolute inset-0 w-full h-full bg-[#FFF8E7] transition-colors duration-1000 overflow-hidden">
    {/* Sun */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <circle cx="80%" cy="25%" r="15%" fill="#FFDAC1" opacity="0.8" filter="url(#q-watercolor)" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="80%" cy="25%" r="10%" fill="#FFB7B2" opacity="0.9" filter="url(#q-glow)" />
      
      {/* Fluffy Clouds */}
      <g fill="#FFFFFF" opacity="0.9" filter="url(#q-watercolor)">
        <circle cx="20%" cy="20%" r="8%" />
        <circle cx="28%" cy="22%" r="6%" />
        <circle cx="15%" cy="24%" r="5%" />
        
        <circle cx="70%" cy="40%" r="6%" />
        <circle cx="76%" cy="42%" r="4%" />
      </g>
    </svg>

    {/* Soft Hills */}
    <svg className="absolute bottom-0 w-full h-[60%]" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ mixBlendMode: 'multiply' }}>
      <path d="M-50,200 Q100,50 250,120 T450,80 L450,200 Z" fill="#E2F0CB" opacity="0.8" filter="url(#q-watercolor)" />
      <path d="M-50,200 Q150,100 200,150 T450,120 L450,200 Z" fill="#B5EAD7" opacity="0.9" filter="url(#q-watercolor)" />
    </svg>
    
    {/* Foreground Wash */}
    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-[#B5EAD7] to-transparent opacity-60 blur-md pointer-events-none"></div>
  </div>
);

export const HealingSummer = () => (
  <div className="absolute inset-0 w-full h-full bg-[#2B2D42] transition-colors duration-1000 overflow-hidden">
    {/* Moon & Stars */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Big soft moon */}
      <circle cx="25%" cy="30%" r="12%" fill="#EDF2F4" opacity="0.9" filter="url(#q-glow)" />
      <circle cx="28%" cy="28%" r="10%" fill="#2B2D42" opacity="0.9" filter="url(#q-watercolor)" /> {/* Crescent cutout */}
      
      {/* Fireflies / Stars */}
      <g fill="#FFD166" filter="url(#q-glow)">
        {[...Array(15)].map((_, i) => (
          <circle key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 80}%`} r={`${Math.random() * 1.5 + 0.5}%`} opacity={Math.random() * 0.6 + 0.2} />
        ))}
      </g>
    </svg>

    {/* Night Hills */}
    <svg className="absolute bottom-0 w-full h-[60%]" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ mixBlendMode: 'screen' }}>
      <path d="M-50,200 Q100,80 200,140 T450,100 L450,200 Z" fill="#8D99AE" opacity="0.4" filter="url(#q-watercolor)" />
      <path d="M-50,200 Q180,120 250,160 T450,140 L450,200 Z" fill="#4A4E69" opacity="0.6" filter="url(#q-watercolor)" />
    </svg>
    
    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-[#2B2D42] to-transparent opacity-80 blur-md pointer-events-none"></div>
  </div>
);

export const WarmAutumn = () => (
  <div className="absolute inset-0 w-full h-full bg-[#FFF3E0] transition-colors duration-1000 overflow-hidden">
    {/* Sun & Leaves */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <circle cx="50%" cy="40%" r="25%" fill="#FFE0B2" opacity="0.6" filter="url(#q-watercolor)" style={{ mixBlendMode: 'multiply' }} />
      
      {/* Floating Leaves (Blobs) */}
      <g filter="url(#q-watercolor)" style={{ mixBlendMode: 'multiply' }}>
        {[...Array(12)].map((_, i) => (
          <ellipse key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`} rx={`${Math.random() * 3 + 2}%`} ry={`${Math.random() * 2 + 1}%`} fill={['#FFB7B2', '#FFDAC1', '#E2F0CB'][i % 3]} opacity="0.7" transform={`rotate(${Math.random() * 360} 0 0)`} />
        ))}
      </g>
    </svg>

    {/* Autumn Hills */}
    <svg className="absolute bottom-0 w-full h-[60%]" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ mixBlendMode: 'multiply' }}>
      <path d="M-50,200 Q120,60 220,130 T450,90 L450,200 Z" fill="#FFDAC1" opacity="0.8" filter="url(#q-watercolor)" />
      <path d="M-50,200 Q160,110 240,150 T450,120 L450,200 Z" fill="#FFB7B2" opacity="0.9" filter="url(#q-watercolor)" />
    </svg>
    
    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-[#FFB7B2] to-transparent opacity-50 blur-md pointer-events-none"></div>
  </div>
);

export const SoftWinter = () => (
  <div className="absolute inset-0 w-full h-full bg-[#E0F7FA] transition-colors duration-1000 overflow-hidden">
    {/* Snow & Clouds */}
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Big soft sun/glow */}
      <circle cx="70%" cy="30%" r="18%" fill="#FFFFFF" opacity="0.8" filter="url(#q-glow)" />
      
      {/* Snowflakes */}
      <g fill="#FFFFFF" filter="url(#q-glow)">
        {[...Array(20)].map((_, i) => (
          <circle key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`} r={`${Math.random() * 1.5 + 0.5}%`} opacity={Math.random() * 0.8 + 0.2} />
        ))}
      </g>
    </svg>

    {/* Snow Hills */}
    <svg className="absolute bottom-0 w-full h-[60%]" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ mixBlendMode: 'multiply' }}>
      <path d="M-50,200 Q100,70 200,120 T450,80 L450,200 Z" fill="#B2EBF2" opacity="0.6" filter="url(#q-watercolor)" />
      <path d="M-50,200 Q150,100 250,140 T450,110 L450,200 Z" fill="#E1BEE7" opacity="0.5" filter="url(#q-watercolor)" />
      <path d="M-50,200 Q200,130 300,160 T450,140 L450,200 Z" fill="#FFFFFF" opacity="0.9" filter="url(#q-watercolor)" />
    </svg>
    
    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-[#FFFFFF] to-transparent opacity-80 blur-md pointer-events-none"></div>
  </div>
);

export const BACKGROUNDS = [
  { id: 'spring', name: '软萌春山', component: CuteSpring, groundColor: '#B5EAD7', groundShadow: '#95CBA7' },
  { id: 'summer', name: '治愈星夜', component: HealingSummer, groundColor: '#4A4E69', groundShadow: '#2B2D42' },
  { id: 'autumn', name: '暖秋落叶', component: WarmAutumn, groundColor: '#FFB7B2', groundShadow: '#E5989B' },
  { id: 'winter', name: '软糯初雪', component: SoftWinter, groundColor: '#FFFFFF', groundShadow: '#E0F7FA' },
];
