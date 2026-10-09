import { useEffect, useState } from "react";
import { Menu as MenuIcon, MessageCircle, Moon, Phone, Sun, X } from "lucide-react";
import CartButton from "./CartButton";
import OpeningStatus from "./OpeningStatus";
import Logo from "./Logo";
import { business } from "../config/business";

const navLinks = [
  ["Home", "#home"],
  ["Featured", "#featured"],
  ["Menu", "#menu"],
  ["Combos", "#combos"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

const getInitialTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem("n-cafe-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Fall back to the system preference if storage is unavailable.
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

function Navbar({ cafeStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#FFF9FB" : "#0D0B0D");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem("n-cafe-theme", nextTheme);
    } catch {
      // The selected theme still applies for this visit when storage is unavailable.
    }
    setTheme(nextTheme);
  };

  useEffect(() => {
    const sections = navLinks.map(([, href]) => document.getElementById(href.slice(1))).filter(Boolean);
    const updateActiveSection = () => {
      const referenceY = Math.min(window.innerHeight * 0.32, 280);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= referenceY).at(-1) || sections[0];
      if (current) setActiveSection((active) => active === current.id ? active : current.id);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const navigateTo = (event, href) => {
    event.preventDefault();
    const sectionId = href.slice(1);
    const section = document.getElementById(sectionId);
    setIsOpen(false);
    setActiveSection(sectionId);
    if (!section) return;
    window.history.pushState(null, "", href);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Main navigation">
        <Logo onClick={(event) => navigateTo(event, "#home")} />
        <div className="desktop-nav">
          {navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href.slice(1) ? "is-active" : undefined} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={(event) => navigateTo(event, href)}>{label}</a>)}
        </div>
        <div className="nav-actions">
          <OpeningStatus status={cafeStatus} compact />
          <CartButton />
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "light"} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <a className="nav-call" href={business.telephone}><Phone size={16} aria-hidden="true" /> Call now</a>
          <a className="nav-whatsapp" href={business.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message N Café on WhatsApp"><MessageCircle size={17} aria-hidden="true" /></a>
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
          {navLinks.map(([label, href]) => <a key={href} href={href} className={activeSection === href.slice(1) ? "is-active" : undefined} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={(event) => navigateTo(event, href)}>{label}</a>)}
          <a className="mobile-nav-call" href={business.telephone}><Phone size={16} /> Call N Café</a>
          <a className="mobile-nav-whatsapp" href={business.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
