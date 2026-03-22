import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

/* ─────────────────────────── DATA ─────────────────────────── */

const technologies = [
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: '#A8B9CC' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: '#092E20' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#FFFFFF', invert: true },

  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#E10098' },

  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900', invert: false },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#FFFFFF', invert: true },
  { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', color: '#2088FF' },
];

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⚡',
    gradient: 'from-foreground to-foreground/70',
    glow: 'hsl(var(--foreground)/0.08)',
    skills: [
      { name: 'HTML', level: 95, tag: 'Expert' },
      { name: 'CSS', level: 95, tag: 'Expert' },
      { name: 'JavaScript', level: 90, tag: 'Expert' },
      { name: 'React', level: 95, tag: 'Expert' },

      { name: 'Tailwind CSS', level: 95, tag: 'Expert' },
      { name: 'Three.js', level: 85, tag: 'Advanced' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '🛠',
    gradient: 'from-foreground/90 to-muted-foreground',
    glow: 'hsl(var(--foreground)/0.08)',
    skills: [
      { name: 'Python', level: 90, tag: 'Expert' },
      { name: 'Django', level: 88, tag: 'Advanced' },
      { name: 'Java', level: 85, tag: 'Advanced' },
      { name: 'C++', level: 85, tag: 'Advanced' },
      { name: 'C', level: 80, tag: 'Proficient' },
      { name: 'Node.js', level: 92, tag: 'Expert' },
      { name: 'Express', level: 90, tag: 'Expert' },
      { name: 'MongoDB', level: 88, tag: 'Advanced' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Others',
    icon: '🔧',
    gradient: 'from-muted-foreground to-border',
    glow: 'hsl(var(--foreground)/0.08)',
    skills: [
      { name: 'Git', level: 95, tag: 'Expert' },

      { name: 'AWS', level: 78, tag: 'Proficient' },
      { name: 'Figma', level: 85, tag: 'Advanced' },
      { name: 'CI/CD', level: 82, tag: 'Advanced' },
    ],
  },
];

const STATS = [
  { value: '3+', label: 'Years of Coding' },
  { value: '20+', label: 'Technologies Known' },
  { value: '50+', label: 'Projects Shipped' },
  { value: '∞', label: 'Curiosity Level' },
];

/* ─────────────────── CIRCULAR PROGRESS ─────────────────────── */

function CircularProgress({ level, name, size = 64 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const r = (size - 8) / 2; // Slightly smaller to leave room for stroke
  const circ = 2 * Math.PI * r;
  const dash = inView ? circ * (level / 100) : 0;

  // Find the matching technology icon
  const tech = technologies.find(t =>
    t.name.toLowerCase() === name.toLowerCase() ||
    (name === 'Tailwind CSS' && t.name === 'Tailwind') ||
    (name === 'Three.js' && t.name === 'Three.js') ||
    (name === 'Node.js' && t.name === 'Node.js')
  );

  return (
    <div ref={ref} className="relative flex items-center justify-center group/ring" style={{ width: size, height: size }}>
      {/* Background track circle */}
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 filter drop-shadow-sm">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border)/0.6)" strokeWidth="4" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="url(#prog-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: inView ? circ - dash : circ }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
        />
        <defs>
          <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content: Icon and Percentage */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full h-full">
        {tech ? (
          tech.invert ? (
            /* DYNAMIC SOLID ICON FIX: Adapts to whatever color text is! */
            <div 
              className="w-8 h-8 transition-transform duration-500 group-hover/ring:scale-110"
              style={{
                backgroundColor: 'hsl(var(--foreground))',
                maskImage: `url(${tech.icon})`,
                WebkitMaskImage: `url(${tech.icon})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          ) : (
            <img
              src={tech.icon}
              alt={tech.name}
              className={`w-8 h-8 object-contain transition-transform duration-500 group-hover/ring:scale-110`}
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}
            />
          )
        ) : (
          <span className="text-xs font-bold text-foreground">{level}%</span>
        )}

        {/* Percentage badge that appears/slides up slightly on hover */}
        <span className="absolute -bottom-1 opacity-0 group-hover/ring:opacity-100 group-hover/ring:-translate-y-1 transition-all duration-300 text-[10px] font-extrabold text-background drop-shadow-lg bg-foreground px-2 py-0.5 rounded-full z-20">
          {level}%
        </span>
      </div>
    </div>
  );
}

/* ─────────────────── SKILL BAR ROW (REMOVED) ─────────────────────────── */

/* ─────────────────── MARQUEE STRIP ──────────────────────────── */

function TechMarquee({ items, direction = 1, speed = 40 }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right,transparent,black 10%,black 90%,transparent)' }}>
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction > 0 ? [0, -50 * items.length] : [-50 * items.length, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            className="flex flex-col items-center gap-2 group cursor-default select-none"
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'hsl(var(--background-elevated)/0.6)',
                border: '1px solid hsl(var(--border))',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${tech.color}33, transparent 70%)` }}
              />
              <img
                src={tech.icon}
                alt={tech.name}
                className={`w-7 h-7 object-contain relative z-10 transition-all duration-300${tech.invert ? ' brightness-0 dark:invert opacity-90' : ''}`}
              />
            </div>
            <span className="text-[10px] font-medium text-foreground-muted group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────── STAT COUNTER ──────────────────────────── */

function StatItem({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center gap-1 group"
    >
      <span
        className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent"
        style={{ backgroundImage: 'var(--gradient-accent)' }}
      >
        {value}
      </span>
      <span className="text-xs text-foreground-muted text-center font-medium tracking-wide">{label}</span>
    </motion.div>
  );
}

/* ─────────────────── MAIN SECTION ───────────────────────────── */

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('frontend');
  const activeCat = categories.find((c) => c.id === activeTab);

  const half = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, half);
  const row2 = technologies.slice(half);

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">

      {/* ── Background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,hsl(var(--primary)),transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,hsl(var(--accent)),transparent 70%)', filter: 'blur(60px)' }} />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-background-elevated/50 backdrop-blur-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground-muted">Skills & Expertise</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 
              className="text-[3.5rem] md:text-6xl font-medium text-foreground leading-tight mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Technologies I{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--gradient-accent)' }}
              >
                Master
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="text-foreground-muted max-w-xl mx-auto text-base leading-relaxed">
              A curated stack of tools and frameworks I use to craft world-class digital experiences.
            </p>
          </ScrollReveal>
        </div>


        {/* ── Marquee rows ── */}
        <ScrollReveal delay={0.25}>
          <div className="space-y-4 mb-20">
            <TechMarquee items={row1} direction={1} speed={38} />
            <TechMarquee items={row2} direction={-1} speed={42} />
          </div>
        </ScrollReveal>

        {/* ── Skill cards with tabs ── */}
        <ScrollReveal delay={0.3}>
          <div
            className="rounded-[2.5rem] overflow-hidden border border-border/40 relative shadow-2xl"
            style={{
              background: 'hsl(var(--background-elevated)/0.6)',
              backdropFilter: 'blur(32px)',
              boxShadow: 'inset 0 1px 1px hsl(var(--foreground)/0.05), 0 20px 40px hsl(var(--foreground)/0.03)',
            }}
          >
            {/* Soft animated background glow tied to active category */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
              style={{ background: `radial-gradient(circle at 50% -20%, ${activeCat.glow}, transparent 70%)` }}
            />

            {/* Tab bar (Pill Style) */}
            <div className="flex justify-center p-6 sm:p-8 border-b border-border/30 relative z-10">
              <div className="flex flex-wrap sm:flex-nowrap bg-background/60 p-1.5 rounded-[2rem] border border-border/50 backdrop-blur-md shadow-sm gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`relative flex items-center justify-center gap-2 py-3 px-6 sm:px-8 text-[12px] sm:text-[13px] tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none rounded-full font-extrabold ${activeTab === cat.id
                      ? 'text-background'
                      : 'text-foreground-muted hover:text-foreground hover:bg-foreground/5'
                      }`}
                  >
                    <span className="relative z-20 text-[16px]">{cat.icon}</span>
                    <span className="relative z-20">{cat.label}</span>
                    {activeTab === cat.id && (
                      <motion.div
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full z-10"
                        style={{
                          background: 'hsl(var(--foreground))',
                          boxShadow: '0 4px 12px hsl(var(--foreground)/0.15)',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="p-8 md:p-16 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-12 justify-center w-full max-w-4xl mx-auto">
                    {activeCat.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-6 group cursor-pointer"
                      >
                        <div
                          className="p-6 rounded-[32px] transition-all duration-500 relative overflow-hidden flex items-center justify-center group-hover:-translate-y-2 group-hover:scale-[1.03]"
                          style={{
                            width: '120px',
                            height: '120px',
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border)/0.5)',
                            boxShadow: '0 10px 30px -10px hsl(var(--foreground)/0.06), inset 0 2px 2px hsl(var(--foreground)/0.02)',
                          }}
                        >
                          {/* Inner soft glow on hover */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, ${activeCat.glow} 0%, transparent 60%)` }}
                          />
                          <CircularProgress level={skill.level} name={skill.name} size={84} />
                        </div>
                        <span 
                          className="text-[13px] font-extrabold text-foreground text-center tracking-[0.2em] uppercase transition-all duration-300 group-hover:text-primary"
                          style={{ textShadow: '0 2px 4px hsl(var(--foreground)/0.05)' }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Bottom tagline ── */}
        <ScrollReveal delay={0.4}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/60 bg-background-elevated/30 backdrop-blur-sm">
              <span className="text-lg">🚀</span>
              <p className="text-sm text-foreground-muted">
                Currently exploring{' '}
                <span className="text-foreground font-medium">WebGPU</span>,{' '}
                <span className="text-foreground font-medium">AI/ML integration</span>, and{' '}
                <span className="text-foreground font-medium">edge computing</span>.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
