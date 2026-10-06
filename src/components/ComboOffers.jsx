import { ArrowUpRight, Phone } from "lucide-react";

const combos = [
  { name: "Combo 1", price: 299, items: ["8” Pizza", "Fried Rice", "Waffle", "Coke"], image: "/images/CafeImage10.webp" },
  { name: "Combo 2", price: 199, items: ["Veg Grilled Sandwich", "Veg Burger", "Waffle", "Coke"], image: "/images/CafeImage9.webp" },
  { name: "Combo 3", price: 399, items: ["Paneer Chilly", "8” Pizza N’ Cafe Special", "Waffle", "2 Coke"], image: "/images/CafeImage2.webp" },
  { name: "Combo 4", price: 149, items: ["Noodles", "French Fries", "Coke"], image: "/images/CafeImage6.webp" },
];

function ComboOffers() {
  return (
    <section className="section section-combos" id="combos">
      <div className="container">
        <div className="section-heading section-heading-center">
          <p className="eyebrow">Better when shared</p><h2>Combo offers</h2>
          <p className="section-lede">A little bit of everything, brought together for the table.</p>
        </div>
        <div className="combo-grid">
          {combos.map((combo, index) => (
            <article className="combo-item" key={combo.name}>
              <a className="combo-photo" href="tel:+917038233603" aria-label={`Call to order ${combo.name}`}>
                <img src={combo.image} alt={`${combo.name} food selection`} loading="lazy" />
                <span className="combo-index">0{index + 1}</span>
              </a>
              <div className="combo-info">
                <div className="combo-title"><h3>{combo.name}</h3><span className="price">₹{combo.price}</span></div>
                <p className="combo-includes">{combo.items.join(" · ")}</p>
                <a className="text-link" href="tel:+917038233603"><Phone size={15} /> Call to order <ArrowUpRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComboOffers;
