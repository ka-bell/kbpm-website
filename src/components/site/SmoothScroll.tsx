"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import "lenis/dist/lenis.css";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/**
 * Site-wide delayed / smooth scroll (Lenis).
 * With reduced motion, lerp → 1 so scroll stays native-feel without remounting the tree.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        // Slight lag behind the wheel — intentional “delayed scroll”
        lerp: reduced ? 1 : 0.085,
        duration: reduced ? 0 : 1.15,
        smoothWheel: !reduced,
        syncTouch: false,
        touchMultiplier: 1.4,
        wheelMultiplier: 0.95,
        anchors: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
