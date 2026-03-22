import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/* ─────────────────────── DATA ─────────────────────────────── */

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Technology (B.Tech) – Computer Science & Engineering',
    institution: 'Lovely Professional University — Phagwara, Punjab',
    period: 'August 2023 – Present',
    current: true,
    accent: '#06b6d4',
    initial: 'L',
    cgpa: 'CGPA: 8.29',
    description:
      'Pursuing B.Tech in Computer Science & Engineering with a focus on full-stack web development, data structures, algorithms, cloud computing, and system design. Actively building real-world projects using the MERN stack, Django, and modern frontend frameworks.',
  },
  {
    id: 2,
    degree: 'Intermediate (12th Grade) – Science Stream',
    institution: 'Gyan Bharti Global School — Gaya, Bihar',
    period: 'April 2022 – March 2023',
    current: false,
    accent: '#8b5cf6',
    initial: 'G',
    cgpa: 'Percentage: 81.4%',
    description:
      'Completed senior secondary education in the Science stream with a strong percentage. Built a solid foundation in Physics, Chemistry, and Mathematics, nurturing early interest in programming and problem-solving.',
  },
  {
    id: 3,
    degree: 'Matriculation (10th Grade)',
    institution: 'DAV Public School — Gaya, Bihar',
    period: 'April 2020 – March 2021',
    current: false,
    accent: '#10b981',
    initial: 'D',
    cgpa: 'Percentage: 86.2%',
    description:
      'Completed secondary education with distinction in Science and Mathematics. Developed foundational computer skills and a strong analytical mindset, laying the groundwork for a career in technology.',
  },
];


/* ─────────────────── EDUCATION CARD ──────────────────────── */

function EducationCard({ edu, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;
  const { theme } = useTheme();
  const accent = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row gap-0 ${isLeft ? '' : 'md:flex-row-reverse'}`}>

      {/* ── Content half ── */}
      <div className={`flex-1 ${isLeft ? 'md:pr-14' : 'md:pl-14'} pl-10 md:pl-0`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.93 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.12 }}
          className="relative rounded-2xl overflow-hidden cursor-default"
          style={{
            background: hovered
              ? `linear-gradient(145deg, ${accent}12 0%, hsl(var(--background-elevated)) 60%, ${accent}08 100%)`
              : 'hsl(var(--background-elevated))',
            border: `1px solid ${hovered ? accent + '55' : 'hsl(var(--border))'}`,
            backdropFilter: 'blur(24px)',
            boxShadow: hovered
              ? `0 30px 80px -20px ${accent}35, 0 2px 0 ${accent}40 inset`
              : '0 8px 32px rgba(0,0,0,0.06)',
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Animated shimmer top border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
              opacity: hovered ? 1 : 0.35,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Mesh glow background orb */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
              filter: 'blur(30px)',
              opacity: hovered ? 1 : 0.5,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Watermark monogram */}
          <div
            className="absolute -bottom-6 -right-4 font-black pointer-events-none select-none leading-none"
            style={{
              fontSize: '9rem',
              color: accent,
              opacity: hovered ? 0.07 : 0.03,
              transition: 'opacity 0.4s ease',
              lineHeight: 0.85,
            }}
          >
            {edu.initial}
          </div>

          <div className="relative z-10 p-7 md:p-8">

            {/* ── Header: Avatar + Period ── */}
            <div className="flex items-start gap-4 mb-6">
              {/* Large monogram avatar */}
              <div
                className="relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl select-none"
                style={{
                  background: `linear-gradient(135deg, ${accent}25 0%, ${accent}10 100%)`,
                  border: `1.5px solid ${accent}45`,
                  boxShadow: `0 0 24px ${accent}30, inset 0 1px 0 ${accent}30`,
                  color: accent,
                }}
              >
                {edu.initial}
                {/* Inner glow dot */}
                <div
                  className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 6px ${accent}`, opacity: edu.current ? 1 : 0.3 }}
                />
              </div>

              {/* Period + status */}
              <div className="flex flex-col justify-center">
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: accent }}
                >
                  {edu.period}
                </span>
                {edu.current ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Currently Pursuing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* ── Degree title ── */}
            <h3 className="font-display text-xl md:text-2xl font-bold mb-3 leading-tight text-foreground">
              {edu.degree}
            </h3>

            {/* ── Institution ── */}
            <p className="flex items-center gap-2 text-sm font-semibold mb-4 text-foreground-muted">
              <MapPin size={13} style={{ color: accent, flexShrink: 0 }} />
              {edu.institution}
            </p>

            {/* ── CGPA Pill ── */}
            {edu.cgpa && (
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-600 text-white border border-emerald-500/50 shadow shadow-emerald-600/20"
                  style={{
                    letterSpacing: '0.05em',
                  }}
                >
                  <GraduationCap size={12} />
                  {edu.cgpa}
                </span>
              </div>
            )}

            {/* ── Divider ── */}
            <div
              className="w-full h-px mb-5"
              style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }}
            />

            {/* ── Description ── */}
            <p className="text-sm leading-relaxed text-foreground-muted">
              {edu.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Timeline dot (center) ── */}
      <div className="absolute left-0 md:left-1/2 top-10 md:-translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
          className="relative flex items-center justify-center"
        >
          {/* Outer ping ring */}
          <div
            className="absolute w-10 h-10 rounded-full"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}35`,
              animation: 'radar-ping 2.8s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute w-6 h-6 rounded-full"
            style={{ background: `${accent}20`, border: `1px solid ${accent}50` }}
          />
          {/* Core dot */}
          <div
            className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: 'hsl(var(--background))',
              border: `2.5px solid ${accent}`,
              boxShadow: `0 0 18px ${accent}90, inset 0 0 6px ${accent}60`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          </div>
        </motion.div>
      </div>

      {/* ── Spacer for opposite side ── */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}


/* ─────────────────── MAIN SECTION ─────────────────────────── */

export default function EducationSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="education" className="relative py-28 px-6 overflow-hidden">

      {/* ── Inject keyframes ── */}
      <style>{`
        @keyframes radar-ping {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes timeline-pulse-edu {
          0%, 100% { opacity: 0; transform: translateY(-100%) scaleX(1); }
          50%       { opacity: 1; transform: translateY(300%) scaleX(1); }
        }
      `}</style>

      {/* ── Background elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full mix-blend-screen opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,200,200,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative" ref={containerRef}>

        {/* ── Section Header ── */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="flex-1 h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--foreground)))' }} />
            <BookOpen size={14} style={{ color: 'hsl(var(--foreground))' }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--foreground))' }}>
              Academic Background
            </span>
            <span className="flex-1 h-px w-12" style={{ background: 'linear-gradient(90deg, hsl(var(--foreground)), transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-medium tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}
          >
            <span style={{ color: 'hsl(var(--foreground))' }}>My </span>
            <span style={{ color: 'hsl(var(--foreground))' }}>
              Education
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-medium tracking-wide max-w-xl mx-auto"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            A journey of continuous learning and academic excellence, building the foundation for technical expertise.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Glowing timeline line */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 md:-translate-x-1/2"
            style={{ width: '2px', background: 'hsl(var(--border))' }}
          >
            {/* Scroll-driven fill */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: lineHeight,
                background: 'hsl(var(--foreground))',
                boxShadow: '0 0 10px hsl(var(--foreground)/0.6)',
              }}
            />
            {/* Traveling light pulse */}
            <div
              className="absolute left-0 w-full rounded-full"
              style={{
                height: '100px',
                background: 'linear-gradient(180deg, transparent, #fff, transparent)',
                filter: 'blur(2px)',
                animation: 'timeline-pulse-edu 4s ease-in-out infinite',
              }}
            />
          </div>

          {/* Education cards */}
          <div className="space-y-16">
            {educationData.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
