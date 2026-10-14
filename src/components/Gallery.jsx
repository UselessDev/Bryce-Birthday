import Polaroid from "./Polaroid";
import "../styles/gallery.css";

export default function Gallery({ photos }) {
  return (
    <section>
      <h2 className="bd-t bd-rv" data-reveal data-burst="1">Moments with you 📸</h2>
      <div className="bd-grid">
        {photos.map((p, i) => <Polaroid key={i} photo={p} index={i} />)}
      </div>
    </section>
  );
}