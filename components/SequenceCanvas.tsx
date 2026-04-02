import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const FRAME_COUNT = 90;
const PRELOAD_COUNT = 20;

const SequenceCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sequence = useRef({ frame: 0 });
  const lastFrame = useRef(-1);

  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const render = useCallback(() => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const frame = Math.round(sequence.current.frame);
  const img = imagesRef.current[frame];

  // FIX: check image FIRST
  if (!img || !img.complete) return;

  // THEN check frame
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
    setImagesLoaded(0);
    setIsLoading(true);

    let loadedCount = 0;

    const onLoad = () => {
      loadedCount++;
      setImagesLoaded(loadedCount);

      if (loadedCount === FRAME_COUNT) setIsLoading(false);
      if (loadedCount === 1) {
  requestAnimationFrame(() => {
    sequence.current.frame = 0;
    lastFrame.current = -1;
    render();
  });
}
    };

    for (let i = 0; i < PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = `/images/sequences/seq_standard_2/output-${String(i + 1).padStart(4, '0')}.webp`;

      img.onload = async () => {
        try { await img.decode(); } catch {}
        onLoad();
      };

      img.onerror = onLoad;

      imagesRef.current.push(img);
    }
let current = PRELOAD_COUNT;

const loadNextBatch = () => {
  const batchSize = 10;

  for (let i = 0; i < batchSize && current < FRAME_COUNT; i++, current++) {
    const img = new Image();
    img.src = `/images/sequences/seq_standard_2/output-${String(current + 1).padStart(4, '0')}.webp`;
    imagesRef.current[current] = img;
  }

  if (current < FRAME_COUNT) {
    setTimeout(loadNextBatch, 100);
  }
};

// start after initial load settles
setTimeout(loadNextBatch, 500);
    const timeout = setTimeout(() => setIsLoading(false), 10000);

    const ctx = gsap.context(() => {
      gsap.to(sequence.current, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
          pin: true,
          onUpdate: render,
        }
      });

      gsap.from(".scrolly-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "top 5%",
          scrub: true,
        }
      });

      exitTl.to([".scrolly-text-header", ".scrolly-text-p"], {
        autoAlpha: 0,
        filter: "blur(10px)",
        y: -40,
        stagger: 0.05,
        ease: "power1.in"
      }, 0);

      exitTl.to(".scrolly-canvas-container", {
        y: -100,
        scale: 1.02,
        ease: "power1.inOut"
      }, 0.1);

    }, containerRef);

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const wrapper = canvas.parentElement;
      if (!wrapper) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = wrapper.clientWidth * dpr;
      canvas.height = wrapper.clientHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      lastFrame.current = -1;
requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize(); requestAnimationFrame(render);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
      window.removeEventListener('resize', resize);
    };
  }, [render]);

  const progress = Math.round((imagesLoaded / FRAME_COUNT) * 100);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#050505] px-8 overflow-hidden flex flex-col items-center border-t border-white/5"
    >
      <div className="text-center mb-6 max-w-5xl">
        <span className="scrolly-anim text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4 block">
          PLUGIN LAUNCHER STANDARD
        </span>

        <h2 className="scrolly-anim text-4xl md:text-6xl font-bold text-google-white mb-4">
          The Ultimate Plug-and-Play Solution.
        </h2>

        <p className="scrolly-anim text-google-grey text-lg md:text-xl max-w-3xl mx-auto">
          Standard delivers your native Logic Pro plugins in a curated, touch-ready Project. <br />No configuration required—just pure, high-velocity workflow.
        </p>
      </div>

      <div className="scrolly-anim w-full max-w-6xl aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/5 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <span className="text-xs text-google-grey tracking-widest">
              Loading {progress}%
            </span>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
};

export default SequenceCanvas;