import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DUR = 0.7, RISE = 24, STAGGER = 0.1;

/**
 * Shared scroll reveal. Every matching element reveals on its OWN trigger, once a fifth of that
 * element is on screen: 0.7s fade + 24px rise, ease-out. Elements entering together are staggered 0.1s.
 * Runs once per element and is not tied to the ScrollTrigger refresh cycle, so already-revealed
 * elements can't flash back to hidden.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, selector: string) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    let n = 0, timer: number | undefined;
    const triggers: ScrollTrigger[] = [];
    const clear = (el: HTMLElement) => gsap.set(el, { clearProps: 'transform,opacity,visibility' });

    gsap.set(els, { autoAlpha: 0, y: RISE });

    els.forEach((el) => {
      const show = () => {
        const delay = n++ * STAGGER;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => { n = 0; }, 80);
        gsap.to(el, { autoAlpha: 1, y: 0, duration: DUR, delay, ease: 'power2.out', onComplete: () => clear(el) });
      };
      const st = ScrollTrigger.create({
        trigger: el,
        start: () => `top bottom-=${Math.min(0.2 * el.offsetHeight, 0.6 * window.innerHeight)}`,
        invalidateOnRefresh: true,
        once: true,
        onEnter: show,
      });
      triggers.push(st);
      // already past its trigger on load (e.g. refresh mid-page): show it without animating
      if (st.scroll() > st.start) { st.kill(); gsap.killTweensOf(el); clear(el); }
    });

    return () => {
      window.clearTimeout(timer);
      triggers.forEach((t) => t.kill());
      els.forEach((el) => { gsap.killTweensOf(el); clear(el); });
    };
  }, [ref, selector]);
}
