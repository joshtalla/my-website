import React, { useEffect, useRef, useCallback } from 'react';
import './HeroBg.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
}

const HeroBg = React.forwardRef<HTMLDivElement>((props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isHoveringRef = useRef(false);

    const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 4 + 1,
            opacity: Math.random() * 0.6 + 0.3,
            hue: Math.random() * 60 + 200 // Blue to purple range
        };
    }, []);

    const initParticles = useCallback((canvas: HTMLCanvasElement) => {
        // Reduce particle count for full page background to improve performance
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));
    }, [createParticle]);

    const updateParticles = useCallback((canvas: HTMLCanvasElement, deltaTime: number) => {
        const mouse = mouseRef.current;
        const isHovering = isHoveringRef.current;

        particlesRef.current.forEach(particle => {
            // Mouse interaction
            if (isHovering) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                const maxDistance = 160;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance * 0.05;
                    particle.vx += (dx / distance) * force;
                    particle.vy += (dy / distance) * force;
                }
            }

            // Update position
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;

            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Boundary wrapping
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Subtle floating motion
            particle.opacity = 0.35 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.15;
        });
    }, []);

    const drawParticles = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        particlesRef.current.forEach((particle, i) => {
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const other = particlesRef.current[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) {
                    const opacity = (1 - distance / 140) * 0.15;
                    ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        });

        // Draw particles
        particlesRef.current.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

            // Gradient for particles
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 70%, ${particle.opacity})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 50%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fill();

            // Glowing effect
            ctx.shadowBlur = Math.max(8, particle.size * 3);
            ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.7})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 80%, 80%, ${particle.opacity})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const deltaTime = 1; // Normalized for 60fps

        updateParticles(canvas, deltaTime);
        drawParticles(ctx, canvas);

        animationRef.current = requestAnimationFrame(animate);
    }, [updateParticles, drawParticles]);

    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas dimensions to match its visual size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initParticles(canvas);
    }, [initParticles]);

    const handlePointerMove = useCallback((e: PointerEvent) => {
        mouseRef.current = {
            x: e.clientX,
            y: e.clientY
        };

        isHoveringRef.current = true;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        handleResize();
        animationRef.current = requestAnimationFrame(animate);

        window.addEventListener('resize', handleResize);
        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [animate, handleResize, handlePointerMove]);

    return (
        <div className="page-bg" ref={ref}>
            <canvas
                ref={canvasRef}
                className="page-bg__canvas"
                aria-hidden="true"
            />
            <div className="page-bg__overlay" />
        </div>
    );
});

export default HeroBg;
