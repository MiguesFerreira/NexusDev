import { useEffect, useState, useRef } from "react";

const TOTAL_FRAMES = 88;
const FPS = 30; // velocidade da animação

export default function FrameAnimation() {
  const [frame, setFrame] = useState(1);
  const images = useRef([]);
  const lastTime = useRef(0);

  // preload das imagens
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame${i}.png`;
      images.current.push(img);
    }
  }, []);

  // animação
  useEffect(() => {
    const animate = (time) => {
      if (time - lastTime.current > 1000 / FPS) {
        setFrame((prev) => (prev % TOTAL_FRAMES) + 1);
        lastTime.current = time;
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <img
      src={`/frames/frame${frame}.png`}
      alt="Animação frame a frame"
      className="w-64 h-64 object-contain"
    />
  );
}
