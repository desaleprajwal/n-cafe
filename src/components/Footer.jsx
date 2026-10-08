import { ArrowUpRight, Camera, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "../config/business";

const links = [["Home", "#home"], ["Menu", "#menu"], ["Combos", "#combos"], ["About", "#about"], ["Gallery", "#gallery"], ["Contact", "#contact"]];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="brand footer-brand" href="#home" aria-label="N Café home"><span className="brand-mark">N</span><span className="brand-copy"><strong>{business.name}</strong><small>FOOD · CAFE · MOMENTS</small></span></a>
            <p>Delicious food and cozy moments, shared around the table.</p>
          </div>
          <div className="footer-links"><h2>Explore</h2>{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <div className="footer-links"><h2>Say hello</h2><a href={business.telephone}><Phone size={15} />{business.phone}</a><a href={business.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} />WhatsApp</a><a href={business.maps} target="_blank" rel="noopener noreferrer"><MapPin size={15} />Get directions <ArrowUpRight size={13} /></a><a href={business.instagram} target="_blank" rel="noopener noreferrer"><Camera size={15} />Instagram <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 N Café. All rights reserved.</span></div>
      </div>
    </footer>
  );
}

export default Footer;
