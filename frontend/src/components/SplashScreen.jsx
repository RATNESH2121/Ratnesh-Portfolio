import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LetterGlitch from './ui/LetterGlitch'; // <-- Import the newly created glitch matrix component

export default function SplashScreen() {
  const [phase, setPhase] = useState(1); // 1 = Main Splash, 2 = Glitch, 3 = Hidden
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scrolling while splash screen is active
    document.body.style.overflow = 'hidden';

    // Premium fast counter interaction
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 1; // Count up randomly and fast
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        // Hide phase 1 after hitting 100%
        setTimeout(() => {
          setPhase(2);
        }, 600);
      }
      setCounter(count);
    }, 35); // Very rapid tick

    return () => {
      clearInterval(interval);
      // document.body.style.overflow is managed after phase 3 completes
    };
  }, []);

  useEffect(() => {
    // When phase switches to 2 (Glitch), wait to let the first splash lift off,
    // then advance to phase 3 to fade out the glitch screen.
    if (phase === 2) {
      setTimeout(() => {
        setPhase(3);
        window.scrollTo(0, 0);
        document.body.style.overflow = ''; 
      }, 2200); // Leaves glitch screen exposed briefly before fading into portfolio
    }
  }, [phase]);

  return (
    <>
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
          key="splash"
          initial={{ y: 0 }}
          // Exit animation: "curtain lift" wipe effect instead of a basic fade
          exit={{ 
            y: '-100%', 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#030303]"
          style={{ zIndex: 99999 }}
        >
          {/* Main Wrapper */}
          <div className="flex flex-col items-center justify-center relative">
            
            {/* The Text Reveal Mask */}
            <div className="overflow-hidden select-none pb-2 flex flex-col items-center">
              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                // Quick text exit just before curtain lift
                exit={{ y: '-80%', opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                {/* Main Name in Cinzel */}
                <div 
                  className="text-4xl md:text-5xl lg:text-[64px] font-medium flex items-baseline gap-[16px]"
                  style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.02em' }}
                >
                  <span className="text-[#f5f5f7]">RATNESH</span>
                </div>

                {/* Sub-branding phrase -> Looks very cinematic in Inter or smaller Cinzel */}
                <div 
                  className="text-xs md:text-sm text-[#555560] uppercase tracking-[0.45em] mt-2 font-light ml-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Digital Artisan
                </div>
              </motion.div>
            </div>

            {/* Micro loading bar */}
            <div className="w-full max-w-[120px] h-[1px] bg-[#1a1a24] mt-6 overflow-hidden relative">
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${counter}%` }}
                 transition={{ duration: 0.1, ease: 'linear' }}
                 className="absolute left-0 top-0 bottom-0 bg-[#666677]"
              />
            </div>
            
          </div>

          {/* Minimal Percentage Counter in corner */}
          <div className="absolute bottom-10 right-10 overflow-hidden font-mono text-sm tracking-widest text-[#555560]">
             <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
             >
               {counter.toString().padStart(3, '0')} %
             </motion.div>
          </div>
         </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === 1 || phase === 2) && (
          <motion.div
            key="glitch-splash"
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            className="fixed inset-0 bg-[#000]"
            style={{ zIndex: 99998 }} // Always sits right underneath the first splash sequence
          >
            <LetterGlitch />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
