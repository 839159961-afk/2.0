export default function HerbGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {/* Stem */}
      <path d="M50 90 Q50 60 45 30" fill="none" stroke="#4a5540" strokeWidth="4" strokeLinecap="round" />
      
      {/* Leaves */}
      <path d="M48 70 Q30 75 20 60 Q35 50 48 65 Z" fill="#7a8b6c" stroke="#4a5540" strokeWidth="1.5" />
      <path d="M49 50 Q70 55 80 40 Q65 30 49 45 Z" fill="#7a8b6c" stroke="#4a5540" strokeWidth="1.5" />
      <path d="M46 35 Q25 30 20 15 Q40 10 46 30 Z" fill="#8b9b7c" stroke="#4a5540" strokeWidth="1.5" />
      
      {/* Small flower/bud */}
      <circle cx="45" cy="25" r="4" fill="#b84b4b" />
      <circle cx="42" cy="22" r="3" fill="#e5dfd1" />
    </svg>
  );
}
