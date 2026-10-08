import { Camera, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { openingHours } from "../utils/openingHours";
import ShareButton from "./ShareButton";
import { business } from "../config/business";

function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <div className="section-heading section-heading-center"><p className="eyebrow">Find your way to us</p><h2>Find N Café</h2><p className="section-lede">Come by for a bite, a catch-up, or a little pause in your day.</p></div>
        <div className="contact-layout">
          <div className="contact-details">
            <span className="contact-kicker">N Café · Loni Budruk</span>
            <h3>Good food is<br />closer than you think.</h3>
            <address><MapPin size={19} /><span>Opposite PMT College,<br />Loni Budruk,<br />Shirdi-413736, Maharashtra</span></address>
            <a className="contact-phone" href={business.telephone}><Phone size={17} />{business.phone}</a>
            <div className="contact-actions">
              <a className="button button-primary" href={business.telephone}><Phone size={16} /> Call now</a>
              <a className="button button-outline" href={business.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
              <a className="button button-outline" href={business.maps} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Get Directions</a>
            </div>
            <div className="contact-social-actions"><a className="contact-social" href={business.instagram} target="_blank" rel="noopener noreferrer"><Camera size={17} /> Find us on Instagram <span>↗</span></a><ShareButton /></div>
          </div>
          <div className="hours-panel">
            <h3><Clock3 size={19} /> Opening hours</h3>
            <dl>{openingHours.map(({ day, open, close }) => <div key={day}><dt>{day}</dt><dd>{open} – {close}</dd></div>)}</dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
