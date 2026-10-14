import { useEffect, useMemo, useRef, useState } from "react";

function parseBgm(src) {
  if (!src) return null;
  const url = String(src);
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (yt) return { type: "youtube", id: yt[1] };
  return { type: "audio", src: url };
}

export default function Bgm({ src }) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const kind = useMemo(() => parseBgm(src), [src]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || kind?.type !== "audio") return;

    a.loop = true;
    a.muted = muted;

    const start = () => a.play().catch(() => {});
    start();

    const resume = () => start();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [kind, muted]);

  if (!kind) return null;

  return (
    <>
      {kind.type === "audio" && <audio ref={audioRef} src={kind.src} loop autoPlay preload="auto" />}
      {kind.type === "youtube" && (
        <iframe
          className="bd-yt"
          src={`https://www.youtube-nocookie.com/embed/${kind.id}?autoplay=1&loop=1&playlist=${kind.id}&controls=0${muted ? "&mute=1" : ""}`}
          allow="autoplay; encrypted-media"
          title="Background music"
        />
      )}
      <button
        className="bd-mute"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? "🔇" : "🎵"}
      </button>
    </>
  );
}
