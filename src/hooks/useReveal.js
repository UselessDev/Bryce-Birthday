import { useEffect } from "react";

// Adds the "in" class to any [data-reveal] element once it scrolls into view.
// Elements with data-burst also fire confetti when revealed.
export default function useReveal(rootRef, onBurst) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (e.target.dataset.burst) onBurst(60, window.innerWidth / 2, window.innerHeight * 0.3);
        }),
      { threshold: 0.25 }
    );
    rootRef.current.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, onBurst]);
}