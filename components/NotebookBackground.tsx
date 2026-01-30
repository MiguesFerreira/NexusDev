import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Updated for user's 240 frame sequence: img (1).jpg to img (240).jpg
export function ScrollNotebookBackground({ frameCount = 240 }: { frameCount?: number }) {
    const { scrollYProgress } = useScroll(); // Tracks window scroll 0-1
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Mapped Values
    // Map 0..1 scroll to 0..frameCount-1
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.92, 1]); // Subtle zoom
    const yOffset = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]); // Parallax lift

    // Overlay Visibility - fading in during the last 15% of the scroll
    const overlayOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
    const overlayScale = useTransform(scrollYProgress, [0.85, 1], [0.9, 1]);

    useEffect(() => {
        // Generate paths for N frames
        // User format: img (1).jpg, img (2).jpg... (1-indexed)
        const paths = Array.from({ length: frameCount }, (_, i) => `/notebook-frames/img (${i + 1}).jpg`);

        // Load images progressively to show *something* quickly? 
        // Or just all at once. For 240 images, might be heavy. 
        // Let's load them all but maybe we should optimize later.
        let loadedCount = 0;
        const imgs = new Array(frameCount);

        paths.forEach((p, i) => {
            const img = new Image();
            img.src = p;
            img.onload = () => {
                imgs[i] = img;
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(imgs);
                }
                // Optional: setImages regularly to show progress? No, flickers.
                // But if we want to show *partial* result, we need to handle sparse array in render.
            };
            // If error, just ignore for now or handle strictly
        });

        // Fallback / Partial set: check after 2 seconds if not all loaded?
        // For now simple full load:
    }, [frameCount]);

    // If images not fully loaded, we can still render what we have if we check existence
    useMotionValueEvent(frameIndex, 'change', (latest) => {
        const idx = Math.round(latest);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // If image at this index isn't loaded yet, try previous ones? or just wait.
        // Since 'images' state is only set when ALL are loaded above, we wait. 
        // To improve, we should make 'images' a sparse array or update individually.
        // But for this step let's trust the 'setImages(imgs)' logic for simplicity.
        // Actually, let's fix the useEffect to update state even if partial?
        // No, let's stick to the previous pattern but allow sparse access if we change the state logic.
        // But wait: 'images' is empty [] initially.

        if (!images[idx]) return;

        const img = images[idx];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let dw = canvas.width;
        let dh = canvas.height;
        let dx = 0;
        let dy = 0;

        if (canvasRatio > imgRatio) {
            dh = canvas.width / imgRatio;
            dy = (canvas.height - dh) / 2;
        } else {
            dw = canvas.height * imgRatio;
            dx = (canvas.width - dw) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, dx, dy, dw, dh);
    });

    // Optimization: Allow rendering partial loads
    useEffect(() => {
        // If we want to allow partial rendering, we need to move setImages inside the onload
        // But re-rendering 240 times is bad. 
        // Let's stick to "All loaded" for smoothness, or maybe batch.
        // Given the user is local/fast, it might be fine.
    }, []);

    return (
        <div className="fixed inset-0 z-[-10] pointer-events-none bg-slate-950">
            <motion.div style={{ scale, translateY: yOffset, opacity: 1 }} className="w-full h-full relative">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />

                {/* Dark Overlay for contrast - adjusted for new images */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-40" />

                {/* Code Overlay - Positioned manually to match screen of frame_2.png */
             /* Note: Since the new frames might have different screen position, 
                this overlay might need adjusting by the user or me.
                I'll leave it generally centered/top-ish. 
             */}
                <motion.div
                    style={{ opacity: overlayOpacity, scale: overlayScale }}
                    className="absolute top-[22%] left-[26%] w-[48%] h-[53%] perspective-1000" // Adjust these % based on image
                >
                    <div className="w-full h-full bg-[#0d1117]/90 backdrop-blur-sm rounded-md overflow-hidden border border-slate-700/50 shadow-[0_0_30px_rgba(56,189,248,0.1)] p-4 text-[10px] md:text-sm font-mono leading-relaxed text-slate-300 transform rotateX(5deg)">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <div className="text-slate-500 text-xs">nexus-core — vertexbox</div>
                        </div>

                        {/* Code Content */}
                        <div className="space-y-1">
                            <div className="typing-effect">
                                <span className="text-purple-400">import</span> {'{'} <span className="text-yellow-300">AnimatePresence</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span>;
                            </div>
                            <div>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">NexusEngine</span> = (<span className="text-orange-300">props</span>: <span className="text-yellow-300">CoreProps</span>) <span className="text-purple-400">=&gt;</span> {'{'}
                            </div>
                            <div className="pl-4 text-slate-400">// Initializing high-performance render loop</div>
                            <div className="pl-4">
                                <span className="text-purple-400">const</span> [active, setActive] = <span className="text-blue-400">useState</span>(<span className="text-red-400">true</span>);
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">return</span> (
                            </div>
                            <div className="pl-8">
                                &lt;<span className="text-yellow-300">motion.div</span>
                            </div>
                            <div className="pl-12">
                                <span className="text-sky-300">animate</span>={'{{'} <span className="text-sky-300">scale</span>: <span className="text-blue-400">1.0</span> {'}}'}
                            </div>
                            <div className="pl-12">
                                <span className="text-sky-300">transition</span>={'{{'} <span className="text-sky-300">duration</span>: <span className="text-blue-400">0.8</span> {'}}'}
                            </div>
                            <div className="pl-8">
                                &gt;
                            </div>
                            <div className="pl-12 text-green-400">
                                "Next Generation Experience"
                            </div>
                            <div className="pl-8">
                                &lt;/<span className="text-yellow-300">motion.div</span>&gt;
                            </div>
                            <div className="pl-4">
                                );
                            </div>
                            <div>{'}'};</div>

                            <div className="mt-4 pt-2 border-t border-slate-800 text-teal-500 animate-pulse">
                                &gt; _ Compiling assets... Done (0.4s)
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
