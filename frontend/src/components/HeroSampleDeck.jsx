import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { projects } from './ProjectsSection';

// Map gradients to the project IDs for the hero cards styling
const cardStyles = [
    { id: 1, color: "from-foreground to-foreground/80", rotate: -6 },
    { id: 2, color: "from-foreground/90 to-muted-foreground", rotate: -3 },
    { id: 3, color: "from-foreground/80 to-foreground/70", rotate: 0 },
    { id: 4, color: "from-muted-foreground to-foreground/50", rotate: 3 },
    { id: 5, color: "from-foreground/60 to-muted", rotate: 6 },
    { id: 6, color: "from-foreground to-background", rotate: 9 }
];

export default function HeroSampleDeck() {
    const [hovered, setHovered] = useState(false);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // Take the 5 most recently added projects
    const displayProjects = [...projects].reverse().slice(0, 5).map((p, i) => ({
        ...p,
        ...cardStyles[i % cardStyles.length],
        zIndex: i + 1
    })).reverse(); // Reverse so first is on top if we stack them naturally, but we use absolute positioning

    return (
        <>
            <div
                className="relative w-full h-[400px] flex items-center justify-center -mt-10 lg:mt-0 perspective-1000"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                    setHoveredCardId(null);
                }}
            >
                <div className="relative w-64 h-80 scale-75 sm:scale-90 md:scale-100 transition-transform">
                    {displayProjects.map((card, index) => {
                        // Re-calc index for visual stacking order (bottom to top)
                        const visualIndex = index;

                        // Calculate positions
                        const centerIndex = (displayProjects.length - 1) / 2;

                        // Default: Slight fan
                        const defaultX = (visualIndex - centerIndex) * 25;
                        const defaultRotate = (visualIndex - centerIndex) * 4;

                        // Hover: Wide split
                        const hoverX = (visualIndex - centerIndex) * 90;
                        const hoverRotate = (visualIndex - centerIndex) * 15;

                        return (
                            <motion.div
                                key={card.id}
                                layoutId={`card-${card.id}`}
                                onClick={() => setSelectedProject(card)}
                                onMouseEnter={() => setHoveredCardId(card.id)}
                                initial={{ rotate: defaultRotate, x: defaultX, y: 0, scale: 0.9 }}
                                animate={{
                                    rotate: hovered ? hoverRotate : defaultRotate,
                                    x: hovered ? hoverX : defaultX,
                                    y: hovered ? -20 : 0,
                                    scale: hovered && visualIndex === 2 ? 1.1 : 1,
                                    zIndex: card.zIndex,
                                }}
                                whileHover={{ scale: 1.15, zIndex: 100, transition: { duration: 0.2 } }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    mass: 0.8
                                }}
                                style={{
                                    zIndex: card.zIndex,
                                    transformOrigin: "bottom center"
                                }}
                                className={`absolute inset-0 flex flex-col justify-end cursor-pointer group`}
                            >
                                {/* MAIN VISUAL CARD CONTAINER (Clipped content) */}
                                <div className={`absolute inset-0 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br ${card.previewImage ? '' : card.color} border border-white/10 backdrop-blur-sm`}>
                                    {/* Fallback gradient if no image, or overlay if image exists */}
                                    {card.previewImage ? (
                                        <img src={card.previewImage} alt={card.title} className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 saturate-[1.1] shadow-2xl" />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color || 'from-gray-800 to-black'} opacity-100`} />
                                    )}

                                    {/* Glossy overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                                    {/* Card Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                                        <div className="w-8 h-8 rounded-full bg-white/20 mb-2 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        </div>
                                        <h3 className="font-bold text-lg leading-none tracking-tight">{card.title}</h3>
                                        <p className="text-xs text-white/90 font-medium mt-1">{card.tags?.[0] || 'Project'}</p>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                </div>


                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Image Area */}
                            <div className={`h-48 bg-gradient-to-br ${selectedProject.color || 'from-gray-700 to-gray-900'} relative p-8 flex flex-col justify-end`}>
                                {selectedProject.previewImage && (
                                    <img src={selectedProject.previewImage} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                )}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors z-50"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div className="relative z-10">
                                    <motion.h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</motion.h2>
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                                        {selectedProject.tags?.[0] || 'Project'}
                                    </span>
                                </div>
                                {/* Decorative blobs */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(selectedProject.tags || []).map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        className="px-6 py-3 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
                                        onClick={() => setSelectedProject(null)}
                                    >
                                        Close
                                    </button>
                                    <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
