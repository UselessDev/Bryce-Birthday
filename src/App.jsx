import { useEffect, useMemo, useRef, useState } from "react";
import { NAME, HERO_IMG, PHOTOS, MESSAGE, SIGNATURE, GIFT_IMG, GIFT_CAP } from "./config";
import useConfetti from "./hooks/useConfetti";
import useReveal from "./hooks/useReveal";
import Gate from "./components/Gate";
import Hero from "./components/Hero";
import Postcard from "./components/Postcard";
import Gallery from "./components/Gallery";
import Gift from "./components/Gift";
import "./styles/global.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const rootRef = useRef(null);
  const { canvasRef, burst, rain } = useConfetti();
  const friendName = "Bluewyn Bryce Ermac"

  const name = useMemo(() => new URLSearchParams(window.location.search).get("name") || NAME, []);

  useEffect(() => {
    document.title = `Happy Birthday` + friendName + `🎉`;
  }, [name]);

  useReveal(rootRef, burst);

  const open = () => {
    setOpened(true);
    const w = window.innerWidth;
    const h = window.innerHeight;
    burst(160);
    setTimeout(() => burst(100, w * 0.2, h * 0.4), 500);
    setTimeout(() => burst(100, w * 0.8, h * 0.4), 800);
    const t = setInterval(rain, 350);
    setTimeout(() => clearInterval(t), 5000);
  };

  return (
    <div className="bd" ref={rootRef}>
      <div className="bd-bg" />
      <canvas className="bd-fx" ref={canvasRef} />

      <Gate opened={opened} onOpen={open} />
      <Hero opened={opened} name={name} image={HERO_IMG} onTap={(x, y) => burst(40, x, y)} />

      <section>
        <Postcard name={name} message={MESSAGE} signature={SIGNATURE} onFlip={() => burst(70)} />
      </section>

      <Gallery photos={PHOTOS} />

      <Gift image={GIFT_IMG} caption={GIFT_CAP} onOpen={() => burst(200)} />

      <footer className="bd-foot">Bogart</footer>
    </div>
  );
}