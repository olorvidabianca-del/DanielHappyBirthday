import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Navigation, 
  Wind,
  Cloud,
  ChevronRight,
  User,
  Quote,
  Star,
  MessageCircle,
  PartyPopper,
  CheckCircle2,
  MapPin,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- Configuration ---
const CELEBRANT_NAME = "Daniel";
const MESSAGES = [
  { sender: "Pablo", text: "So grateful to celebrate another year with you, not just as an amazing CEO, but as my brother. Wishing you a day filled with joy and all the things you love. Thank you for your incredible leadership and for building something we are all proud to be part of. Here’s to another year of success, growth, and great memories together. Cheers to you." },
  { sender: "Alex", text: "Warmest birthday wishes, Daniel. May your day be filled with joy, appreciation, and many reasons to smile. Wishing you continued success and happiness. Muitas felicidades, muitos anos de vida." },
  { sender: "Bianca", text: "Happy Birthday, Daniel. Thank you for being such a great boss, always understanding, humble, and supportive. We truly appreciate you and feel lucky to have you leading BGA. I hope this year brings you everything you are still wishing for, and even more wins for BGA. God has blessed you with a beautiful family because He knows how kind you are. Wishing you more blessings, good health, and happiness always." },
  { sender: "Irish", text: "Happy Birthday to a boss who truly makes a difference. Wishing you a year filled with growth, fulfillment, and continued success. May the months ahead bring exciting opportunities, meaningful achievements, and plenty of moments to enjoy the results of your hard work. We are incredibly lucky to have you as our leader." },
  { sender: "Kristine", text: "I’m truly grateful to have a boss like you who understands and values your employees and supports us in so many ways. Your guidance, encouragement, and generosity have made a real difference in my journey, both professionally and personally. I hope your day is filled with joy, laughter, and all the things that make you happiest. Wishing you another year of good health, success, and wonderful memories. Thank you for being such an amazing mentor and inspiration, you truly make work feel like a second home." },
  { sender: "Cris", text: "Happy Birthday, boss. Wishing you a fantastic day filled with laughter, good company, and of course some cake. May this year bring you continued success, good health, new adventures, and plenty of reasons to smile. Thanks for everything you do, especially all those “approved by Daniel” days off. We truly appreciate you." },
  { sender: "Jennel", text: "Happy Birthday, Daniel. I hope your day is filled with joy and a well deserved celebration with your loved ones. Wishing you continued success in everything you do. Thank you for being a great and understanding leader to all of us." },
  { sender: "Nick", text: "Happy Birthday, boss. Thank you for the opportunity to be part of this great team and for your support in my professional growth. I hope you enjoy your day with your family and friends." },
  { sender: "Mary", text: "Happy Birthday, Dani. Wishing you a wonderful day filled with quality time with your loved ones. We appreciate your vision and the investment in tools that make our work efficient. We look forward to growing together in 2026. Hope you have a fantastic day." },
  { sender: "Kim", text: "Happy Birthday, Daniel. Wishing you continued success, good health, and happiness. Thank you for your generosity and kindness, and for being such an inspiring leader." },
  { sender: "Carmela", text: "Happy Birthdayy Daniel. Wishing you all the great things in life, continued success and time well spent with your family.." }
];

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'cake', 'party', 'flight-deck', 'ending'
  const [selectedMsg, setSelectedMsg] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    // Public domain Happy Birthday instrumental from Wikimedia Commons
    audioRef.current = new Audio("https://upload.wikimedia.org/wikipedia/commons/6/61/Happy_Birthday_to_You_C_Major.ogg");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        if (view !== 'landing') {
          audioRef.current.play().catch(() => {});
        }
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  // Function to start experience and audio
  const startExperience = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
    setView('cake');
  };

  // Auto-transitions
  useEffect(() => {
    if (view === 'cake') {
      const timer = setTimeout(() => setView('party'), 5500);
      return () => clearTimeout(timer);
    }
    if (view === 'party') {
      const timer = setTimeout(() => setView('flight-deck'), 4000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const CloudBg = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -200, y: Math.random() * 800 }}
          animate={{ x: '100vw' }}
          transition={{ duration: 25 + Math.random() * 30, repeat: Infinity, ease: "linear", delay: i * 4 }}
          className="absolute text-white"
        >
          <Cloud size={30 + Math.random() * 80} />
        </motion.div>
      ))}
    </div>
  );

  const Confetti = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * 100 + "vw", rotate: 0 }}
          animate={{ 
            y: "110vh", 
            x: (Math.random() * 100 - 10) + "vw", 
            rotate: 360 
          }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-2 h-2 rounded-sm"
          style={{ backgroundColor: ['#facc15', '#60a5fa', '#f87171', '#4ade80', '#c084fc'][i % 5] }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-sky-600 to-indigo-800 font-sans text-white overflow-x-hidden selection:bg-yellow-300 selection:text-blue-900">
      <CloudBg />

      {/* Sound Control - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleMute}
          className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full border border-white/20 transition-all active:scale-95 shadow-lg"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? <VolumeX size={20} className="text-white/70" /> : <Volume2 size={20} className="text-yellow-300" />}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <AnimatePresence mode="wait">

          {/* VIEW 1: LANDING */}
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="text-center w-full max-w-4xl"
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 inline-block p-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl"
              >
                <Plane size={60} className="text-yellow-300 transform -rotate-45" />
              </motion.div>

              <h1 className="text-6xl md:text-9xl font-black mb-2 tracking-tighter uppercase italic drop-shadow-2xl">
                Flight <span className="text-yellow-300">D44</span>
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-sky-100 uppercase tracking-[0.4em]">
                Happy Birthday, {CELEBRANT_NAME}
              </p>

              <div className="w-full bg-black/20 backdrop-blur-md py-4 mb-12 border-y border-white/10 overflow-hidden relative">
                <motion.div 
                  animate={{ x: [0, -2000] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex whitespace-nowrap gap-12 items-center"
                >
                  {[...MESSAGES, ...MESSAGES].map((msg, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Star size={14} className="text-yellow-300 fill-yellow-300" />
                      <span className="text-sm font-bold tracking-wide uppercase">
                        {msg.sender}: "Happy Birthday Boss!"
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <button 
                onClick={startExperience}
                className="group relative flex flex-col items-center gap-2 px-12 py-6 bg-white text-blue-900 font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <span className="text-lg uppercase tracking-tighter">Enter Flight Deck</span>
                <span className="text-[10px] opacity-60 font-mono tracking-widest">A SPECIAL SURPRISE AWAITS</span>
                <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </motion.div>
          )}

          {/* VIEW 2: BIRTHDAY CAKE */}
          {view === 'cake' && (
            <motion.div 
              key="cake"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, filter: "brightness(2)" }}
              className="flex flex-col items-center justify-center text-center max-w-2xl px-4"
            >
              <div className="relative mt-24 mb-16 scale-125 md:scale-150 transition-transform">
                <motion.div 
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 text-7xl font-black text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]"
                >
                  44
                </motion.div>

                <div className="relative">
                  <div className="w-40 h-20 bg-blue-400 rounded-t-2xl mx-auto border-b-4 border-blue-500 relative z-20 shadow-lg">
                    <div className="absolute top-0 w-full h-4 bg-white/20 rounded-t-2xl" />
                    <div className="absolute -top-8 w-full flex justify-around px-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-2.5 h-10 bg-pink-300 rounded-full relative shadow-sm">
                          <motion.div 
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 0.4 + Math.random() * 0.2, repeat: Infinity }}
                            className="absolute -top-5 left-1/2 -translate-x-1/2 w-5 h-7 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_#facc15]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-60 h-28 bg-blue-300 rounded-t-3xl border-b-4 border-blue-400 relative z-10 -mt-2 shadow-2xl">
                    <div className="absolute top-0 w-full h-8 bg-white/20 rounded-t-3xl" />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest italic text-yellow-300 drop-shadow-lg">
                  Happy Birthday, Boss!
                </h2>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-sky-50 italic">
                    "We might not be able to celebrate in person, but here's a virtual one from <span className="text-yellow-300 font-bold not-italic">BGA TEAM</span>"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* VIEW 3: START THE PARTY */}
          {view === 'party' && (
            <motion.div 
              key="party"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <Confetti />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
                className="p-12 bg-yellow-400 rounded-full text-blue-900 shadow-[0_0_100px_rgba(250,204,21,0.5)] mb-8"
              >
                <PartyPopper size={120} />
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">
                START THE <span className="text-yellow-300">PARTY!</span>
              </h2>
              <p className="mt-4 text-xl tracking-[0.5em] font-bold text-sky-200">ENTERING FLIGHT DECK NOW</p>
            </motion.div>
          )}

          {/* VIEW 4: FLIGHT DECK / MESSAGES */}
          {view === 'flight-deck' && (
            <motion.div 
              key="flight-deck"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-5xl flex flex-col gap-4"
            >
              <div className="bg-white text-blue-900 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch border-b-4 border-yellow-400">
                <div className="p-4 flex-1 flex items-center justify-between px-6 bg-blue-50/30">
                  <div className="flex items-center gap-4">
                    <Plane size={24} className="text-blue-600 -rotate-45" />
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-tighter leading-none italic">{CELEBRANT_NAME} // D44</h2>
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Captain's Log: JAN-22</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex gap-6 border-l border-blue-100 pl-6 h-full items-center">
                    <div className="text-center">
                      <p className="text-[8px] text-gray-400 font-bold uppercase">Seat</p>
                      <p className="text-xs font-bold">1A (CEO)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] text-gray-400 font-bold uppercase">Class</p>
                      <p className="text-xs font-bold">First</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-600 text-white p-4 px-8 flex flex-col justify-center items-center text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-70">Arrival Status</p>
                  <p className="text-lg font-black italic">ON TIME</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 h-[60vh] md:h-[500px]">
                <div className="bg-white/10 backdrop-blur-md p-3 md:w-64 rounded-2xl overflow-hidden flex flex-col border border-white/10">
                  <div className="flex items-center gap-2 mb-3 px-2 text-sky-200">
                    <MessageCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Crew Manifest</span>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-1">
                    {MESSAGES.map((msg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedMsg(idx)}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${selectedMsg === idx ? 'bg-yellow-400 text-blue-900 shadow-lg' : 'hover:bg-white/10 text-white/80'}`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <User size={12} className={selectedMsg === idx ? 'text-blue-900' : 'text-sky-300'} />
                          <span className="font-bold text-[11px] uppercase tracking-tight truncate">{msg.sender}</span>
                        </div>
                        {selectedMsg === idx && <ChevronRight size={12} className="flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedMsg}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 bg-white p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-center border-t-8 border-blue-600"
                    >
                      <Quote size={100} className="absolute -top-4 -left-4 text-blue-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                            {MESSAGES[selectedMsg].sender[0]}
                          </div>
                          <h4 className="font-black text-blue-900 text-xl uppercase italic">From: {MESSAGES[selectedMsg].sender}</h4>
                        </div>
                        <p className="text-xl md:text-2xl leading-relaxed font-medium text-blue-800 italic">
                          "{MESSAGES[selectedMsg].text}"
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                 <button 
                  onClick={() => setView('landing')}
                  className="px-5 py-2 bg-black/30 hover:bg-black/50 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border border-white/10"
                >
                  Return to Hangar
                </button>
                <button 
                  onClick={() => setView('ending')}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 rounded-xl text-blue-900 text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                >
                  Prepare for Landing
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW 5: ENDING SCREEN */}
          {view === 'ending' && (
            <motion.div 
              key="ending"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full max-w-2xl px-6 py-12 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 shadow-3xl"
            >
              <div className="flex justify-center mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-6 bg-green-400/20 rounded-full border border-green-400/50 text-green-400"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
              </div>

              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">
                Landed <span className="text-yellow-300 text-6xl md:text-8xl block">Safely.</span>
              </h2>

              <div className="space-y-6 my-8">
                <p className="text-xl font-medium text-sky-100 italic leading-relaxed">
                  "Thank you for being the pilot of this incredible team. Your vision leads the way, but your kindness keeps us grounded."
                </p>

                <div className="flex items-center justify-center gap-4 text-yellow-300 font-black uppercase tracking-widest text-sm">
                  <div className="h-px w-12 bg-yellow-300/30"></div>
                  <span>From all of us at BGA</span>
                  <div className="h-px w-12 bg-yellow-300/30"></div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg text-xs font-bold uppercase tracking-widest text-sky-200">
                  <MapPin size={14} /> Destination: Success 2026
                </div>
                <button 
                  onClick={() => setView('landing')}
                  className="px-8 py-3 bg-white text-blue-900 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Fly Again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer className="fixed bottom-0 w-full p-4 flex justify-between items-end opacity-40 pointer-events-none text-[10px] font-mono uppercase tracking-[0.2em]">
        <div className="flex gap-4">
          <div className="flex items-center gap-1"><Wind size={12} /> SPD: 440</div>
          <div className="flex items-center gap-1"><Navigation size={12} /> HDG: 044</div>
        </div>
        <div>EST. JAN 22 // {CELEBRANT_NAME}</div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #1e3a8a; margin: 0; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
