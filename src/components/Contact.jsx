import { Camera, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";

const hours = [
  ["Monday", "10:00 AM – 10:00 PM"], ["Tuesday", "9:00 AM – 5:00 PM"], ["Wednesday", "10:00 AM – 10:00 PM"],
  ["Thursday", "10:00 AM – 10:00 PM"], ["Friday", "10:00 AM – 10:00 PM"], ["Saturday", "10:00 AM – 10:00 PM"], ["Sunday", "10:00 AM – 10:00 PM"],
];

function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <div className="section-heading section-heading-center"><p className="eyebrow">Find your way to us</p><h2>We’ll save you a seat</h2><p className="section-lede">Come by for a bite, a catch-up, or a little pause in your day.</p></div>
        <div className="contact-layout">
          <div className="contact-details">
            <span className="contact-kicker">N Café · Loni Budruk</span>
            <h3>Good food is<br />closer than you think.</h3>
            <address><MapPin size={19} /><span>Opposite PMT College,<br />Loni Budruk,<br />Shirdi-413736, Maharashtra</span></address>
            <a className="contact-phone" href="tel:+917038233603"><Phone size={17} />7038233603</a>
            <div className="contact-actions">
              <a className="button button-primary" href="tel:+917038233603"><Phone size={16} /> Call now</a>
              <a className="button button-outline" href="https://wa.me/917038233603" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
              <a className="button button-outline" href="https://maps.app.goo.gl/CXctajm7NdXU1BSi9" target="_blank" rel="noreferrer"><MapPin size={16} /> Directions</a>
            </div>
            <a className="contact-social" href="https://www.instagram.com/the.ncafe/" target="_blank" rel="noreferrer"><Camera size={17} /> Find us on Instagram <span>↗</span></a>
          </div>
          <div className="hours-panel">
            <h3><Clock3 size={19} /> Opening hours</h3>
            <dl>{hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}</dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
