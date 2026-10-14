import { useState } from "react";

export default function Polaroid({ photo, index }) {
  const [preview, setPreview] = useState("");

  // Lets you preview a photo locally before you add it to config.js
  const pick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) setPreview(URL.createObjectURL(file));
    };
    input.click();
  };

  const src = photo.src || preview;
  return (
    <div
      className="bd-pol"
      data-reveal
      style={{ "--r": `${(index % 2 ? 1 : -1) * (2 + index)}deg`, "--d": `${index * 0.15}s` }}
    >
      <div className="bd-ph" onClick={src ? undefined : pick}>
        {src ? <img src={src} alt={photo.cap} /> : "📷 Tap to preview a photo"}
      </div>
      <span>{photo.cap}</span>
    </div>
  );
}