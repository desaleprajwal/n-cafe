import { MapPin, MessageCircle, Phone } from "lucide-react";

const actions = [
  ["Call", "tel:+917038233603", Phone],
  ["WhatsApp", "https://wa.me/917038233603", MessageCircle],
  ["Directions", "https://maps.app.goo.gl/CXctajm7NdXU1BSi9", MapPin],
];

function MobileActions() {
  return <nav className="mobile-actions" aria-label="Quick contact actions">{actions.map(([label, href, Icon]) => <a key={label} href={href} {...(href.startsWith("https") ? { target: "_blank", rel: "noreferrer" } : {})}><Icon size={17} aria-hidden="true" /><span>{label}</span></a>)}</nav>;
}

export default MobileActions;
