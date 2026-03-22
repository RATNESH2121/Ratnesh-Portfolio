import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import {
  Mail, MapPin, Linkedin, Github, Twitter,
  User, MessageSquare, Send, CheckCircle2,
  Loader2, FileText, ChevronRight, X, Sparkles,
} from 'lucide-react';

/* ─────────────────────── CONSTANTS ────────────────────────── */

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ratneshaugustus@gmail.com',
    href: 'mailto:ratneshaugustus@gmail.com',
    accent: 'var(--foreground)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ratnesh6208',
    href: 'https://www.linkedin.com/in/ratnesh6208/',
    accent: 'var(--foreground)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India — Open to remote',
    href: null,
    accent: 'var(--foreground)',
  },
];

const SOCIALS = [
  { Icon: Github, href: 'https://github.com/RATNESH2121', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/ratnesh6208/', label: 'LinkedIn' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
];

const EMPTY_FORM = { firstName: '', lastName: '', email: '', subject: '', message: '' };

/* ─────────────────── SUCCESS POPOVER ──────────────────────── */

function SuccessPopover({ name, onClose }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      >
        {/* Card — stop click-through */}
        <motion.div
          key="card"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.05 }}
          className="relative w-full max-w-md rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0d1f10 0%, #0f2a15 40%, #0d1f10 100%)',
            border: '1px solid rgba(34,197,94,0.25)',
            boxShadow: '0 0 0 1px rgba(34,197,94,0.15), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,197,94,0.12)',
          }}
        >
          {/* Top green glow bar */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #22c55e 40%, #4ade80 60%, transparent)',
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
          >
            <X size={14} />
          </button>

          <div className="px-8 py-10 text-center">
            {/* Animated checkmark circle */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
              className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(74,222,128,0.12) 100%)',
                border: '2px solid rgba(34,197,94,0.4)',
                boxShadow: '0 0 40px rgba(34,197,94,0.25)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              >
                <CheckCircle2 size={36} style={{ color: '#4ade80' }} strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles size={14} style={{ color: '#4ade80' }} />
                <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Message Delivered
                </span>
                <Sparkles size={14} style={{ color: '#4ade80' }} />
              </div>
              <h3 className="font-bold mb-3" style={{ color: '#ffffff', fontSize: '24px', lineHeight: 1.2 }}>
                Message Sent! 🚀
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.65 }}>
                Hey <strong style={{ color: '#4ade80' }}>{name}</strong>, your message landed
                safely in my inbox. I'll reply within{' '}
                <strong style={{ color: '#ffffff' }}>24 hours</strong>.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="my-6"
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)',
              }}
            />

            {/* What-happens-next blurb */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="rounded-xl p-4 mb-6 text-left"
              style={{
                background: 'rgba(34,197,94,0.07)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                What happens next
              </p>
              {[
                { emoji: '📬', text: 'You\'ll receive an auto-reply in your inbox shortly' },
                { emoji: '🔔', text: 'I\'ve been notified and I\'m already on it' },
                { emoji: '💬', text: 'Expect a personal reply within 24 hours' },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-start gap-3 mb-2 last:mb-0">
                  <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{emoji}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.4' }}>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Close CTA */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.35 }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(34,197,94,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(34,197,94,0.25)',
                letterSpacing: '0.03em',
              }}
            >
              ✓ &nbsp; Close — Back to Portfolio
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────── CONTACT INFO CARD ────────────────────── */

function ContactCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Tag = item.href ? 'a' : 'div';
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        href={item.href || undefined}
        target={item.href?.startsWith('http') ? '_blank' : undefined}
        rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer group"
        style={{
          background: hovered ? `hsl(var(--foreground)/0.03)` : 'hsl(var(--foreground)/0.01)',
          border: `1px solid ${hovered ? 'hsl(var(--foreground)/0.15)' : 'hsl(var(--foreground)/0.08)'}`,
          backdropFilter: 'blur(12px)',
          boxShadow: hovered ? `0 8px 32px hsl(var(--foreground)/0.05)` : 'none',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
          style={{
            background: `hsl(var(--foreground)/0.05)`,
            border: `1px solid hsl(var(--foreground)/0.2)`,
          }}
        >
          <item.icon size={17} style={{ color: 'hsl(var(--foreground))' }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'hsl(var(--foreground-muted))' }}>
            {item.label}
          </p>
          <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>
            {item.value}
          </p>
        </div>
        {item.href && (
          <ChevronRight
            size={15}
            className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: item.accent }}
          />
        )}
      </Tag>
    </motion.div>
  );
}

/* ──────────────── FLOATING LABEL INPUT ─────────────────────── */

function FloatingInput({ name, label, type = 'text', icon: Icon, value, onChange, required = false }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  const focusStyle = {
    borderColor: focused ? 'hsl(var(--foreground))' : 'rgba(255,255,255,0.12)',
    boxShadow: focused ? '0 0 0 2px hsl(var(--foreground)/0.2), inset 0 0 20px hsl(var(--foreground)/0.03)' : 'none',
    transition: 'all 0.25s ease',
  };

  return (
    <div className="relative">
      {/* Icon */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ color: focused ? 'hsl(var(--foreground))' : 'hsl(var(--foreground-muted))', transition: 'color 0.25s' }}
      >
        <Icon size={16} />
      </div>
      {/* Input */}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-11 pr-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none peer"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? '#06b6d4' : 'rgba(255,255,255,0.1)'}`,
          backdropFilter: 'blur(12px)',
          color: 'hsl(var(--foreground))',
          ...focusStyle,
        }}
        placeholder=" "
      />
      {/* Floating label */}
      <label
        htmlFor={name}
        className="absolute left-11 pointer-events-none font-medium"
        style={{
          top: active ? '8px' : '50%',
          transform: active ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: active ? '10px' : '13px',
          color: focused ? 'hsl(var(--foreground))' : 'hsl(var(--foreground-muted))',
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
          transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ──────────────── FLOATING LABEL TEXTAREA ───────────────────── */

function FloatingTextarea({ name, label, icon: Icon, value, onChange, required = false }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  return (
    <div className="relative">
      <div
        className="absolute left-4 top-5 pointer-events-none z-10"
        style={{ color: focused ? 'hsl(var(--foreground))' : 'hsl(var(--foreground-muted))', transition: 'color 0.25s' }}
      >
        <Icon size={16} />
      </div>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-11 pr-4 pt-7 pb-3 rounded-xl text-sm font-medium outline-none resize-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? 'hsl(var(--foreground))' : 'rgba(255,255,255,0.1)'}`,
          backdropFilter: 'blur(12px)',
          color: 'hsl(var(--foreground))',
          boxShadow: focused ? '0 0 0 2px hsl(var(--foreground)/0.2), inset 0 0 20px hsl(var(--foreground)/0.03)' : 'none',
          transition: 'all 0.25s ease',
        }}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute left-11 pointer-events-none font-medium"
        style={{
          top: active ? '10px' : '20px',
          fontSize: active ? '10px' : '13px',
          color: focused ? 'hsl(var(--foreground))' : 'hsl(var(--foreground-muted))',
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
          transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ─────────────────── MAIN SECTION ─────────────────────────── */

export default function ContactSection() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [showPopover, setShowPopover] = useState(false);
  const [senderName, setSenderName] = useState('');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Close popover & reset form */
  const handleClosePopover = () => {
    setShowPopover(false);
    setFormData(EMPTY_FORM);
    setStatus('idle');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid Email', { description: 'Please enter a valid email address.' });
      return;
    }

    // 1. Set status to submitting
    setStatus('submitting');

    try {
      const apiUrl = import.meta.env.PROD ? '/api/contact' : 'http://localhost:5001/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 2. Only show success if backend confirms
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#4ade80', '#86efac', '#06b6d4', '#ffffff'],
        });
        
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.55, x: 0.3 },
            colors: ['#22c55e', '#4ade80', '#ffffff'],
          });
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.55, x: 0.7 },
            colors: ['#22c55e', '#4ade80', '#ffffff'],
          });
        }, 250);

        setStatus('idle');
        setShowPopover(true);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (err) {
      console.error('[Contact] Error:', err);
      setStatus('error');
      toast.error('Submission Failed', { 
        description: err.message || 'Could not connect to the server. Please try again later.' 
      });
    }
  };

  return (
    <>
      {/* ── Success Popover — renders on top of everything — */}
      {showPopover && (
        <SuccessPopover name={senderName} onClose={handleClosePopover} />
      )}

      <section id="contact" className="relative py-28 px-6 overflow-hidden" ref={sectionRef}>

        {/* ── Inject keyframes ── */}
        <style>{`
        @keyframes avail-ping {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
      `}</style>

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* cyan orb — bottom left */}
          <div
            className="absolute -bottom-32 -left-32 w-[550px] h-[550px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,200,200,0.05) 0%, transparent 70%)',
              filter: 'blur(64px)',
            }}
          />
          {/* purple orb — top right */}
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,200,200,0.05) 0%, transparent 70%)',
              filter: 'blur(64px)',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative">

          {/* ── Section label ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-14"
          >
            <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--foreground)))' }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: 'hsl(var(--foreground))' }}>
              Contact
            </span>
            <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, hsl(var(--foreground)), transparent)' }} />
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-[42%_1fr] gap-12 xl:gap-16 items-start">

            {/* ════════════ LEFT COLUMN ════════════ */}
            <div className="space-y-8">

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-medium leading-tight tracking-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}>
                  <span style={{ color: 'hsl(var(--foreground))' }}>Let's Build</span>
                  <br />
                  <span style={{ color: 'hsl(var(--foreground))' }}>
                    Something Amazing
                  </span>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  Open for freelance, full-time roles, and collaborations.
                  Let's create something the internet hasn't seen yet.
                </p>
              </motion.div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                  style={{ animation: 'avail-ping 2s ease-in-out infinite' }}
                />
                <span className="text-sm font-semibold" style={{ color: '#10b981' }}>
                  Available for work
                </span>
              </motion.div>

              {/* Contact info cards */}
              <div className="space-y-3">
                {CONTACT_INFO.map((item, i) => (
                  <ContactCard key={item.label} item={item} index={i} />
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-3 pt-2"
              >
                {SOCIALS.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel={href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -3,
                      background: 'hsl(var(--foreground)/0.08)',
                      borderColor: 'hsl(var(--foreground)/0.2)',
                      boxShadow: '0 0 20px hsl(var(--foreground)/0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={17} style={{ color: 'hsl(var(--foreground-muted))' }} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ════════════ RIGHT COLUMN — FORM ════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput
                    name="firstName"
                    label="First Name"
                    icon={User}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    name="lastName"
                    label="Last Name"
                    icon={User}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {/* Subject */}
                <FloatingInput
                  name="subject"
                  label="Subject"
                  icon={FileText}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                {/* Message */}
                <FloatingTextarea
                  name="message"
                  label="Your Message"
                  icon={MessageSquare}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                {/* Disclaimer */}
                <p className="text-xs text-center" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  I'll get back to you within 24 hours.
                </p>

                {/* Submit button */}
                <AnimatePresence mode="wait">
                  {status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                        color: '#fff',
                        boxShadow: '0 8px 24px rgba(239,68,68,0.35)',
                      }}
                    >
                      ✕ &nbsp;Something went wrong. Please try again.
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2.5"
                      style={{
                        background: 'hsl(var(--foreground))',
                        color: 'hsl(var(--background))',
                        boxShadow: '0 8px 32px hsl(var(--foreground)/0.15)',
                        transition: 'background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease',
                        opacity: status === 'submitting' ? 0.8 : 1,
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      }}
                      whileHover={status !== 'submitting' ? {
                        scale: 1.02,
                        boxShadow: '0 12px 40px hsl(var(--foreground)/0.25)',
                      } : {}}
                      whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={15} />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
