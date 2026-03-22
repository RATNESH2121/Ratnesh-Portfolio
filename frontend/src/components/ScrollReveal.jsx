import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const variants = {
    up: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    down: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    left: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    right: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.8,
    once = true,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!once) {
            controls.start('hidden');
        }
    }, [isInView, controls, once]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={variants[direction]}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
