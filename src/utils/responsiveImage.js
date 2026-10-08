const imageDimensions = {
  "CafeImage10.webp": [1360, 1017],
  "CafeImage11.webp": [1360, 1020],
  "CafeImage12.webp": [763, 1020],
  "CafeImage13.webp": [1020, 1020],
  "CafeImage14.webp": [456, 1020],
  "CafeImage2.webp": [510, 1020],
  "CafeImage3.webp": [1360, 1017],
  "CafeImage4.webp": [763, 1020],
  "CafeImage5.webp": [1360, 1020],
  "CafeImage6.webp": [763, 1020],
  "CafeImage9.webp": [1360, 1020],
  "cAFEiMAGE7.webp": [1360, 765],
  "hero.webp": [1360, 1017],
};

export function responsiveImageProps(src, sizes) {
  const filename = src.slice(src.lastIndexOf("/") + 1);
  const dimensions = imageDimensions[filename];
  if (!dimensions) return { sizes };

  const [width, height] = dimensions;
  const candidates = [640, 960]
    .filter((candidate) => candidate < width)
    .map((candidate) => `${src.replace(/\.webp$/i, `-${candidate}.webp`)} ${candidate}w`);
  candidates.push(`${src} ${width}w`);

  return { srcSet: candidates.join(", "), sizes, width, height };
}
