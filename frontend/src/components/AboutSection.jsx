import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaAws, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiPython, SiMongodb, SiNextdotjs, SiThreedotjs } from 'react-icons/si';
import profileImage from '../image/Adiii.png';

/* ─────────────── ORBIT DATA ──────────────────────────────── */

const innerOrbit = [
  { Icon: FaReact, color: '#61DAFB' },
  { Icon: FaNodeJs, color: '#339933' },
  { Icon: SiJavascript, color: '#F7DF1E' },
  { Icon: FaJava, color: '#007396' },
  { Icon: SiMongodb, color: '#47A248' },
];

const outerOrbit = [
  { Icon: FaHtml5, color: '#E34F26' },
  { Icon: FaCss3Alt, color: '#1572B6' },
  { Icon: SiTailwindcss, color: '#06B6D4' },
  { Icon: SiNextdotjs, color: '#ffffff' },
  { Icon: SiPython, color: '#3776AB' },
  { Icon: FaAws, color: '#7f5a21ff' },
  { Icon: FaGitAlt, color: '#F05032' },
  { Icon: SiThreedotjs, color: '#ffffff' },
];



/* ─────────────── VS CODE EDITOR CARD ────────────────────── */

const C = ({ children }) => <span style={{ color: '#79c0ff' }}>{children}</span>;   // keyword / cyan
const P = ({ children }) => <span style={{ color: '#e3b341' }}>{children}</span>;   // property / yellow
const S = ({ children }) => <span style={{ color: '#ffa657' }}>{children}</span>;   // string / orange
const B = ({ children }) => <span style={{ color: '#ff7b72' }}>{children}</span>;   // bool / pink
const M = ({ children }) => <span style={{ color: '#8b949e' }}>{children}</span>;   // muted / comment
const W = ({ children }) => <span style={{ color: '#e6edf3' }}>{children}</span>;   // white
const G = ({ children }) => <span style={{ color: '#79c0ff' }}>{children}</span>;   // function cyan

function CodeEditorCard() {
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  const lines = [
    <><C>const</C> <W>profile</W> <W>= {'{'}</W></>,
    <><W>{'  '}</W><P>name</P><W>: </W><S>'Ratnesh'</S><W>,</W></>,
    <><W>{'  '}</W><P>title</P><W>: </W><S>'Full-Stack Developer | MERN'</S><W>,</W></>,
    <><W>{'  '}</W><P>skills</P><W>: [</W></>,
    <><W>{'    '}</W><S>'React'</S><W>, </W><S>'Redux'</S><W>,</W></>,
    <><W>{'    '}</W><S>'Express'</S><W>, </W><S>'MySQL'</S><W>, </W><S>'MongoDB'</S><W>,</W></>,
    <><W>{'    '}</W><S>'AWS'</S><W>, </W><S>'Git'</S><W>,</W></> ,
    <><W>{'  ]'}</W><W>,</W></>,
    <><W>{'  '}</W><P>hardWorker</P><W>:    </W><B>true</B><W>,</W></>,
    <><W>{'  '}</W><P>quickLearner</P><W>:  </W><B>true</B><W>,</W></>,
    <><W>{'  '}</W><P>problemSolver</P><W>: </W><B>true</B><W>,</W></>,
    <><W>{'  '}</W><G>hireable</G><W>: </W><C>function</C><W>() {'{'}</W></>,
    <><W>{'    '}</W><C>return</C> <W>(</W></>,
    <><W>{'      '}</W><C>this</C><W>.</W><P>hardWorker</P> <W>&&</W></>,
    <><W>{'      '}</W><C>this</C><W>.</W><P>problemSolver</P> <W>&&</W></>,
    <><W>{'      '}</W><C>this</C><W>.</W><P>skills</P><W>{'.length >= '}</W><S>5</S></>,
    <><W>{'    '}</W><W>);</W></>,
    <><W>{'  '}</W><W>{'}'}</W></>,
    <><W>{'};'}</W><span style={{ color: cursor ? '#06b6d4' : 'transparent', transition: 'color 0.1s' }}>█</span></>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(121,192,255,0.25)',
        boxShadow: '0 0 0 1px rgba(121,192,255,0.08), 0 0 40px rgba(121,192,255,0.12), 0 24px 48px rgba(0,0,0,0.5)',
        animation: 'editor-glow 4s ease-in-out infinite',
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#161b22' }}>
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" style={{ boxShadow: '0 0 6px #ff5f57' }} />
          <div className="w-3 h-3 rounded-full bg-yellow-400" style={{ boxShadow: '0 0 6px #febc2e' }} />
          <div className="w-3 h-3 rounded-full bg-green-500" style={{ boxShadow: '0 0 6px #28c840' }} />
        </div>
        {/* Tab */}
        <div className="ml-3 px-3 py-0.5 rounded-t text-xs font-mono flex items-center gap-1.5"
          style={{ background: '#0d1117', color: '#8b949e', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
          <span style={{ color: '#ffa657' }}>⬥</span>
          developer.js
        </div>
      </div>

      {/* Code body */}
      <div className="px-5 py-4 font-mono text-[12.5px] leading-6 overflow-x-auto">
        {/* Line numbers + code */}
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="select-none mr-5 text-right w-5 shrink-0" style={{ color: '#3d444d', fontSize: '11px', lineHeight: '24px' }}>
              {i + 1}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}



/* ─────────────── MAIN SECTION ──────────────────────────── */

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const rightInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden" ref={sectionRef}>

      {/* ── Inject keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        
        @keyframes editor-glow {
          0%,100% { box-shadow: 0 0 0 1px rgba(121,192,255,0.08), 0 0 30px rgba(121,192,255,0.10), 0 24px 48px rgba(0,0,0,0.5); }
          50%      { box-shadow: 0 0 0 1px rgba(121,192,255,0.18), 0 0 50px rgba(121,192,255,0.22), 0 24px 48px rgba(0,0,0,0.5); }
        }
        @keyframes profile-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes profile-spin-rev {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes float-profile {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes about-btn-shimmer {
          0%   { transform: translateX(-130%) skewX(-20deg); }
          100% { transform: translateX(230%) skewX(-20deg); }
        }
      `}</style>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle,hsl(var(--foreground)) 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(200,200,200,0.05) 0%,transparent 70%)', filter: 'blur(64px)' }} />
        <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(200,200,200,0.05) 0%,transparent 70%)', filter: 'blur(64px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ══════════════ LEFT COLUMN — PREMIUM TEXT ══════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 lg:gap-10"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center p-1.5 rounded-lg" style={{ background: 'hsl(var(--foreground)/0.1)', border: '1px solid hsl(var(--foreground)/0.2)' }}>
                <Sparkles size={14} style={{ color: 'hsl(var(--foreground))' }} />
              </div>
              <span className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: 'hsl(var(--foreground))' }}>
                About Me
              </span>
              <span className="h-px block w-20" style={{ background: 'linear-gradient(90deg,hsl(var(--foreground)),transparent)' }} />
            </motion.div>

            {/* Premium Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="tracking-tight leading-[1] mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                color: 'hsl(var(--foreground))',
                fontWeight: 500
              }}
            >
              Crafting Digital Experiences.
            </motion.h2>

            {/* Glassmorphism Bio Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="relative p-6 sm:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: 'linear-gradient(180deg, hsl(var(--foreground)), transparent)' }} />
              <div className="space-y-5 relative z-10">
                <p className="text-base sm:text-[1.05rem] leading-[1.8]" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  I build high-performance web applications that look beautiful and work flawlessly. From full-stack MERN applications to Django-powered backends, I turn complex problems into simple, intuitive digital experiences.
                </p>
                <p className="text-base sm:text-[1.05rem] leading-[1.8]" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  Currently pursuing B.Tech in Computer Science at Lovely Professional University, I focus on writing <span className="text-foreground font-extrabold">reliable, scalable code</span> that delivers real-world value through well-designed systems and clean interfaces.
                </p>
              </div>
            </motion.div>

            {/* Upgraded CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="relative group">
                {/* Glow aura — expands on hover */}
                <div className="absolute -inset-[3px] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: 'hsl(var(--foreground))' }} />
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold overflow-hidden tracking-wide select-none bg-foreground text-background"
                  style={{
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 4px 14px hsl(var(--foreground)/0.1)',
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -3,
                    boxShadow: '0 12px 30px hsl(var(--foreground)/0.25)',
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
                      animation: 'about-btn-shimmer 2.8s ease-in-out infinite',
                    }}
                  />
                  {/* Top gloss */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[42%] rounded-t-2xl"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)' }}
                  />
                  <span className="relative z-10 flex items-center gap-2.5">
                    Let's Work Together
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center"
                    >
                      <ArrowRight size={17} strokeWidth={2.5} />
                    </motion.span>
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════ RIGHT COLUMN — BIG PHOTO + EDITOR ══════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 lg:gap-10 w-full max-w-full overflow-visible"
          >
            {/* ── Profile photo with orbiting icons ── */}
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[580px] lg:h-[580px] my-6 lg:my-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.55] sm:scale-[0.8] lg:scale-100 origin-center transition-transform">
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: '580px', height: '580px' }}
                >
                  {/* Orbit ring visuals */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '480px', height: '480px',
                      border: '1px solid rgba(6,182,212,0.12)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  />
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '580px', height: '580px',
                      border: '1px solid rgba(139,92,246,0.1)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  />

                  {/* Inner orbit — tech icons */}
                  <div
                    className="absolute"
                    style={{
                      width: '480px', height: '480px',
                      top: '50%', left: '50%',
                      marginTop: '-240px', marginLeft: '-240px',
                      animation: 'profile-spin 22s linear infinite',
                    }}
                  >
                    {innerOrbit.map((item, index) => {
                      const angle = (index / innerOrbit.length) * 360;
                      const rad = (angle * Math.PI) / 180;
                      const r = 240;
                      const x = 240 + r * Math.cos(rad) - 24;
                      const y = 240 + r * Math.sin(rad) - 24;
                      return (
                        <div key={index} className="absolute" style={{ left: x, top: y, animation: 'profile-spin-rev 22s linear infinite' }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: 'rgba(13,17,23,0.85)',
                              border: `1px solid ${item.color}40`,
                              backdropFilter: 'blur(8px)',
                              boxShadow: `0 0 14px ${item.color}35`,
                            }}>
                            <item.Icon style={{ color: item.color, fontSize: '22px' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Outer orbit — more tech icons */}
                  <div
                    className="absolute"
                    style={{
                      width: '580px', height: '580px',
                      top: '50%', left: '50%',
                      marginTop: '-290px', marginLeft: '-290px',
                      animation: 'profile-spin-rev 30s linear infinite',
                    }}
                  >
                    {outerOrbit.map((item, index) => {
                      const angle = (index / outerOrbit.length) * 360;
                      const rad = (angle * Math.PI) / 180;
                      const r = 290;
                      const x = 290 + r * Math.cos(rad) - 20;
                      const y = 290 + r * Math.sin(rad) - 20;
                      return (
                        <div key={index} className="absolute" style={{ left: x, top: y, animation: 'profile-spin 30s linear infinite' }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              background: 'rgba(13,17,23,0.85)',
                              border: `1px solid ${item.color === 'currentColor' ? 'rgba(255,255,255,0.2)' : item.color + '40'}`,
                              backdropFilter: 'blur(8px)',
                              boxShadow: `0 0 10px ${item.color === 'currentColor' ? 'rgba(255,255,255,0.1)' : item.color + '25'}`,
                            }}>
                            <item.Icon style={{ color: item.color, fontSize: '18px' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Profile image — center, 320px */}
                  <div style={{ animation: 'float-profile 6s ease-in-out infinite' }}>
                    <motion.div
                      className="relative rounded-full overflow-hidden"
                      style={{
                        width: '320px',
                        height: '320px',
                        border: '3px solid transparent',
                        backgroundClip: 'padding-box',
                        boxShadow: '0 0 0 4px rgba(6,182,212,0.65), 0 0 0 8px rgba(139,92,246,0.3), 0 0 60px rgba(6,182,212,0.45)',
                      }}
                      whileHover={{ scale: 1.04, boxShadow: '0 0 0 5px rgba(6,182,212,0.9), 0 0 0 10px rgba(139,92,246,0.5), 0 0 80px rgba(6,182,212,0.6)' }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    >
                      <img
                        src={profileImage}
                        alt="Ratnesh"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(6,182,212,0.1))' }} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── VS Code Editor Card — directly below photo ── */}
            <div className="w-full max-w-[480px]">
              <CodeEditorCard />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
