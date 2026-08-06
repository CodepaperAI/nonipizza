/**
 * npm run images:generated
 *
 * Second image pipeline, alongside `prep-brand-images.mjs`.
 *
 * `prep-brand-images.mjs` composites Noni's own transparent-PNG dish cut-outs onto the brand
 * texture. This one handles the *generated* dish renders in `nonipizza_photos/` — full-frame
 * 4:3 top-down shots on dark slate, one per menu-item id — and writes the same web JPEGs to
 * `public/images/photos/`.
 *
 * Two things have to be cropped out of every source file:
 *   1. the generator's "✦" watermark, bottom-right, at ~88–93% width / ~85–92% height;
 *   2. thin light letterbox borders on some renders.
 * A single proportional 4:3 window handles both: keep x from 2% to 87.2% of width, centre it
 * vertically. The dish sits centre-frame in every source, so it survives the crop; the
 * watermark and borders do not. Output is re-checked visually before mapping — see
 * IMAGE-MANIFEST.md.
 *
 * These are AI-generated renders, NOT photographs of Noni's plates. They must never be added
 * to `REAL_PHOTOS` in src/lib/photos.ts. See CREDITS.md.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "nonipizza_photos";
const OUT = "public/images/photos";

/** 4:3 product card, matching prep-brand-images.mjs CARD. */
const CARD = { w: 1200, h: 900 };

/** Crop window as fractions of the source, chosen to drop the watermark + any border. */
const KEEP = { x0: 0.02, x1: 0.872 };

/** Source files whose name isn't already the menu-item id. */
const RENAME = {
  "pizza-butter-chicken (2)": "pizza-butter-chicken",
  "pizza-spicy-paneer (2)": "pizza-spicy-paneer",
};

async function main() {
  const files = fs.readdirSync(SRC).filter((f) => /\.png$/i.test(f));
  if (!files.length) throw new Error(`no PNGs in ${SRC}/`);
  fs.mkdirSync(OUT, { recursive: true });

  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const slot = RENAME[base] ?? base;

    const img = sharp(path.join(SRC, file));
    const { width, height } = await img.metadata();

    const cropW = Math.round((KEEP.x1 - KEEP.x0) * width);
    const cropH = Math.round(cropW * (CARD.h / CARD.w));
    if (cropH > height) {
      throw new Error(`${file}: crop height ${cropH} exceeds source height ${height}`);
    }
    const left = Math.round(KEEP.x0 * width);
    const top = Math.round((height - cropH) / 2);

    const dest = path.join(OUT, `${slot}.jpg`);
    await img
      .extract({ left, top, width: cropW, height: cropH })
      .resize(CARD.w, CARD.h, { fit: "cover" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest);

    console.log(`✓ ${dest}  ${CARD.w}x${CARD.h}   ← ${file}`);
  }

  console.log(`\n${files.length} generated renders written to ${OUT}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
