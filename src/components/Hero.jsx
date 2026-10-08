import { ArrowDown, ArrowRight, Coffee, Heart, MapPin, MessageCircle, Utensils } from "lucide-react";
import OpeningStatus from "./OpeningStatus";
import { business } from "../config/business";
import { responsiveImageProps } from "../utils/responsiveImage";

const highlights = [["Fresh food", Utensils], ["Cozy café", Coffee], ["Made with care", Heart]];

function Hero({ cafeStatus }) {
  return (
    <section className="hero" id="home">
      <img className="hero-image" src="/images/CafeImage10.webp" {...responsiveImageProps("/images/CafeImage10.webp", "100vw")} alt="A pizza and fries fresh from the N Café kitchen" fetchPriority="high" decoding="async" />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow"><span aria-hidden="true">☕</span> Welcome to N Café</p>
        <h1><span className="hero-title-primary">Good Food.</span><br /><span className="hero-title-accent">Great Moments.</span></h1>
        <p className="hero-intro">Fresh food, delicious flavours and a cozy place to enjoy every moment.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#menu">Explore menu <ArrowRight size={17} /></a>
          <a className="button button-quiet" href={business.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Order on WhatsApp</a>
        </div>
        <OpeningStatus status={cafeStatus} />
        <a className="hero-location" href={business.maps} target="_blank" rel="noopener noreferrer"><MapPin size={16} /><span className="hero-location-name">Loni Budruk, Shirdi</span><span className="hero-location-note">· Come on in</span></a>
        <ul className="hero-highlights" aria-label="The N Café experience">
          {highlights.map(([label, Icon]) => <li key={label}><Icon size={14} aria-hidden="true" /><span>{label}</span></li>)}
        </ul>
      </div>
      <a href="#featured" className="hero-scroll" aria-label="Scroll to featured menu"><ArrowDown size={17} /></a>
    </section>
  );
}

export default Hero;
