import hero from "./assets/bday_boy.jpg";
import photo1 from "./assets/2.jpg";
import photo2 from "./assets/2.1.jpg";
import photo3 from "./assets/bini.jpg";
import photo4 from "./assets/b1.jpg";
import photo5 from "./assets/b2.jpg";
import song from "./assets/bgm/birthday-song.mp3";


// ================= EDIT THESE =================
// His name. You can also open the site with ?name=Mark
export const NAME = "Bluwyn Bryce Ermac";

// Hero background photo. Put the image in src/assets/ then:
//   import hero from "./assets/hero.jpg";  and set  export const HERO_IMG = hero;
// Leave empty for the soft bokeh background.
export const HERO_IMG = hero;

// Gallery photos (same idea: import each image and use it as `src`).
export const PHOTOS = [
  { src: photo1, cap: "Best day" },
  { src: photo4, cap: "Legend" },
  { src: photo5, cap: "Good times" },
  { src: photo2, cap: "Gaal" },
];

// Postcard message (one string per paragraph) and signature.
export const MESSAGE = [
  "I didn't have a gift to wrap, so I built you this instead, because that's what I do for people who matter.",
  "Thank you for being there through the good days and the messy ones, for the laughs, the advice, and for always being yourself around me.",
  "I hope this year brings you everything you've been working for, and even more that you haven't dared to ask for yet.",
];
export const SIGNATURE = "With gratitude, your friend";

// Background music (starts when they visit the site, then loops).
// Paste a YouTube link, a direct .mp3/.ogg URL, or put a file in public/ and use "/song.mp3".
// You can also import it:  import song from "./assets/song.mp3";  then  export const BGM = song;
export const BGM = song;
// ==============================================

// ===== Last section: the gift =====
// The single image that pops out of the gift box (import it like the others).
export const GIFT_IMG = photo3;
export const GIFT_CAP = "Happy birthday Boi, From BINI Fam 🎂";
