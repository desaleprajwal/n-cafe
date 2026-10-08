import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { comboOffers } from "../data/combos";
import { responsiveImageProps } from "../utils/responsiveImage";

function ComboOffers() {
  return (
    <section className="section section-combos" id="combos">
      <div className="container">
        <div className="section-heading section-heading-center">
          <p className="eyebrow">Better when shared</p><h2>Combo offers</h2>
          <p className="section-lede">A little bit of everything, brought together for the table.</p>
        </div>
        <div className="combo-grid">
          {comboOffers.map((combo, index) => (
            <article className="combo-item" key={combo.name}>
              <a className="combo-photo" href="tel:+917038233603" aria-label={`Call to order ${combo.name}`}>
                <img src={combo.image} {...responsiveImageProps(combo.image, "(max-width: 760px) 100vw, 46vw")} alt={`${combo.name} food selection`} loading="lazy" decoding="async" />
                <span className="combo-index">0{index + 1}</span>
              </a>
              <div className="combo-info">
                <div className="combo-title"><h3>{combo.name}</h3><span className="price">₹{combo.price}</span></div>
                <p className="combo-includes">{combo.items.join(" · ")}</p>
                <div className="combo-actions">
                  <a className="text-link" href={`https://wa.me/917038233603?text=${encodeURIComponent(`Hello N Café, I’d like to order ${combo.name} for ₹${combo.price}.`)}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Order this Combo <ArrowUpRight size={15} /></a>
                  <a className="combo-call-link" href="tel:+917038233603"><Phone size={14} /> Call instead</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComboOffers;
