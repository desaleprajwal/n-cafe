import { ArrowUpRight, Camera, MapPin, MessageCircle, Phone } from "lucide-react";

const links = [["Home", "#home"], ["Menu", "#menu"], ["About", "#about"], ["Gallery", "#gallery"], ["Contact", "#contact"]];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="brand footer-brand" href="#home"><span className="brand-mark">N</span><span className="brand-copy"><strong>N Café</strong><small>FOOD · CAFE · MOMENTS</small></span></a>
            <p>Delicious food and cozy moments, shared around the table.</p>
          </div>
          <div className="footer-links"><h2>Explore</h2>{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
          <div className="footer-links"><h2>Say hello</h2><a href="tel:+917038233603"><Phone size={15} /> 7038233603</a><a href="https://wa.me/917038233603" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a><a href="https://maps.app.goo.gl/CXctajm7NdXU1BSi9" target="_blank" rel="noreferrer"><MapPin size={15} /> Get directions <ArrowUpRight size={13} /></a><a href="https://www.instagram.com/the.ncafe/" target="_blank" rel="noreferrer"><Camera size={15} /> Instagram <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="footer-bottom"><span>© N Café. All rights reserved.</span><span>Made for good moments.</span></div>
      </div>
    </footer>
  );
}

export default Footer;
