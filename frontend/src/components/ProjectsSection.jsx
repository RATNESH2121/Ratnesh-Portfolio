import { useState, useRef } from 'react';
import { Github, Star, GitFork, ExternalLink, Play, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import alphaPodcastPreview from '../image/alpha_podcast_hd.png';
import rentalHousePreview from '../image/rental_house_hd.png';
import feelTheBurnPreview from '../image/feel_the_burn_hd.png';
import artifexWebPreview from '../image/artifex_web_hd.png';
import abhigyaHeartCarePreview from '../image/abhigya_heart_care_hd.png';
import foodDeliveryPreview from '../image/food_delivery_hd.png';
import artifexCommercePreview from '../image/artifex_ecommerce_hd.png';
import graminSetuPreview from '../image/gramin_setu_hd.png';
import employeeTaskPreview from '../image/employee_task_hd.png';

/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════ */

export const projects = [
  {
    id: 1,
    title: 'Artifex Commerce',
    description:
      'A high-performance e-commerce ecosystem with a modern storefront, administrative dashboard, and seamless Stripe payment integration.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/RATNESH2121/Artifex-Ecommerce.git',
    liveUrl: 'https://artifex-commerce.vercel.app/',
    stars: 48,
    forks: 12,
    featured: true,
    accentColor: '#FF6B00',
    meshFrom: '#201000',
    meshMid: '#3a1a00',
    meshTo: '#100800',
    orb1: '#FF6B0040',
    orb2: '#9B5CFF28',
    icon: '🛒',
    hasDemo: true,
    previewImage: artifexCommercePreview,
  },
  {
    id: 2,
    title: 'Gramin Setu',
    description:
      'A community-driven platform bridging information gaps in rural areas, enabling farmers and artisans to access resources and skill-building tools.',
    tags: ['React', 'Django', 'PostgreSQL', 'REST API', 'Framer Motion'],
    githubUrl: 'https://github.com/RATNESH2121/Gramin-Setu.git',
    liveUrl: 'https://gramin-setu-6hus.vercel.app',
    stars: 52,
    forks: 14,
    featured: true,
    accentColor: '#10b981',
    meshFrom: '#001a11',
    meshMid: '#003d2e',
    meshTo: '#000d08',
    orb1: '#10b98140',
    orb2: '#D4AF3728',
    icon: '🌾',
    hasDemo: true,
    previewImage: graminSetuPreview,
  },
  {
    id: 3,
    title: 'Employee Task Management',
    description:
      'A robust task tracking and resource management system for corporate environments, featuring employee hierarchies and real-time monitoring.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/RATNESH2121/Employee-Task-Management2.git',
    liveUrl: 'https://employee-task-management.vercel.app/',
    stars: 45,
    forks: 9,
    featured: true,
    accentColor: '#3b82f6',
    meshFrom: '#001a1b',
    meshMid: '#004045',
    meshTo: '#000f10',
    orb1: '#3b82f640',
    orb2: '#00B8D428',
    icon: '📊',
    hasDemo: true,
    previewImage: employeeTaskPreview,
  },
  {
    id: 4,
    title: 'Abhigya Heart Care',
    description:
      'A specialized cardiology center platform. Features expert doctor profiles, real-time appointment booking, and heart health resources.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/RATNESH2121',
    liveUrl: 'https://abhigya-heart-care.vercel.app/',
    stars: 42,
    forks: 10,
    featured: true,
    accentColor: '#00D1FF',
    meshFrom: '#001a1b',
    meshMid: '#004045',
    meshTo: '#000f10',
    orb1: '#00D1FF40',
    orb2: '#00B8D428',
    icon: '💙',
    hasDemo: true,
    previewImage: abhigyaHeartCarePreview,
  },
  {
    id: 5,
    title: 'Artifex Web',
    description:
      'Conversion-focused dental website design agency. Builds modern, mobile-first, Local SEO-optimized websites for healthcare clinics.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/RATNESH2121',
    liveUrl: 'https://www.artifexweb.in/',
    stars: 38,
    forks: 7,
    featured: true,
    accentColor: '#00C2CB',
    meshFrom: '#001a1b',
    meshMid: '#003336',
    meshTo: '#000f10',
    orb1: '#00C2CB40',
    orb2: '#00898F28',
    icon: '🦷',
    hasDemo: true,
    previewImage: artifexWebPreview,
  },
];

/* ═══════════════════════════════════════════════════════════════
   TECH ICON MAP  — devicon CDN (same source as SkillsSection)
═══════════════════════════════════════════════════════════════ */

const TECH_ICON = {
  'React': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'React Native': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  'Node.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  'MongoDB': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  'Stripe': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg' },
  'Redis': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  'Three.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', invert: true },
  'GSAP': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'Shaders': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg' },
  'D3.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
  'WebSocket': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'Python': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  'Firebase': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
  'GraphQL': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  'OpenAI': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  'FastAPI': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  'Solidity': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', invert: true },
  'Ethers.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  'IPFS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
};

/* ═══════════════════════════════════════════════════════════════
   MARQUEE CONSTANTS
═══════════════════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [...projects, ...projects];
const CARD_W = 310;
const CARD_GAP = 24;
const SINGLE_SET_W = projects.length * (CARD_W + CARD_GAP);

/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD — fully theme-aware
═══════════════════════════════════════════════════════════════ */

function ProjectCard({ project, isDark, onPause, onResume }) {
  const [isHovered, setIsHovered] = useState(false);
  const a = isDark ? '#f2f2fa' : '#111116';
  const slug = project.title.replace(/\s+/g, '-').toLowerCase();

  /* Per-theme tokens */
  const cardBg = isDark
    ? 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, #09090f 70%)'
    : 'linear-gradient(160deg, rgba(0,0,0,0.03) 0%, hsl(var(--background-elevated)) 70%)';
  const chromeBg = isDark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.04)';
  const chromeBorder = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.09)';
  const urlBarBg = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.06)';
  const urlBarBorder = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.10)';
  const mockupBorder = isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.10)';
  const mockupBg = isDark ? '#0d0d14' : 'hsl(var(--background))';
  const termBg = 'rgba(0,0,0,0.68)';            /* always dark — inside viewport */
  const titleColor = isDark ? '#f2f2fa' : 'hsl(var(--foreground))';
  const descColor = isDark ? 'rgba(185,185,215,0.60)' : 'hsl(var(--foreground-muted))';
  const statColor = isDark ? 'rgba(215,215,240,0.65)' : 'hsl(var(--foreground-muted))';

  return (
    <div
      style={{
        width: CARD_W,
        flexShrink: 0,
        borderRadius: 16,
        overflow: 'hidden',
        background: cardBg,
        border: `1.5px solid ${a}44`,
        boxShadow: `0 0 0 1px ${a}18, 0 12px 48px -12px ${a}44`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.borderColor = `${a}99`;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${a}33, 0 16px 56px -10px ${a}66`;
        e.currentTarget.style.transform = 'translateY(-6px)';
        onPause?.();
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.borderColor = `${a}44`;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${a}18, 0 12px 48px -12px ${a}44`;
        e.currentTarget.style.transform = 'translateY(0)';
        onResume?.();
      }}
    >
      {/* ── Browser mockup ── */}
      <div style={{ margin: '12px 12px 0', borderRadius: 10, overflow: 'hidden', border: mockupBorder, background: mockupBg }}>

        {/* Chrome bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', height: 34, background: chromeBg, borderBottom: chromeBorder }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          <div style={{ flex: 1, marginLeft: 8, height: 18, borderRadius: 4, background: urlBarBg, border: urlBarBorder, display: 'flex', alignItems: 'center', padding: '0 8px', overflow: 'hidden' }}>
            <span style={{ fontFamily: 'monospace', fontSize: 9, color: a + 'cc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              localhost:3000/{slug}
            </span>
          </div>
        </div>

        {/* Viewport — always dark gradient (looks good on both modes) */}
        <div style={{ position: 'relative', height: 180, background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(15,15,15,1) 55%, rgba(5,5,5,1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {project.previewImage && (
            <img
              src={project.previewImage}
              alt={project.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isHovered ? 1 : 0.7,
                mixBlendMode: 'normal',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.05)',
              }}
            />
          )}

          <div style={{ position: 'absolute', width: 180, height: 180, top: '-30%', left: '-15%', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(32px)' }} />
          <div style={{ position: 'absolute', width: 140, height: 140, bottom: '-20%', right: '-10%', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(24px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.08) 1px,transparent 0)', backgroundSize: '20px 20px' }} />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {(!project.previewImage) && (
              project.hasDemo ? (
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', border: `1.5px solid ${a}70`, backdropFilter: 'blur(10px)', boxShadow: `0 0 22px ${a}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play style={{ width: 20, height: 20, fill: a, color: a }} />
                </div>
              ) : (
                <div style={{ width: 58, height: 58, borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                  {project.icon}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '14px 16px 16px', gap: 10 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <h3 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.05rem', color: titleColor, margin: 0, lineHeight: 1.25 }}>
            {project.title}
          </h3>
          <BadgeCheck size={16} fill={isDark ? "#3B82F6" : "#2563EB"} color={isDark ? "#0a0a0f" : "#fff"} style={{ flexShrink: 0 }} />
        </div>

        <p style={{ fontFamily: 'monospace', fontSize: '0.73rem', color: descColor, lineHeight: 1.65, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        {/* Tech tags with icons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => {
            const tech = TECH_ICON[tag];
            return (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px 3px 6px', borderRadius: 99, background: `${a}12`, border: `1px solid ${a}35`, fontFamily: 'monospace', fontSize: 10, color: a }}>
                {tech ? (
                  <img src={tech.src} alt={tag} style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0, filter: tech.invert ? 'brightness(0) invert(1)' : 'none' }} />
                ) : (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: a, flexShrink: 0 }} />
                )}
                {tag}
              </span>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <a
            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0', borderRadius: 10, fontFamily: 'monospace', fontSize: 11, fontWeight: 700, border: `1px solid ${a}50`, color: a, background: `${a}0e`, textDecoration: 'none', transition: 'background 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${a}25`; e.currentTarget.style.boxShadow = `0 0 18px ${a}44`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${a}0e`; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Github size={12} />View Code →
          </a>
          <a
            href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0', borderRadius: 10, fontFamily: 'monospace', fontSize: 11, fontWeight: 700, background: `linear-gradient(135deg, ${a}dd, ${a}88)`, color: '#000', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 22px ${a}77`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <ExternalLink size={12} />Live Demo →
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 2 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace', fontSize: 12 }}>
            <Star size={13} style={{ color: '#FFD700' }} />
            <span style={{ color: statColor }}>{project.stars}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace', fontSize: 12 }}>
            <GitFork size={13} style={{ color: a }} />
            <span style={{ color: statColor }}>{project.forks}</span>
          </span>
          {project.featured && (
            <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 99, background: `${a}18`, border: `1px solid ${a}40`, color: a }}>
              ★ Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION — infinite CSS marquee, fully theme-aware
═══════════════════════════════════════════════════════════════ */

export default function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState('left');
  const [speed, setSpeed] = useState(40);
  const trackRef = useRef(null);

  const accent = isDark ? '#ffffff' : '#000000';

  /* ── Theme tokens ── */
  // NOTE: hsl(var(--background)) does NOT resolve reliably inside JS inline gradient strings.
  // Light mode --background is 0 0% 100% = pure white. Use #ffffff explicitly.
  const sectionBg = isDark ? '#0a0a0a' : '#ffffff';
  const headingColor = isDark ? '#f0f0fa' : 'hsl(var(--foreground))';
  const subColor = isDark ? 'rgba(170,170,200,0.42)' : 'hsl(var(--foreground-muted))';
  const btnBg = isDark ? 'rgba(14,14,28,0.80)' : 'hsl(var(--background-elevated))';
  const btnBorder = isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid hsl(var(--border))';
  const btnColor = isDark ? 'rgba(255,255,255,0.5)' : 'hsl(var(--foreground-muted))';
  const ghBtnBg = isDark ? 'rgba(255,255,255,0.04)' : 'hsl(var(--background-elevated))';
  const ghBtnBorder = isDark ? 'rgba(255,255,255,0.12)' : 'hsl(var(--border))';
  const ghBtnColor = isDark ? 'rgba(220,220,240,0.7)' : 'hsl(var(--foreground-muted))';
  const ctaBorderReset = isDark ? 'rgba(255,255,255,0.09)' : 'hsl(var(--border))';
  const ctaColorReset = isDark ? 'rgba(200,200,230,0.65)' : 'hsl(var(--foreground-muted))';

  return (
    <section
      id="projects"
      style={{ position: 'relative', overflow: 'hidden', background: sectionBg, paddingTop: '7rem', paddingBottom: '7rem', transition: 'background 0.3s ease' }}
    >
      {/* Global keyframes */}
      <style>{`
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${SINGLE_SET_W}px); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-${SINGLE_SET_W}px); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          gap: ${CARD_GAP}px;
          width: max-content;
          will-change: transform;
        }
        .marquee-track.dir-left  { animation: marqueeLeft  ${speed}s linear infinite; }
        .marquee-track.dir-right { animation: marqueeRight ${speed}s linear infinite; }
        .marquee-track.paused    { animation-play-state: paused; }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: isDark
          ? 'radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 0)'
          : 'radial-gradient(circle,rgba(0,0,0,0.055) 1px,transparent 0)',
        backgroundSize: '28px 28px'
      }} />

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(150,150,150,0.05) 0%,transparent 68%)', top: '30%', left: '20%', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(150,150,150,0.04) 0%,transparent 68%)', top: '10%', right: '10%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ════ HEADER ════ */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginBottom: 52 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ height: 1, width: 48, background: `linear-gradient(90deg,transparent,${accent})` }} />
                <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: accent }}>MY WORK</span>
                <div style={{ height: 1, width: 48, background: `linear-gradient(90deg,${accent},transparent)` }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: 'clamp(3rem,6.5vw,4.5rem)', color: headingColor, lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Featured Projects
              </h2>
              <p style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: subColor, margin: 0 }}>
                // hover any card to pause · scroll direction controls below
              </p>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
              {/* Direction */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ icon: <ChevronLeft size={16} />, val: 'right' }, { icon: <ChevronRight size={16} />, val: 'left' }].map(({ icon, val }) => (
                  <button key={val} onClick={() => setDir(val)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: dir === val ? `1px solid ${accent}80` : btnBorder, background: dir === val ? `${accent}18` : btnBg, color: dir === val ? accent : btnColor, backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {icon}
                  </button>
                ))}
              </div>
              {/* Speed */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ label: '1×', val: 40 }, { label: '1.5×', val: 26 }, { label: '2×', val: 18 }].map(({ label, val }) => (
                  <button key={val} onClick={() => setSpeed(val)}
                    style={{ padding: '6px 12px', borderRadius: 8, fontFamily: 'monospace', fontSize: 11, fontWeight: 700, border: speed === val ? `1px solid ${accent}70` : btnBorder, background: speed === val ? `${accent}18` : btnBg, color: speed === val ? accent : btnColor, backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {label}
                  </button>
                ))}
              </div>
              {/* GitHub */}
              <a href="https://github.com/RATNESH2121" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 12, fontFamily: 'monospace', fontSize: 12, fontWeight: 700, border: `1px solid ${ghBtnBorder}`, background: ghBtnBg, color: ghBtnColor, backdropFilter: 'blur(12px)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = accent; e.currentTarget.style.boxShadow = `0 0 18px ${accent}30`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ghBtnBorder; e.currentTarget.style.color = ghBtnColor; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Github size={14} />View All on GitHub →
              </a>
            </div>
          </div>
        </div>

        {/* ════ MARQUEE ════ */}
        <div style={{ position: 'relative' }}>
          <div style={{ overflow: 'hidden', padding: '8px 0 16px' }}>
            <div ref={trackRef} className={`marquee-track dir-${dir}${paused ? ' paused' : ''}`} key={`${dir}-${speed}`}>
              {MARQUEE_ITEMS.map((project, i) => (
                <ProjectCard
                  key={`${project.id}-${i}`}
                  project={project}
                  isDark={isDark}
                  onPause={() => setPaused(true)}
                  onResume={() => setPaused(false)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════ BOTTOM CTA ════ */}
        <div style={{ textAlign: 'center', marginTop: 52, padding: '0 24px' }}>
          <a href="https://github.com/RATNESH2121" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px', borderRadius: 18, fontFamily: 'monospace', fontSize: 14, fontWeight: 700, border: `1px solid ${ctaBorderReset}`, background: ghBtnBg, color: ctaColorReset, backdropFilter: 'blur(14px)', textDecoration: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = isDark ? '#ffffff55' : '#00000055'; e.currentTarget.style.boxShadow = isDark ? '0 8px 36px rgba(255,255,255,0.1)' : '0 8px 36px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = ctaBorderReset; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = ctaColorReset; }}
          >
            <Github size={16} />
            Explore All Repositories
            <ExternalLink size={13} style={{ opacity: 0.55 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
