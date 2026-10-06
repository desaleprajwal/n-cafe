import { ArrowDown, ArrowRight, Coffee, Heart, MapPin, MessageCircle, Utensils } from "lucide-react";

const highlights = [["Fresh food", Utensils], ["Cozy café", Coffee], ["Made with care", Heart]];

function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-image" src="/images/CafeImage10.webp" alt="A pizza and fries fresh from the N Café kitchen" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow"><span aria-hidden="true">✦</span> Welcome to N Café</p>
        <h1>Good Food.<br /><span>Great Moments.</span></h1>
        <p className="hero-intro">Delicious food, refreshing drinks and a cozy place to enjoy every moment with friends and family.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#menu">Explore menu <ArrowRight size={17} /></a>
          <a className="button button-quiet" href="https://wa.me/917038233603" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp us</a>
        </div>
        <ul className="hero-highlights" aria-label="The N Café experience">
          {highlights.map(([label, Icon]) => <li key={label}><Icon size={16} aria-hidden="true" /><span>{label}</span></li>)}
        </ul>
        <a className="hero-location" href="https://maps.app.goo.gl/CXctajm7NdXU1BSi9" target="_blank" rel="noreferrer"><MapPin size={15} /> Loni Budruk, Shirdi <span>·</span> Come on in</a>
      </div>
      <a href="#featured" className="hero-scroll" aria-label="Scroll to featured menu"><ArrowDown size={17} /></a>
    </section>
  );
}

export default Hero;
