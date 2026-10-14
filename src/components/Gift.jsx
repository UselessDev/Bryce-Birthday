import { useState } from "react";
import "../styles/gift.css";

// idle -> shake -> open
export default function Gift({ image, caption, onOpen }) {
  const [phase, setPhase] = useState("idle");

  const openGift = () => {
    if (phase !== "idle") return;
    setPhase("shake");
    setTimeout(() => {
      setPhase("open");
      onOpen?.();
    }, 700);
  };

  return (
    <section className="gf-sec">
      <h2 className="bd-t bd-rv" data-reveal>One last thing 🎁</h2>
      <p className="gf-sub">{phase === "open" ? "Surprise!" : "I did get you something after all."}</p>

      <div className={`gf-stage ${phase}`}>
        <div className="gf-glow" />

        <button
          className={`gf-box ${phase}`}
          onClick={openGift}
          aria-label="Open the gift"
          disabled={phase !== "idle"}
        >
          <span className="gf-lid" />
          <span className="gf-body" />
        </button>

        {/* Wide image that grows out of the box */}
        <figure className={`gf-photo ${phase === "open" ? "show" : ""}`} aria-hidden={phase !== "open"}>
          {image ? (
            <img src={image} alt={caption} />
          ) : (
            <div className="gf-empty">🎂 Your image goes here</div>
          )}
          <figcaption>{caption}</figcaption>
        </figure>
      </div>

      {phase === "idle" && <div className="gf-hint">Tap the gift</div>}
    </section>
  );
}