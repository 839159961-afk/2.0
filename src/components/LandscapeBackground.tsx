import { Weather } from '../data/gameData';

interface Props {
  weather: Weather;
  colors: {
    sky: string;
    mountainFar: string;
    mountainMid: string;
    mountainNear: string;
  };
  className?: string;
}

export default function LandscapeBackground({ weather, colors, className = '' }: Props) {
  return (
    <svg className={`w-full h-full ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <pattern id="rain-pattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
        </pattern>
        
        <pattern id="snow-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.8" fill="#ffffff" opacity="0.9" />
          <circle cx="14" cy="12" r="1.2" fill="#ffffff" opacity="0.7" />
          <circle cx="8" cy="18" r="0.6" fill="#ffffff" opacity="0.8" />
        </pattern>
      </defs>

      {/* Sky Base */}
      <rect width="100" height="100" fill={colors.sky} />

      {/* Weather specific sky elements */}
      {weather === 'sunny' && (
        <circle cx="75" cy="25" r="12" fill="#b84b4b" opacity="0.85" filter="url(#brush-texture)" />
      )}
      {weather === 'cloudy' && (
        <g opacity="0.8" filter="url(#brush-texture)">
          <path d="M -10 15 Q 20 0 50 15 T 110 10 L 110 -10 L -10 -10 Z" fill="#ffffff" />
          <path d="M -10 25 Q 30 10 60 25 T 120 15 L 120 -10 L -10 -10 Z" fill="#e5dfd1" opacity="0.9" />
        </g>
      )}

      {/* Mountains with brush filter */}
      <g filter="url(#brush-texture)">
        {/* Far Mountain */}
        <path d="M -10 60 Q 15 35 35 55 T 80 45 T 120 60 L 120 110 L -10 110 Z" fill={colors.mountainFar} opacity="0.7" />
        {/* Mid Mountain */}
        <path d="M -10 75 Q 25 45 50 70 T 100 55 T 120 75 L 120 110 L -10 110 Z" fill={colors.mountainMid} opacity="0.85" />
        {/* Near Mountain */}
        <path d="M -10 95 Q 35 65 65 90 T 120 80 L 120 110 L -10 110 Z" fill={colors.mountainNear} />
      </g>

      {/* Weather Overlays */}
      {weather === 'rainy' && <rect width="100" height="100" fill="url(#rain-pattern)" />}
      {weather === 'snowy' && <rect width="100" height="100" fill="url(#snow-pattern)" />}
      
      {/* Birds for sunny/cloudy */}
      {(weather === 'sunny' || weather === 'cloudy') && (
        <g stroke="#2c2e2f" strokeWidth="0.5" fill="none" opacity="0.6">
          <path d="M 20 25 Q 22 22 24 25 Q 26 22 28 25" />
          <path d="M 26 20 Q 28 17 30 20 Q 32 17 34 20" />
        </g>
      )}
    </svg>
  );
}
