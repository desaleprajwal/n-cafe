import { ArrowUpRight } from "lucide-react";
import { menuItems } from "../data/menu";
import AddToCartControl from "./AddToCartControl";
import { responsiveImageProps } from "../utils/responsiveImage";

const featured = [
  { name: "Veg Cheese Burger", image: "/images/CafeImage11.webp", badge: "Popular" },
  { name: "Veg Cheese Sandwich", image: "/images/CafeImage9.webp", badge: "Customer favourite" },
  { name: "Red Sauce Pasta", image: "/images/CafeImage5.webp", badge: "Bestseller" },
  { name: "Plain Fries", image: "/images/CafeImage13.webp", badge: "A café favourite" },
];

function FeaturedMenu() {
  return (
    <section className="section section-featured" id="featured">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow">A few favourites</p><h2>Popular at N Café</h2><p className="section-lede">A few favourites our customers love.</p></div>
          <a className="text-link" href="#menu">See the full menu <ArrowUpRight size={17} /></a>
        </div>
        <div className="featured-grid">
          {featured.map(({ name, image, badge }) => {
            const item = menuItems.find((entry) => entry.name === name);
            if (!item) return null;
            return (
              <article className="featured-item" key={name}>
                <a href="#menu" className="featured-photo-link" aria-label={`Explore ${name} on our menu`}>
                  <img src={image} {...responsiveImageProps(image, "(max-width: 760px) 48vw, (max-width: 1200px) 44vw, 280px")} alt={name} loading="lazy" decoding="async" />
                  <span className="featured-badge">{badge}</span>
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
