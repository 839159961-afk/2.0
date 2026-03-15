import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2c2e2f] flex items-center justify-center font-serif selection:bg-[#b84b4b] selection:text-white">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:w-[420px] bg-[#f0ece1] text-[#2c2e2f] flex flex-col items-center justify-center sm:rounded-md shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-[#d3cbb8]">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center z-10"
        >
          <div className="w-24 h-24 bg-[#e5dfd1] rounded-full border border-[#d3cbb8] flex items-center justify-center mb-8 shadow-inner">
            <Leaf className="w-12 h-12 text-[#7a8b6c]" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-[0.2em] text-[#2c2e2f] drop-shadow-sm mb-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
            游此山海
          </h1>
          <p className="text-sm tracking-widest text-[#6b7072] mb-12" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
            山水之间，寻药问道
          </p>

          <button 
            onClick={handleLogin}
            className="bg-[#2c2e2f] text-[#f0ece1] px-12 py-3 rounded-sm hover:bg-[#b84b4b] active:scale-95 transition-all shadow-md text-sm tracking-widest border border-[#2c2e2f] hover:border-[#b84b4b]"
            style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}
          >
            踏入山海
          </button>
        </motion.div>
      </div>
    </div>
  );
}
