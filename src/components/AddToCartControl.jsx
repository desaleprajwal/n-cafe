import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useOrderActions } from "../context/useOrder";

function AddToCartControl({ item, compact = false }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useOrderActions();

  return (
    <div className={`add-control${compact ? " is-compact" : ""}`}>
      <div className="quantity-stepper" aria-label={`Quantity for ${item.name}`}>
        <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={13} /></button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" aria-label={`Add one ${item.name}`} onClick={() => setQuantity((value) => value + 1)}><Plus size={13} /></button>
      </div>
      <button type="button" className="add-cart-button" onClick={() => addItem(item, quantity)}>
        <ShoppingCart size={14} aria-hidden="true" /> <span>Add to Cart</span>
      </button>
    </div>
  );
}

export default AddToCartControl;
