import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    // Destroy stale instance before creating a new one
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }

    lenisInstance = new Lenis({
      // Tuned for 60 FPS smoothness without feeling sluggish
      duration: 0.9,               // was 1.2 — shorter = more responsive
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out feels snappier
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,        // slightly reduced = less over-travel
      touchMultiplier: 1.5,        // touch stays responsive
      infinite: false,
      // Sync Lenis with the browser's native scroll targets so react-scroll
      // anchor links trigger Lenis instead of the browser engine
      syncToNative: false,
    });

    // Single RAF loop — Lenis manages its own tick scheduling
    let rafId: number;
    function raf(time: number) {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Access the Lenis instance from anywhere (e.g. nav link onClick) */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Programmatically scroll to a DOM element ID via Lenis.
 * Falls back to native scrollIntoView if Lenis is not ready.
 */
export function scrollToSection(id: string, offset = -80): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 0.9 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
