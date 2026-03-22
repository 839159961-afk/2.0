import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { Leaf, Store, Backpack, BookOpen, Home, ScrollText, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Courtyard from './components/Courtyard';
import Shop from './components/Shop';
import Bag from './components/Bag';
import Collection from './components/Collection';
import DiaryList from './components/DiaryList';
import SouvenirModal from './components/SouvenirModal';
import MilestoneModal from './components/MilestoneModal';
import EncounterModal from './components/EncounterModal';
import DiaryModal from './components/DiaryModal';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState<'home' | 'shop' | 'bag' | 'collection' | 'diary'>('diary');
  const musicRef = useRef<HTMLAudioElement>(null);
  const streamRef = useRef<HTMLAudioElement>(null);
  
  const { state, user, isAuthReady, loginWithGoogle, logout, harvestHerbs, buyItem, packItem, unpackItem, clearNewSouvenir, clearNewDiary, acknowledgeMilestone, resolveEncounter } = useGameStore();

  // Determine if a milestone modal should be shown
  const collectionCount = state.collection.length;
  const currentMilestone = Math.floor(collectionCount / 10) * 10;
  const showMilestone = currentMilestone > 0 && !state.acknowledgedMilestones.includes(currentMilestone);

  const handleEnterGame = () => {
    setShowWelcome(false);
    if (musicRef.current && streamRef.current) {
      musicRef.current.volume = 0.6;
      streamRef.current.volume = 0.4;

      const playMusic = musicRef.current.play();
      if (playMusic !== undefined) {
        playMusic.catch(() => {});
      }

      const playStream = streamRef.current.play();
      if (playStream !== undefined) {
        playStream.catch(() => {});
      }
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnterGame} />;
  }

  return (
    <div className="min-h-screen bg-[#2c2e2f] flex items-center justify-center font-serif selection:bg-[#b84b4b] selection:text-white">
      {/* Background Music - Ancient Chinese Style (Guqin) */}
      <audio ref={musicRef} loop>
        <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/6/65/Guqin_-_High_Mountain.ogg/Guqin_-_High_Mountain.ogg.mp3" type="audio/mpeg" />
        <source src="https://upload.wikimedia.org/wikipedia/commons/6/65/Guqin_-_High_Mountain.ogg" type="audio/ogg" />
      </audio>
      
      {/* Ambient Sound - Stream/Water */}
      <audio ref={streamRef} loop>
        <source src="https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg" type="audio/ogg" />
      </audio>

      {/* Main Game Container - Styled like Rice Paper */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:w-[420px] bg-[#f0ece1] text-[#2c2e2f] flex flex-col sm:rounded-md shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-[#d3cbb8]">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Header */}
        <header className="pt-10 pb-4 px-6 flex justify-between items-end z-10 shrink-0 relative border-b border-[#d3cbb8]/50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e5dfd1] to-transparent -z-10"></div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold tracking-[0.1em] text-[#2c2e2f] drop-shadow-sm flex items-center gap-2" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>
              游此山海
            </h1>
            <span className="text-[10px] tracking-widest text-[#6b7072] mt-1">山水之间，寻药问道</span>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-[#e5dfd1]/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-[#d3cbb8] shadow-sm">
              <Leaf className="w-4 h-4 text-[#7a8b6c]" />
              <span className="font-mono font-bold text-[#4a5540]">{state.herbs}</span>
            </div>
            {isAuthReady && (
              user ? (
                <button onClick={logout} className="flex items-center gap-1 text-[10px] text-[#6b7072] hover:text-[#b84b4b] transition-colors">
                  <LogOut className="w-3 h-3" />
                  <span>退出存档</span>
                </button>
              ) : (
                <button onClick={loginWithGoogle} className="flex items-center gap-1 text-[10px] text-[#6b7072] hover:text-[#7a8b6c] transition-colors">
                  <LogIn className="w-3 h-3" />
                  <span>云端存档</span>
                </button>
              )
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative z-0 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              {currentTab === 'home' && <Courtyard state={state} onHarvest={harvestHerbs} />}
              {currentTab === 'shop' && <Shop herbs={state.herbs} inventory={state.inventory} onBuy={buyItem} />}
              {currentTab === 'bag' && <Bag state={state} onPack={packItem} onUnpack={unpackItem} />}
              {currentTab === 'collection' && <Collection collection={state.collection} />}
              {currentTab === 'diary' && <DiaryList unlockedDiaries={state.unlockedDiaries} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-[#f0ece1]/95 backdrop-blur-md border-t border-[#d3cbb8]/80 flex justify-around p-2 pb-safe z-20 shrink-0 absolute bottom-0 w-full shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <NavButton active={currentTab === 'home'} onClick={() => setCurrentTab('home')} icon={<Home className="w-5 h-5" />} label="庭院" />
          <NavButton active={currentTab === 'shop'} onClick={() => setCurrentTab('shop')} icon={<Store className="w-5 h-5" />} label="集市" />
          <NavButton active={currentTab === 'bag'} onClick={() => setCurrentTab('bag')} icon={<Backpack className="w-5 h-5" />} label="行囊" />
          <NavButton active={currentTab === 'collection'} onClick={() => setCurrentTab('collection')} icon={<BookOpen className="w-5 h-5" />} label="图鉴" />
          <NavButton active={currentTab === 'diary'} onClick={() => setCurrentTab('diary')} icon={<ScrollText className="w-5 h-5" />} label="日记" />
        </nav>

        {/* Modals */}
        {state.activeEncounter && (
          <EncounterModal encounterId={state.activeEncounter} onResolve={resolveEncounter} />
        )}

        {state.newSouvenir && !showMilestone && !state.activeEncounter && !state.newDiary && (
          <SouvenirModal beastId={state.newSouvenir} onClose={clearNewSouvenir} />
        )}

        {state.newDiary && !showMilestone && !state.activeEncounter && (
          <DiaryModal diaryId={state.newDiary} onClose={clearNewDiary} />
        )}
        
        {showMilestone && !state.activeEncounter && (
          <MilestoneModal 
            milestone={currentMilestone} 
            onClose={() => acknowledgeMilestone(currentMilestone)} 
          />
        )}
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-sm transition-all w-16 relative group ${active ? 'text-[#b84b4b]' : 'text-[#6b7072] hover:text-[#2c2e2f]'}`}
    >
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute inset-0 bg-[#b84b4b]/10 border border-[#b84b4b]/30 rounded-sm -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`mb-1 transition-transform duration-300 ${active ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'}`}>{icon}</div>
      <span className="text-[11px] font-bold tracking-widest" style={{ fontFamily: '"Kaiti", "STKaiti", serif' }}>{label}</span>
    </button>
  );
}
