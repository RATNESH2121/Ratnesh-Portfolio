import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
    const { theme, setTheme } = useTheme();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Education', href: '#education' },
        { label: 'Achievements', href: '#achievements' },
        { label: 'Certifications', href: '#certifications' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-4 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none`}
        >
            <nav className={`pointer-events-auto flex items-center justify-between gap-4 px-6 py-3 rounded-full transition-all duration-300 ${scrolled
                ? 'bg-background/70 backdrop-blur-xl border border-border shadow-lg shadow-black/5 w-full max-w-4xl'
                : 'w-full max-w-6xl bg-transparent'
                }`}>
                {/* Logo — icon only */}
                <motion.a
                    href="#"
                    className="flex items-center select-none"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    <div className="relative flex items-center justify-center">
                        {/* Glow aura */}
                        <div
                            className="absolute inset-0 rounded-xl blur-sm opacity-20"
                            style={{ background: 'hsl(var(--foreground))', transform: 'scale(1.3)' }}
                        />
                        <img
                            src="/logo-bw.png"
                            alt="Ratnesh Logo"
                            className="relative w-10 h-10 rounded-xl object-cover invert dark:invert-0"
                            style={{ boxShadow: '0 0 0 1px hsl(var(--foreground)/0.15), 0 4px 16px hsl(var(--foreground)/0.1)' }}
                        />
                    </div>
                </motion.a>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-1 bg-background-elevated/50 backdrop-blur-md p-1.5 rounded-full border border-border/50">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.label}
                            onClick={() => scrollToSection(item.href)}
                            className="relative px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors rounded-full"
                            whileHover={{ backgroundColor: "rgba(var(--primary), 0.1)" }}
                        >
                            {item.label}
                        </motion.button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <motion.button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2.5 rounded-full bg-background-elevated border border-border hover:border-primary/50 text-foreground-muted hover:text-primary transition-all shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </motion.button>

                    {/* CTA Button */}
                    <motion.button
                        onClick={() => scrollToSection('#contact')}
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 shadow-lg shadow-primary/25 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Let's Talk
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground active:scale-95 transition-transform"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Guaranteed Bug-Free Safe Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%+8px)] left-6 right-6 p-4 bg-background/95 backdrop-blur-3xl border border-border shadow-2xl rounded-[32px] md:hidden flex flex-col gap-2 pointer-events-auto origin-top"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    scrollToSection(item.href);
                                }}
                                className="w-full text-left px-5 py-3 text-base font-semibold text-foreground tracking-wide hover:bg-foreground/5 rounded-xl transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="h-[1px] w-full bg-border my-2" />
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                scrollToSection('#contact');
                            }}
                            className="w-full py-4 bg-foreground text-background font-bold rounded-2xl shadow-xl shadow-foreground/10 active:scale-95 transition-transform"
                        >
                            Let's Talk
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
