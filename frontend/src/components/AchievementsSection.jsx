import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Code2, Briefcase, Award, Target, Sparkles, Medal } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/* ─────────────────────── DATA ─────────────────────────────── */

const achievementsData = [
   {
      id: 1,
      title: 'Solved 80+ DSA Problems',
      description: 'Across LeetCode, CodeStudio, and HackerRank. Mastered array, string, dynamic programming, and graph algorithms.',
      icon: Code2,
      badge: 'LeetCode',
      accent: '#f59e0b', // Amber
   },
   {
      id: 2,
      title: 'Built Multiple Full Stack Projects',
      description: 'Developed and deployed scalable applications using MERN Stack, Node.js, and modern frontend frameworks like React & Tailwind.',
      icon: Briefcase,
      badge: 'Full Stack',
      accent: '#06b6d4', // Cyan
   },
   {
      id: 3,
      title: 'NPTEL Certifications',
      description: 'Successfully completed and certified in multiple NPTEL courses including Cloud Computing and Web Technologies.',
      icon: Award,
      badge: 'Certified',
      accent: '#8b5cf6', // Purple
   },
   {
      id: 4,
      title: 'Strong Problem Solving Skills',
      description: 'Demonstrated expertise in algorithmic problem solving, competitive programming, and optimizing complex code structures.',
      icon: Trophy,
      badge: 'Expertise',
      accent: '#ec4899', // Pink
   },
];

/* ─────────────────── ACHIEVEMENT CARD ──────────────────────── */

function AchievementCard({ achievement, index }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true, margin: '-50px' });
   const [hovered, setHovered] = useState(false);
   const { theme } = useTheme();
   const accent = theme === 'dark' ? '#ffffff' : '#000000';

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 30, scale: 0.95 }}
         animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
         transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="relative p-6 rounded-3xl overflow-hidden group cursor-default h-full"
         style={{
            background: hovered ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${hovered ? accent + '40' : 'hsl(var(--foreground)/0.06)'}`,
            backdropFilter: 'blur(16px)',
            transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
            boxShadow: hovered ? `0 15px 40px -10px ${accent}20` : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
         }}
      >
         {/* Background glow orb that follows hover (simulated by centering it on the card for now, enhanced via CSS) */}
         <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full opacity-0 group-hover:opacity-100 mix-blend-screen pointer-events-none transition-opacity duration-700"
            style={{
               background: `radial-gradient(circle at center, ${accent}15 0%, transparent 60%)`,
            }}
         />

         {/* Top Border Highlight */}
         <div
            className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
         />

         <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
               {/* Icon Container with glowing background */}
               <div
                  className="relative flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{
                     background: `linear-gradient(135deg, ${accent}20, rgba(255,255,255,0.05))`,
                     border: `1px solid ${accent}40`,
                     boxShadow: hovered ? `0 0 20px ${accent}40` : 'none',
                     transition: 'box-shadow 0.4s ease'
                  }}
               >
                  <achievement.icon size={26} style={{ color: accent }} />

                  {/* Sparkle decoration on hover */}
                  {hovered && (
                     <Sparkles
                        size={14}
                        className="absolute -top-1 -right-1 animate-pulse"
                        style={{ color: '#fff' }}
                     />
                  )}
               </div>

               {/* Badge */}
               {achievement.badge && (
                  <span
                     className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
                     style={{
                        background: `${accent}15`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                     }}
                  >
                     {achievement.badge}
                  </span>
               )}
            </div>

            {/* Title */}
            <h3
               className="text-2xl md:text-[26px] font-medium mb-3 leading-tight tracking-tight transition-colors duration-300"
               style={{
                  fontFamily: "'Playfair Display', serif",
                  color: hovered ? accent : 'hsl(var(--foreground))'
               }}
            >
               {achievement.title}
            </h3>

            {/* Description */}
            <p
               className="text-sm leading-relaxed mt-auto"
               style={{ color: 'hsl(var(--foreground-muted))' }}
            >
               {achievement.description}
            </p>
         </div>
      </motion.div>
   );
}

/* ─────────────────── MAIN SECTION ─────────────────────────── */

export default function AchievementsSection() {
   const containerRef = useRef(null);
   const inView = useInView(containerRef, { once: true, margin: '-100px' });
   const [showAll, setShowAll] = useState(false);

   const visibleAchievements = showAll ? achievementsData : achievementsData.slice(0, 3);

   return (
      <section id="achievements" className="relative py-28 px-6 overflow-hidden" ref={containerRef}>

         {/* ── Background elements ── */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Subtle dot pattern */}
            <div
               className="absolute inset-0 opacity-[0.02]"
               style={{
                  backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 2px, transparent 0)',
                  backgroundSize: '40px 40px',
               }}
            />

            {/* Glowing floating orbs */}
            <motion.div
               animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute top-20 right-10 w-96 h-96 rounded-full blur-[100px]"
               style={{ background: 'rgba(200, 200, 200, 0.15)' }}
            />
            <motion.div
               animate={{
                  y: [0, 20, 0],
                  opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
               className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-[100px]"
               style={{ background: 'rgba(200, 200, 200, 0.1)' }}
            />
         </div>

         <div className="max-w-6xl mx-auto relative z-10">

            {/* ── Section Header ── */}
            <div className="text-center mb-20">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                  style={{ background: 'hsl(var(--foreground)/0.08)', border: '1px solid hsl(var(--foreground)/0.2)' }}
               >
                  <Medal size={14} style={{ color: 'hsl(var(--foreground))' }} />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: 'hsl(var(--foreground))' }}>
                     Milestones
                  </span>
               </motion.div>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-medium tracking-tight leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}
               >
                  <span style={{ color: 'hsl(var(--foreground))' }}>Key </span>
                  <span style={{ color: 'hsl(var(--foreground))' }}>
                     Achievements
                  </span>
               </motion.h2>

               <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base sm:text-lg max-w-2xl mx-auto"
                  style={{ color: 'hsl(var(--foreground-muted))' }}
               >
                  A showcase of my dedication, continuous learning, and measurable successes in the tech landscape.
               </motion.p>
            </div>

            {/* ── Achievements Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {visibleAchievements.map((achievement, index) => {
                  return (
                     <div key={achievement.id}>
                        <AchievementCard achievement={achievement} index={index} />
                     </div>
                  )
               })}
            </div>

            {/* ── See All / Show Less Button ── */}
            {achievementsData.length > 3 && (
               <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-14 flex justify-center"
               >
                  <button
                     onClick={() => {
                        if (showAll) {
                           containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        setShowAll(!showAll);
                     }}
                     className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[13px] font-semibold tracking-widest uppercase transition-all duration-400"
                     style={{
                        background: 'transparent',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--foreground)/0.15)',
                        backdropFilter: 'blur(10px)'
                     }}
                     onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'hsl(var(--foreground)/0.04)';
                        e.currentTarget.style.borderColor = 'hsl(var(--foreground)/0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                     }}
                     onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'hsl(var(--foreground)/0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                     }}
                  >
                     {showAll ? 'Show Less' : 'See All Achievements'}
                  </button>
               </motion.div>
            )}

         </div>
      </section>
   );
}
