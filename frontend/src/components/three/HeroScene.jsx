import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

// Floating particles component
function Particles({ count = 500 }) {
    const mesh = useRef(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            // Purple/blue gradient colors
            const t = Math.random();
            colors[i3] = 0.4 + t * 0.2;     // R
            colors[i3 + 1] = 0.3 + t * 0.2;  // G
            colors[i3 + 2] = 0.8 + t * 0.2;  // B
        }

        return { positions, colors };
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}





// Camera animation
function CameraAnimation() {
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        state.camera.position.x = Math.sin(t * 0.1) * 0.5;
        state.camera.position.y = Math.cos(t * 0.1) * 0.3;
        state.camera.lookAt(0, 0, 0);
    });

    return null;
}

export default function HeroScene() {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Ambient lighting */}
                <ambientLight intensity={0.3} />

                {/* Main directional light */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.5}
                    color="#ffffff"
                />

                {/* Accent point lights */}
                <pointLight position={[-5, 0, -5]} intensity={0.3} color="#6366f1" />
                <pointLight position={[5, 0, 5]} intensity={0.3} color="#8b5cf6" />

                {/* Background stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Main elements */}
                <Particles count={800} />

                {/* Camera movement */}
                <CameraAnimation />
            </Canvas>

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

            {/* Radial glow - Only visible in light mode for that extra pop, removed in dark mode for key-black contrast */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: theme === 'light'
                        ? 'radial-gradient(ellipse at 50% 50%, hsl(245 60% 60% / 0.08) 0%, transparent 60%)'
                        : 'none'
                }}
            />
        </div>
    );
}
