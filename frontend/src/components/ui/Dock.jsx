import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function DockItem({ item, mouseX, baseItemSize, magnification }) {
  const ref = useRef(null);

  // Calculate distance from center of this icon to mouse
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate scaling based on distance using a sharper curve (peak at 0)
  const sizeTransform = useTransform(
    distance,
    [-150, 0, 150],
    [baseItemSize, magnification, baseItemSize]
  );

  // Apply a smooth spring to the calculated size
  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center rounded-[20%] cursor-pointer group select-none transition-colors border"
      style={{
        width: size,
        height: size,
        background: 'hsl(var(--background-elevated) / 0.7)',
        borderColor: 'hsl(var(--border) / 0.5)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px hsl(var(--foreground) / 0.1)',
      }}
    >
      <div 
        className="flex items-center justify-center w-full h-full text-foreground-muted group-hover:text-foreground transition-colors"
        style={{ transform: 'scale(1.2)' }}
      >
        {item.icon}
      </div>

      {/* Tooltip on Top */}
      <div 
        className="absolute bottom-full mb-3 px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{
           background: 'hsl(var(--foreground))',
           color: 'hsl(var(--background))',
        }}
      >
        {item.label}
        {/* Triangle pointer */}
        <div 
           className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent" 
           style={{ borderTopColor: 'hsl(var(--foreground))' }}
        />
      </div>
    </motion.button>
  );
}

export default function Dock({ items, panelHeight = 68, baseItemSize = 50, magnification = 70 }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end justify-center gap-3 px-4 pb-2 rounded-2xl"
      style={{ height: panelHeight }}
    >
      {items.map((item, idx) => (
        <DockItem
          key={idx}
          item={item}
          mouseX={mouseX}
          baseItemSize={baseItemSize}
          magnification={magnification}
        />
      ))}
    </div>
  );
}
