import { useEffect, useState } from "react";
import { Menu as MenuIcon, MessageCircle, Phone, X } from "lucide-react";
import CartButton from "./CartButton";

const navLinks = [
  ["Home", "#home"],
  ["Featured", "#featured"],
  ["Menu", "#menu"],
  ["Combos", "#combos"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navLinks.map(([, href]) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-22% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setIsOpen(false)} aria-label="N Café home">
          <span className="brand-mark">N</span>
          <span className="brand-copy"><strong>N Café</strong><small>FOOD · CAFE · MOMENTS</small></span>
        </a>
        <div className="desktop-nav">
          {navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href.slice(1) ? "is-active" : undefined} aria-current={activeSection === href.slice(1) ? "location" : undefined}>{label}</a>)}
        </div>
        <div className="nav-actions">
          <CartButton />
          <a className="nav-call" href="tel:+917038233603"><Phone size={16} aria-hidden="true" /> Call now</a>
          <a className="nav-whatsapp" href="https://wa.me/917038233603" target="_blank" rel="noreferrer" aria-label="Message N Café on WhatsApp"><MessageCircle size={17} aria-hidden="true" /></a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >{isOpen ? <X /> : <MenuIcon />}</button>
        </div>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav${isOpen ? " is-open" : ""}`}>
        <div className="container mobile-nav-inner">
          {navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href.slice(1) ? "is-active" : undefined} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={() => setIsOpen(false)}>{label}</a>)}
          <a className="mobile-nav-call" href="tel:+917038233603"><Phone size={16} /> Call N Café</a>
          <a className="mobile-nav-whatsapp" href="https://wa.me/917038233603" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
