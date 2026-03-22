import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Award, Code, Database, Box, ExternalLink,
  BadgeCheck, Trophy, Cloud, ChevronDown,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

// ─────────────────────────────────────────────────────────────────────────
// ✅ TO ADD A NEW CERTIFICATE — just paste a new object below.
//    Everything updates automatically:
//      • The "X Certifications" count badge
//      • The "See All X More" button count
//      • The grid cards
//
//  FIELDS:
//    id          → unique number (increment from the last one)
//    title       → certificate name
//    issuer      → issuing organization
//    date        → year issued  e.g. '2024'
//    credentialId → your credential/certificate ID
//    verifyUrl   → link to verify (use '#' if not available yet)
//    color       → accent hex color for the card  e.g. '#FF9900'
//    icon        → one of: 'cloud' | 'award' | 'database' | 'code' | 'badge' | 'box' | 'trophy'
// ─────────────────────────────────────────────────────────────────────────
const certifications = [
  {
    id: 1,
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    issuer: 'Infosys Springboard',
    date: 'Aug 2025',
    credentialId: 'Infosys Certification',
    verifyUrl: 'https://verify.onwingspan.com',
    viewUrl: 'https://drive.google.com/file/d/1EdGHldjXWnwnyA4cnxrkUhS6LzLFKgrX/view?usp=sharing', // Path to the image inside public/certificates/
    color: '#00A1E0',
    icon: 'award',
  },
  {
    id: 2,
    title: 'Master Generative AI & Generative AI tools (ChatGPT & more)',
    issuer: 'Infosys Springboard',
    date: 'Aug 2025',
    credentialId: 'Infosys Certification',
    verifyUrl: 'https://verify.onwingspan.com',
    viewUrl: 'https://drive.google.com/file/d/1-kpWv8EijBUduyq4hxeSVvS9hV2aYkU3/view?usp=sharing',
    color: '#00A1E0',
    icon: 'cloud',
  },
  {
    id: 3,
    title: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Infosys Springboard',
    date: 'Sep 2025',
    credentialId: 'Infosys Certification',
    verifyUrl: 'https://verify.onwingspan.com',
    viewUrl: 'https://drive.google.com/file/d/1DCl-Q6qKp2hg92b_yxa_2zLaRyHulqmQ/view?usp=sharing',
    color: '#00A1E0',
    icon: 'box',
  },
  {
    id: 4,
    title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
    issuer: 'Infosys Springboard',
    date: 'Aug 2025',
    credentialId: 'Infosys Certification',
    verifyUrl: 'https://verify.onwingspan.com',
    viewUrl: 'https://drive.google.com/file/d/1oUiKCWENFbU9tUJaW_mtmeBYiFAqxG5X/view?usp=sharing',
    color: '#00A1E0',
    icon: 'code',
  },
  {
    id: 5,
    title: 'Cloud Computing',
    issuer: 'NPTEL / IIT Kharagpur',
    date: 'Apr 2025',
    credentialId: 'NPTEL25CS11S1437301873',
    verifyUrl: '#',
    viewUrl: 'https://drive.google.com/file/d/1UGlhzoavdMSBbv2ece0X09yZhOAhZFek/view?usp=sharing',
    color: '#C62828', // NPTEL Red
    icon: 'cloud',
  },
  {
    id: 6,
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Coursera / Google',
    date: 'Sept 2024',
    credentialId: 'XT7SQ6YR82ZG',
    verifyUrl: 'coursera.org/verify/XT7SQ6YR82ZG',
    viewUrl: 'https://drive.google.com/file/d/1p5hAyUZ6QnGGchwqg90-qyNB0bAQ0im_/view?usp=sharing',
    color: '#34A853', // Green Economy
    icon: 'badge',
  },
  // {
  //   id: 7,
  //   title: 'ChatGPT-4 Prompt Engineering: ChatGPT Generative AI & LLM',
  //   issuer: 'Infosys Springboard',
  //   date: 'Aug 2025',
  //   credentialId: 'Infosys Certification',
  //   verifyUrl: 'https://verify.onwingspan.com',
  //   viewUrl: 'https://drive.google.com/file/d/1oUiKCWENFbU9tUJaW_mtmeBYiFAqxG5X/view?usp=drive_link',
  //   color: '#00A1E0',
  //   icon: 'code',
  // }
];

/* ─────────────────────── ICON RESOLVER ─────────────────────────────── */

function CertIcon({ type, size = 22, color }) {
  const props = { size, style: { color } };
  switch (type) {
    case 'cloud': return <Cloud    {...props} />;
    case 'award': return <Award    {...props} />;
    case 'database': return <Database {...props} />;
    case 'code': return <Code     {...props} />;
    case 'badge': return <BadgeCheck {...props} />;
    case 'box': return <Box      {...props} />;
    default: return <Trophy   {...props} />;
  }
}

/* ─────────────────────── SINGLE CERT CARD ──────────────────────────── */

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false);
  const [verifyHovered, setVerifyHovered] = useState(false);
  const { theme } = useTheme();
  const accent = theme === 'dark' ? '#ffffff' : '#000000';

  const handleView = (e) => {
    e.stopPropagation();
    window.open(cert.viewUrl || cert.verifyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleVerify = (e) => {
    e.stopPropagation();
    if (cert.verifyUrl !== '#') {
      window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group"
      onClick={handleView}
      style={{
        background: hovered
          ? `linear-gradient(145deg, hsl(var(--foreground)/0.04) 0%, hsl(var(--foreground)/0.01) 100%)`
          : 'hsl(var(--foreground)/0.02)',
        border: `1px solid ${hovered ? accent + '55' : 'hsl(var(--border)/0.5)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? `0 20px 60px hsl(var(--foreground)/0.15), 0 0 0 1px ${accent}22, 0 0 40px ${accent}15`
          : '0 4px 24px hsl(var(--foreground)/0.05)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* ── Hover Overlay: See Certificate ── */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <motion.div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-2xl"
          initial={{ y: 20, scale: 0.9 }}
          animate={{ y: hovered ? 0 : 20, scale: hovered ? 1 : 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ background: accent, color: theme === 'dark' ? '#000000' : '#ffffff' }}
        >
          See Certificate
          <ExternalLink size={16} />
        </motion.div>
      </motion.div>
      {/* Thin colored top accent line */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div className="p-6 flex flex-col gap-4 flex-1">

        {/* ── Top Row: Icon + Verify Button ── */}
        <div className="flex items-start justify-between gap-3">

          {/* Issuer icon circle */}
          <motion.div
            animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}35`,
              boxShadow: hovered ? `0 0 20px ${accent}30` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <CertIcon type={cert.icon} size={22} color={accent} />
          </motion.div>

          {/* Verify button */}
          <div className="relative">
            <motion.button
              onClick={handleVerify}
              onMouseEnter={() => setVerifyHovered(true)}
              onMouseLeave={() => setVerifyHovered(false)}
              animate={verifyHovered ? {
                scale: 1.05,
                boxShadow: `0 0 20px ${accent}50`,
              } : { scale: 1, boxShadow: 'none' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: `${accent}18`,
                border: `1px solid ${accent}50`,
                color: accent,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
            >
              Verify
              <BadgeCheck size={12} />
            </motion.button>
          </div>
        </div>

        {/* ── Middle: Title + Issuer + Date ── */}
        <div className="flex flex-col gap-1.5">
          <h3
            className="font-bold leading-snug transition-colors duration-300"
            style={{
              color: hovered ? accent : 'hsl(var(--foreground))',
              fontSize: '16px',
              lineHeight: 1.3,
            }}
          >
            {cert.title}
          </h3>
          <p
            className="text-sm font-semibold"
            style={{ color: accent, opacity: 0.85 }}
          >
            {cert.issuer}
          </p>
          <p
            className="text-xs font-medium"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            Issued · {cert.date}
          </p>
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Bottom: Divider + Credential ID ── */}
        <div>
          <div
            className="mb-3"
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${accent}40, transparent)`,
            }}
          />
          <div className="flex items-center gap-2">
            <BadgeCheck size={11} style={{ color: accent, opacity: 0.7, flexShrink: 0 }} />
            <p
              className="font-mono text-xs truncate"
              style={{ color: 'hsl(var(--foreground-muted))', opacity: 0.7, letterSpacing: '0.06em' }}
            >
              {cert.credentialId}
            </p>
          </div>
        </div>
      </div>

      {/* Colored bottom border on hover */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────── MAIN SECTION ──────────────────────────────── */

export default function CertificationsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [showAll, setShowAll] = useState(false);

  const VISIBLE = 3;
  const visibleCerts = showAll ? certifications : certifications.slice(0, VISIBLE);
  const hiddenCount = certifications.length - VISIBLE;

  return (
    <section
      id="certifications"
      className="relative py-28 px-6 overflow-hidden"
      ref={sectionRef}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Cyan orb — top right */}
        <div
          className="absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(200,200,200,0.1) 0%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Purple orb — bottom left */}
        <div
          className="absolute -bottom-28 -left-28 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(200,200,200,0.05) 0%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">

          {/* Left: label + title */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span
                className="h-px w-10"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--foreground)))' }}
              />
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                Achievements
              </span>
              <span
                className="h-px w-10"
                style={{ background: 'linear-gradient(90deg, hsl(var(--foreground)), transparent)' }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-medium leading-tight tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem, 6.5vw, 4rem)' }}
            >
              <span style={{ color: 'hsl(var(--foreground))' }}>My </span>
              <span style={{ color: 'hsl(var(--foreground))' }}>
                Certifications
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: 'hsl(var(--foreground-muted))', fontSize: '15px' }}
            >
              Verified credentials from industry-leading platforms
            </motion.p>
          </div>

          {/* Right: Count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center gap-2.5 self-start sm:mt-2 px-4 py-2.5 rounded-full shrink-0"
            style={{
              background: 'hsl(var(--foreground)/0.08)',
              border: '1px solid hsl(var(--foreground)/0.25)',
            }}
          >
            <Trophy size={14} style={{ color: 'hsl(var(--foreground))' }} />
            <span
              className="text-sm font-bold"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {certifications.length} Certifications
            </span>
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence initial={false}>
            {visibleCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  delay: i >= VISIBLE ? (i - VISIBLE) * 0.08 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CertCard cert={cert} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── See All / Show Less button ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            onClick={() => setShowAll((prev) => !prev)}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px hsl(var(--foreground)/0.15)' }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold"
            style={{
              background: 'hsl(var(--foreground)/0.08)',
              border: '1px solid hsl(var(--foreground)/0.25)',
              color: 'hsl(var(--foreground))',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'background 0.3s, border-color 0.3s',
            }}
          >
            {showAll ? (
              <>
                Show Less
                <motion.span
                  animate={{ rotate: 180 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ display: 'flex' }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </>
            ) : (
              <>
                See All {hiddenCount} More Certifications
                <motion.span
                  animate={{ rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ display: 'flex' }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 text-xs"
          style={{ color: 'hsl(var(--foreground-muted))', opacity: 0.6, letterSpacing: '0.04em' }}
        >
          All certifications verified by their respective issuing organizations.
        </motion.p>
      </div>
    </section>
  );
}
