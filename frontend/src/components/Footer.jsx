import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble, X } from 'lucide-react';
import Dock from './ui/Dock';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'Privacy Policy' | 'Terms of Service' | null

  const legalContent = {
    'Privacy Policy': {
      title: 'Privacy Policy',
      text: 'We respect your privacy completely. We only collect the basic information necessary to reply to your messages (like your name and email when you use the contact form). We will never sell, share, or misuse your personal data with any third parties under any circumstances. Thank you for visiting securely!'
    },
    'Terms of Service': {
      title: 'Terms of Service',
      text: 'By using this website, you agree to interact respectfully and securely. All projects, designs, and content displayed here are the intellectual property of Ratnesh. You are welcome to take inspiration, but please do not copy, redistribute, or claim any of these core materials as your own without explicit permission.'
    }
  };

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy' },
      { name: 'Terms of Service' },
    ]
  };

  const dockItems = [
    { icon: <Github size={20} strokeWidth={1.5} />, label: 'GitHub', onClick: () => window.open('https://github.com/RATNESH2121', '_blank') },
    { icon: <Linkedin size={20} strokeWidth={1.5} />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/ratnesh6208/', '_blank') },
    { icon: <Twitter size={20} strokeWidth={1.5} />, label: 'Twitter', onClick: () => window.open('#', '_blank') },
    { icon: <Dribbble size={20} strokeWidth={1.5} />, label: 'Dribbble', onClick: () => window.open('#', '_blank') },
  ];

  return (
    <>
      <footer className="relative pt-12 pb-8 px-6 border-t border-border bg-background-elevated/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <motion.a
                href="#"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center justify-start">
                    <div
                        className="absolute inset-0 rounded-xl blur-sm opacity-20"
                        style={{ background: 'hsl(var(--foreground))', transform: 'scale(1.2)' }}
                    />
                    <img
                        src="/logo-bw.png"
                        alt="AK Logo"
                        className="relative w-12 h-12 rounded-xl object-cover invert dark:invert-0"
                        style={{ boxShadow: '0 0 0 1px hsl(var(--foreground)/0.15), 0 4px 16px hsl(var(--foreground)/0.1)' }}
                    />
                </div>
              </motion.a>
              <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
                Crafting immersive digital experiences through code and creativity. Specialized in high-performance 3D web applications.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-display text-foreground font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground-muted hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div>
              <h3 className="font-display text-foreground font-semibold mb-4">Connect</h3>
              <div className="mt-2 text-left">
                <Dock 
                  items={dockItems}
                  panelHeight={64}
                  baseItemSize={48}
                  magnification={65}
                />
              </div>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="font-display text-foreground font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-foreground-muted text-sm">
                  <span className="text-lg">✉️</span>
                  <a href="mailto:ratneshaugustus@gmail.com" className="hover:text-foreground transition-colors">
                    ratneshaugustus@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3 text-foreground-muted text-sm">
                  <span className="text-lg">📍</span>
                  <span>Phagwara, Punjab</span>
                </div>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 text-sm font-medium"
                  >
                    Let's Work Together
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-muted text-center md:text-left">
              © {currentYear} Ratnesh. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setActiveLegalModal(link.name)}
                  className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                >
                  {link.name}
                </button>
              ))}

              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-xs text-foreground-muted hover:text-primary transition-colors duration-300 ml-4 pl-4 border-l border-border"
                whileHover={{ y: -2 }}
              >
                Back to Top
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Info Popover */}
      <AnimatePresence>
        {activeLegalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLegalModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-2xl p-8"
              style={{
                background: 'hsl(var(--background-elevated))',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <button
                onClick={() => setActiveLegalModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 text-foreground-muted hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
              
              <h3 className="text-2xl font-display font-medium mb-4 text-foreground pt-2">
                {legalContent[activeLegalModal].title}
              </h3>
              
              <div 
                className="w-12 h-1 rounded-full mb-6"
                style={{ background: 'linear-gradient(90deg, hsl(var(--foreground)), transparent)' }}
              />

              <p className="text-[15px] leading-relaxed text-foreground-muted">
                {legalContent[activeLegalModal].text}
              </p>
              
              <div className="mt-8 text-right">
                <button
                  onClick={() => setActiveLegalModal(null)}
                  className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'hsl(var(--foreground))',
                    color: 'hsl(var(--background))',
                  }}
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
