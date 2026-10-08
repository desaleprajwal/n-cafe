import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { business } from "../config/business";
import { responsiveImageProps } from "../utils/responsiveImage";

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
  const [activePhoto, setActivePhoto] = useState(-1);
  const closeButtonRef = useRef(null);
  const isOpen = activePhoto >= 0;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const close = () => setActivePhoto(-1);
    const navigate = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") setActivePhoto((index) => (index + 1) % photos.length);
      if (event.key === "ArrowLeft") setActivePhoto((index) => (index - 1 + photos.length) % photos.length);
      if (event.key === "Tab") {
        const controls = [...document.querySelectorAll(".lightbox-backdrop button")];
        if (event.shiftKey && document.activeElement === controls[0]) {
          event.preventDefault();
          controls.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
          event.preventDefault();
          controls[0]?.focus();
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", navigate);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", navigate);
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  const movePhoto = (step) => setActivePhoto((index) => (index + step + photos.length) % photos.length);

  return (
    <>
      <section className="section section-gallery" id="gallery">
        <div className="container">
          <div className="section-heading section-heading-row gallery-heading">
            <div><p className="eyebrow">A seat at our table</p><h2>N Café moments</h2><p className="section-lede">See what’s cooking, what’s new and what’s happening at N Café.</p></div>
            <a className="text-link" href={business.instagram} target="_blank" rel="noopener noreferrer">Follow on Instagram <ArrowUpRight size={17} /></a>
          </div>
          <div className="gallery-grid">
            {photos.map(([src, alt, shape], index) => <button type="button" className={`gallery-photo ${shape}`} key={src} aria-label={`View photo: ${alt}`} onClick={() => setActivePhoto(index)}><img src={src} {...responsiveImageProps(src, "(max-width: 760px) 50vw, 33vw")} alt={alt} loading="lazy" decoding="async" /><span className="gallery-view-label">View photo</span></button>)}
          </div>
        </div>
      </section>
      {activePhoto >= 0 && (
        <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="N Café photo gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePhoto(-1); }}>
          <button ref={closeButtonRef} className="lightbox-close" type="button" aria-label="Close photo" onClick={() => setActivePhoto(-1)}><X size={23} /></button>
          <button className="lightbox-control lightbox-previous" type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)}><ArrowLeft size={22} /></button>
          <figure className="lightbox-figure"><img src={photos[activePhoto][0]} {...responsiveImageProps(photos[activePhoto][0], "90vw")} decoding="async" alt={photos[activePhoto][1]} /><figcaption>{photos[activePhoto][1]} <span>{String(activePhoto + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span></figcaption></figure>
          <button className="lightbox-control lightbox-next" type="button" aria-label="Next photo" onClick={() => movePhoto(1)}><ArrowRight size={22} /></button>
        </div>
      )}
    </>
  );
}

export default Gallery;
