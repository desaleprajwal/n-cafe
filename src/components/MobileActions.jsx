import { MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { useOrder, useOrderActions } from "../context/useOrder";

const actions = [["Call", "tel:+917038233603", Phone], ["WhatsApp", "https://wa.me/917038233603", MessageCircle]];

function MobileActions() {
  const { itemCount } = useOrder();
  const { setIsCartOpen } = useOrderActions();
  return <nav className="mobile-actions" aria-label="Quick contact actions">
    <a href={actions[0][1]}><Phone size={17} aria-hidden="true" /><span>Call</span></a>
    <button type="button" aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`} onClick={() => setIsCartOpen(true)}><ShoppingCart size={17} aria-hidden="true" /><span>Cart</span><span className="mobile-cart-count">{itemCount}</span></button>
    <a href={actions[1][1]} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /><span>WhatsApp</span></a>
  </nav>;
}

export default MobileActions;
