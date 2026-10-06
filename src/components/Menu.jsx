import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { menuItems } from "../data/menu";
import AddToCartControl from "./AddToCartControl";

const categories = ["All", "Pizza", "Burger", "Sandwich", "Pasta", "Chinese", "Fries", "Munchings", "Toast", "Frankie"];

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const searchableText = `${item.name} ${item.category}`.toLocaleLowerCase();
      return query.split(/\s+/).every((term) => searchableText.includes(term));
    });
  }, [activeCategory, searchQuery]);
  const groups = useMemo(() => {
    return [...new Set(filteredItems.map(({ category }) => category))].map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category),
    }));
  }, [filteredItems]);

  return (
    <section className="section section-menu" id="menu">
      <div className="container">
        <div className="section-heading section-heading-center menu-heading">
          <p className="eyebrow">Good things, made to order</p>
          <h2>Our menu</h2>
          <p className="section-lede">Explore our delicious selection of burgers, pizzas, sandwiches, pasta, Chinese dishes and more.</p>
        </div>
        <div className="menu-search-wrap">
          <label className="menu-search" htmlFor="menu-search-input">
            <Search size={19} aria-hidden="true" />
            <input
              id="menu-search-input"
              type="search"
              aria-label="Search menu items"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for your favourite food..."
              autoComplete="off"
            />
            {searchQuery && (
              <button className="menu-search-clear" type="button" aria-label="Clear menu search" onClick={() => setSearchQuery("")}>
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </label>
          {searchQuery.trim() && <p className="menu-search-count" role="status" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found</p>}
        </div>
        <div className="category-list" role="group" aria-label="Filter menu by category">
          {categories.map((category) => <button key={category} type="button" className={`category-chip${activeCategory === category ? " is-active" : ""}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        {activeCategory === "Pizza" && !searchQuery.trim() ? (
          <div className="menu-empty">
            <p>Looking for pizza? Find it in our combo offers.</p>
            <a className="text-link" href="#combos">Explore combo offers <ArrowRight size={16} /></a>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="menu-no-results" role="status">
            <span className="menu-no-results-icon"><Search size={20} aria-hidden="true" /></span>
            <h3>No dishes found</h3>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <div className={`menu-groups${activeCategory === "All" ? " is-all" : ""}`}>
            {groups.map(({ category, items }) => (
              <section className="menu-group" key={category} aria-label={`${category} menu`}>
                <div className="menu-group-heading"><h3>{category}</h3><span>{String(items.length).padStart(2, "0")} items</span></div>
                <ul className="menu-list">
                  {items.map((item) => <li className="menu-row" key={item.name}><div className="menu-item-details"><span className="menu-item-name">{item.name}</span><span className="menu-dots" aria-hidden="true" /><span className="price">₹{item.price}</span></div><AddToCartControl item={item} compact /></li>)}
                </ul>
              </section>
            ))}
          </div>
        )}
        <p className="menu-note">Everything is freshly prepared when you order.</p>
      </div>
    </section>
  );
}

export default Menu;
