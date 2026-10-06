import { ArrowUpRight } from "lucide-react";
import { menuItems } from "../data/menu";
import AddToCartControl from "./AddToCartControl";

const featured = [
  { name: "Veg Cheese Burger", image: "/images/CafeImage11.webp" },
  { name: "Veg Cheese Sandwich", image: "/images/CafeImage9.webp" },
  { name: "Red Sauce Pasta", image: "/images/CafeImage5.webp" },
  { name: "Plain Fries", image: "/images/CafeImage13.webp" },
];

function FeaturedMenu() {
  return (
    <section className="section section-featured" id="featured">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow">A few favourites</p><h2>Featured at N Café</h2><p className="section-lede">A few of our favourites you’ll love.</p></div>
          <a className="text-link" href="#menu">See the full menu <ArrowUpRight size={17} /></a>
        </div>
        <div className="featured-grid">
          {featured.map(({ name, image }) => {
            const item = menuItems.find((entry) => entry.name === name);
            if (!item) return null;
            return (
              <article className="featured-item" key={name}>
                <a href="#menu" className="featured-photo-link" aria-label={`Explore ${name} on our menu`}>
                  <img src={image} alt={name} loading="lazy" />
                  <span className="photo-arrow"><ArrowUpRight size={18} /></span>
                </a>
                <div className="featured-meta"><div><span className="item-category">{item.category}</span><h3>{item.name}</h3></div><span className="price">₹{item.price}</span></div>
                <AddToCartControl item={{ ...item, image }} compact />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMenu;
