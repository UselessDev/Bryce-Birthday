import { useCallback, useEffect, useRef } from "react";

export const COLORS = ["#ff6fb5", "#ffd36e", "#6fe7ff", "#b58cff", "#7dffb0"];

export default function useConfetti() {
  const canvasRef = useRef(null);
  const bitsRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  const burst = useCallback((n, x, y) => {
    const { w, h } = sizeRef.current;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 4 + Math.random() * 9;
      bitsRef.current.push({
        x: x ?? w / 2, y: y ?? h / 2,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6,
        w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
        c: COLORS[i % 5], r: Math.random() * 6, vr: Math.random() * 0.3 - 0.15,
        l: 160 + Math.random() * 80,
      });
    }
  }, []);

  const rain = useCallback(() => {
    const { w } = sizeRef.current;
    for (let i = 0; i < 6; i++) {
      bitsRef.current.push({
        x: Math.random() * w, y: -10, vx: Math.random() * 2 - 1, vy: 2 + Math.random() * 3,
        w: 6 + Math.random() * 5, h: 4 + Math.random() * 4, c: COLORS[i % 5],
        r: 0, vr: Math.random() * 0.2, l: 300,
      });
    }
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv.getContext("2d");
    const resize = () => {
      sizeRef.current = { w: (cv.width = window.innerWidth), h: (cv.height = window.innerHeight) };
    };
    resize();
    window.addEventListener("resize", resize);
    let raf;
    const loop = () => {
      const { w, h } = sizeRef.current;
      cx.clearRect(0, 0, w, h);
      bitsRef.current = bitsRef.current.filter((b) => b.l > 0 && b.y < h + 20);
      for (const b of bitsRef.current) {
        b.x += b.vx; b.y += b.vy; b.vy += 0.12; b.vx *= 0.99; b.r += b.vr; b.l--;
        cx.save();
        cx.translate(b.x, b.y);
        cx.rotate(b.r);
        cx.fillStyle = b.c;
        cx.globalAlpha = Math.min(1, b.l / 40);
        cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        cx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return { canvasRef, burst, rain };
}