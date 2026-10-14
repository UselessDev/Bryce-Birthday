import { useMemo, useState } from "react";
import "../styles/postcard.css";

export default function Postcard({ name, message, signature, onFlip }) {
  const [flipped, setFlipped] = useState(false);
  const date = useMemo(
    () => new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }),
    []
  );

  const toggle = () => {
    if (!flipped) onFlip?.();
    setFlipped((f) => !f);
  };

  return (
    <div
      className="bd-pc bd-rv"
      data-reveal
      role="button"
      tabIndex={0}
      aria-label="Flip the postcard"
      onClick={toggle}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
    >
      <div className={`pc-inner ${flipped ? "flip" : ""}`}>
        {/* Front */}
        <div className="pc-face">
          <div className="pc-paper pc-front-paper">
            <div className="pc-big">💌</div>
            <div className="pc-greet">A little something<br />just for you</div>
            <div className="pc-hand">Special delivery for {name}</div>
            <div className="pc-hint">Tap to flip the card</div>
          </div>
        </div>

        {/* Back */}
        <div className="pc-face pc-back">
          <div className="pc-paper pc-back-paper">
            <div className="pc-msg">
              <h2>Thank you 💛</h2>
              {message.map((p, i) => <p key={i}>{p}</p>)}
              <div className="sig">{signature}</div>
            </div>
            <div className="pc-addr">
              <div className="pc-stamp">
                <div className="pc-stamp-in">🎂<small>BIRTHDAY</small></div>
              </div>
              <div className="pc-mark">
                <span>HAPPY</span><span>BIRTHDAY</span><span>{date}</span>
              </div>
              <div className="pc-to">
                To:
                <div className="pc-line">{name}</div>
                <div className="pc-line">with respect</div>
                <div className="pc-line">🎈</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}