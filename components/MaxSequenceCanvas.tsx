import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const FRAME_COUNT = 120;
const PRELOAD_COUNT = 20;

const MaxSequenceCanvas: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sequence = useRef({ frame: 0 });
  const lastFrame = useRef(-1);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const frame = Math.round(sequence.current.frame);
    const img = imagesRef.current[frame];

    if (!img || !img.complete) return;

    if (frame === lastFrame.current) return;
    lastFrame.current = frame;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const scale = Math.min(w / img.width, h / img.height);

    const drawW = img.width * scale;
    const drawH = img.height * scale;

    const x = (w - drawW) / 2;
    const y = (h - drawH) / 2;

    ctx.drawImage(img, x, y, drawW, drawH);
  }, []);

  useEffect(() => {
    imagesRef.current = [];

    // preload first 20
    for (let i = 0; i < PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = `/images/sequences/seq_max_2/output-${String(i + 1).padStart(4, '0')}.webp`;

      img.onload = async () => {
        try { await img.decode(); } catch {}
        if (i === 0) render();
      };

      imagesRef.current.push(img);
    }

    // batch load remaining
    let current = PRELOAD_COUNT;

    const loadNextBatch = () => {
      const batchSize = 10;

      for (let i = 0; i < batchSize && current < FRAME_COUNT; i++, current++) {
        const img = new Image();
        img.src = `/images/sequences/seq_max_2/output-${String(current + 1).padStart(4, '0')}.webp`;
        imagesRef.current[current] = img;
      }

      if (current < FRAME_COUNT) {
        setTimeout(loadNextBatch, 100);
      }
    };

    setTimeout(loadNextBatch, 500);

    const ctx = gsap.context(() => {
      gsap.to(sequence.current, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: render,
        }
      });
    }, sectionRef);

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const wrapper = canvas.parentElement;
      if (!wrapper) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = wrapper.clientWidth * dpr;
      canvas.height = wrapper.clientHeight * dpr;

      const ctxCanvas = canvas.getContext('2d');
      if (ctxCanvas) ctxCanvas.setTransform(dpr, 0, 0, dpr, 0, 0);

      lastFrame.current = -1;
      render();
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      ctx.revert();
      window.removeEventListener('resize', resize);
    };
  }, [render]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] px-8 overflow-hidden flex flex-col items-center border-t border-white/5"
    >
      <div className="w-full max-w-7xl aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/5 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
};

export default MaxSequenceCanvas;