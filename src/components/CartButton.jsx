import { ShoppingCart } from "lucide-react";
import { useOrder } from "../context/useOrder";

function CartButton() {
  const { itemCount, setIsCartOpen } = useOrder();

  return (
    <button className="nav-cart" type="button" onClick={() => setIsCartOpen(true)} aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}>
      <ShoppingCart size={18} aria-hidden="true" /><span className="nav-cart-label">Cart</span><span className="cart-badge" aria-live="polite">{itemCount}</span>
    </button>
  );
}

export default CartButton;
