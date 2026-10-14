import "../styles/gate.css";

export default function Gate({ opened, onOpen }) {
  return (
    <div className={`bd-gate ${opened ? "gone" : ""}`}>
      <button className="bd-gift" onClick={onOpen} aria-label="Open your surprise">🎁</button>
      <p>Tap to open your surprise</p>
    </div>
  );
}