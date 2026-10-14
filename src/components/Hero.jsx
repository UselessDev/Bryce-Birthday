import { useMemo } from "react";
import { COLORS } from "../hooks/useConfetti";
import "../styles/hero.css";

const BALLOONS = ["🎈", "🎉", "🎈", "✨", "🎈", "🎊"].map((e, i) => ({
  e, left: 8 + i * 16, dur: 9 + i * 2, delay: i * 1.2,
}));

export default function Hero({ opened, name, image, onTap }) {
  // Your photo, or a soft bokeh fallback
  const src = useMemo(() => {
    if (image) return image;
    let c = "";
    for (let i = 0; i < 22; i++) {
      c += `<circle cx="${Math.random() * 800}" cy="${Math.random() * 600}" r="${30 + Math.random() * 80}" fill="${COLORS[i % 4]}" opacity=".55"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#2a1245"/>${c}</svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }, [image]);

  return (
    <section id="bd-hero" className={opened ? "show" : ""} onClick={(e) => opened && onTap(e.clientX, e.clientY)}>
      <div className="bd-herobg">
        <div className="bd-heroimg" style={{ backgroundImage: `url("${src}")` }} />
      </div>
      <div className="bd-pop">
        <div className="bd-hb">Happy Birthday</div>
        <div className="bd-name">{name}</div>
        <div className="bd-sub">Today is all about you ✨</div>
      </div>
      {BALLOONS.map((b, i) => (
        <div key={i} className="bd-balloon" style={{ left: `${b.left}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>
          {b.e}
        </div>
      ))}
      <div className="bd-scroll">SCROLL ↓</div>
    </section>
  );
}