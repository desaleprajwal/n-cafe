import { ArrowUpRight } from "lucide-react";

const photos = [
  ["/images/CafeImage10.webp", "Pizza and fries to share at N Café", "gallery-feature"],
  ["/images/CafeImage11.webp", "Burgers made at N Café", "gallery-burger"],
  ["/images/CafeImage9.webp", "Grilled sandwiches at N Café", "gallery-sandwich"],
  ["/images/CafeImage5.webp", "Creamy pasta served at N Café", "gallery-pasta"],
  ["/images/CafeImage14.webp", "Chocolate dessert with ice cream", "gallery-dessert"],
  ["/images/CafeImage13.webp", "A plate of golden fries", "gallery-fries"],
  ["/images/CafeImage2.webp", "Freshly baked pizza at N Café", "gallery-pizza"],
  ["/images/CafeImage4.webp", "Guests sharing a meal at N Café", "gallery-guests"],
];

function Gallery() {
  return (
    <section className="section section-gallery" id="gallery">
      <div className="container">
        <div className="section-heading section-heading-row gallery-heading">
          <div><p className="eyebrow">A seat at our table</p><h2>N Café moments</h2></div>
          <a className="text-link" href="https://www.instagram.com/the.ncafe/" target="_blank" rel="noreferrer">Follow on Instagram <ArrowUpRight size={17} /></a>
        </div>
        <div className="gallery-grid">
          {photos.map(([src, alt, shape]) => <figure className={`gallery-photo ${shape}`} key={src}><img src={src} alt={alt} loading="lazy" /></figure>)}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
