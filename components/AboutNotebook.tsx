import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface AboutNotebookProps {
    frameCount?: number;
}

export function AboutNotebook({ frameCount = 240 }: AboutNotebookProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // We rely on the parent or window scroll?
    // Requirement: "Starts closed, opens progressively as user scrolls through About section"
    // So we need to track scroll of the *container* relative to viewport.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"] // Start animating when top of container hits bottom of screen? Or start center?
        // User said: "Ao entrar na seção Sobre -> notebook aparece quase fechado"
        // "Conforme rola -> abre"
        // "Final da seção -> 100% aberto"
        // Let's try ["start center", "end center"] or ["start end", "end start"]
        // "end end" means when bottom of container hits bottom of screen (fully scrolled in)
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Smooth Scale/Lift
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 0.95]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]); // Slight tilt correction

    // Overlay Visibility
    const overlayOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

    // Load Images
    useEffect(() => {
        // img (1).jpg ... img (240).jpg
        const paths = Array.from({ length: frameCount }, (_, i) => `/notebook-frames/img (${i + 1}).jpg`);
        const imgs = new Array(frameCount);
        let loaded = 0;

        paths.forEach((p, i) => {
            const img = new Image();
            img.src = p;
            img.onload = () => {
                imgs[i] = img;
                loaded++;
                if (loaded === frameCount) setImages(imgs);
            };
        });
    }, [frameCount]);

    // Render Logic
    useMotionValueEvent(frameIndex, 'change', (latest) => {
        const idx = Math.round(latest);
        const canvas = canvasRef.current;
        if (!canvas || !images[idx]) return;

        const ctx = canvas.getContext('2d');
        const img = images[idx];
        if (!ctx) return;

        // Cover logic but confined to container dimensions
        const dpr = window.devicePixelRatio || 1;
        // Use container dimensions, but canvas needs absolute size?
        // Let's stick to window mapping or container mapping?
        // Since it's a split layout, it should fit the "Left Column".

        // We need to sync canvas size to display size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const imgRatio = img.width / img.height;
        const canvasRatio = rect.width / rect.height;

        let dw = rect.width;
        let dh = rect.height;
        let dx = 0;
        let dy = 0;

        if (canvasRatio > imgRatio) {
            dh = rect.width / imgRatio;
            dy = (rect.height - dh) / 2;
        } else {
            dw = rect.height * imgRatio;
            dx = (rect.width - dw) / 2;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, dx, dy, dw, dh);
    });

    return (
        <div ref={containerRef} className="w-full h-[60vh] md:h-[80vh] lg:h-screen sticky top-0 flex items-center justify-center pointer-events-none">
            {/* Notebook Wrapper - Scaled Up and Blend Mode */}
            <motion.div
                style={{ scale, rotateX }}
                className="relative w-full h-full max-w-[1000px] flex items-center justify-center"
            >
                <canvas ref={canvasRef} className="w-full h-full object-contain mix-blend-lighten" />
            </motion.div>
        </div>
    );
}
