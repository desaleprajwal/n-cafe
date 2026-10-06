import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useOrder } from "../context/useOrder";

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

function OrderPanel() {
  const { cart, itemCount, subtotal, setIsCartOpen, setQuantity, removeItem } = useOrder();
  const [view, setView] = useState("cart");
  const [form, setForm] = useState({ name: "", phone: "", orderType: "Pickup", address: "" });
  const [errors, setErrors] = useState({});
  const [whatsAppNote, setWhatsAppNote] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsCartOpen]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const digits = form.phone.replace(/\D/g, "");
    const phone = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(phone)) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.orderType === "Delivery" && !form.address.trim()) nextErrors.address = "Enter your delivery address.";
    if (!cart.length) nextErrors.cart = "Add an item before checking out.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const orderLines = cart.map((item, index) => `${index + 1}. ${item.name} × ${item.quantity} = ${money(item.price * item.quantity)}`);
    const message = [
      "Hello N Café 👋",
      "",
      "I would like to place an order.",
      "",
      "Order:",
      ...orderLines,
      "",
      `Subtotal: ${money(subtotal)}`,
      ...(form.orderType === "Delivery" ? [`Delivery charge: To be confirmed by N Café`, `Total before delivery: ${money(subtotal)}`] : [`Total: ${money(subtotal)}`]),
      "",
      `Order Type: ${form.orderType}`,
      ...(form.orderType === "Delivery" ? [`Delivery Address: ${form.address.trim()}`] : ["Pickup from N Café"]),
      `Customer Name: ${form.name.trim()}`,
      `Phone: ${phone}`,
      "",
      "Thank you!",
    ].join("\n");
    const whatsappUrl = `https://wa.me/917038233603?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setWhatsAppNote(whatsappWindow ? "WhatsApp opened with your order details. Review the message and send it to N Café." : "Your browser blocked the new tab. Allow pop-ups, then place your order again.");
  };

  return (
    <div className="order-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCartOpen(false); }}>
      <section className={`order-drawer${view === "checkout" ? " is-checkout" : ""}`} role="dialog" aria-modal="true" aria-labelledby="order-panel-title">
        <header className="order-header">
          {view === "checkout" ? <button className="order-back" type="button" onClick={() => setView("cart")}><ArrowLeft size={17} /> Cart</button> : <span className="order-kicker">N Café · Order online</span>}
          <button className="order-close" type="button" aria-label="Close cart" onClick={() => setIsCartOpen(false)}><X size={20} /></button>
          <h2 id="order-panel-title">{view === "cart" ? "Your cart" : "Checkout"}</h2>
          {view === "cart" && <p>{itemCount} {itemCount === 1 ? "item" : "items"} · Freshly prepared for you</p>}
        </header>

        {view === "cart" ? (
          cart.length ? (
            <>
              <div className="order-items">
                {cart.map((item) => <article className="cart-line" key={item.name}>
                  <img src={item.image} alt="" loading="lazy" />
                  <div className="cart-line-info"><h3>{item.name}</h3><span>{money(item.price)} each</span><div className="quantity-stepper cart-quantity" aria-label={`Quantity for ${item.name}`}><button type="button" aria-label={`Remove one ${item.name}`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.name, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => setQuantity(item.name, item.quantity + 1)}><Plus size={13} /></button></div></div>
                  <div className="cart-line-total"><strong>{money(item.price * item.quantity)}</strong><button type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeItem(item.name)}><Trash2 size={15} /></button></div>
                </article>)}
              </div>
              <div className="order-footer"><div className="order-total-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Any delivery fee will be confirmed by N Café on WhatsApp.</p><button className="button button-outline" type="button" onClick={() => setIsCartOpen(false)}>Continue shopping</button><button className="button button-primary" type="button" onClick={() => { setView("checkout"); setWhatsAppNote(""); }}>Proceed to checkout <ArrowRight size={16} /></button></div>
            </>
          ) : (
            <div className="empty-cart"><span><ShoppingBag size={25} /></span><h3>Your cart is empty.</h3><p>Add something delicious from our menu.</p><a className="button button-primary" href="#menu" onClick={() => setIsCartOpen(false)}>Explore menu <ArrowRight size={16} /></a></div>
          )
        ) : (
          <form className="checkout-form" onSubmit={placeOrder} noValidate>
            <div className="checkout-fields">
              <label className="form-field">Customer name <span>*</span><input autoComplete="name" name="name" value={form.name} onChange={updateField} placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
              <label className="form-field">Phone number <span>*</span><input autoComplete="tel" inputMode="tel" name="phone" value={form.phone} onChange={updateField} placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
              <fieldset className="order-type-field"><legend>Order type <span>*</span></legend><div className="order-type-options">{["Pickup", "Delivery"].map((type) => <label key={type} className={form.orderType === type ? "is-selected" : ""}><input type="radio" name="orderType" value={type} checked={form.orderType === type} onChange={updateField} /><span>{type}</span></label>)}</div></fieldset>
              {form.orderType === "Pickup" ? <div className="pickup-note">Pickup from N Café</div> : <label className="form-field">Delivery address <span>*</span><textarea autoComplete="street-address" name="address" rows="3" value={form.address} onChange={updateField} placeholder="House / building, street, area" aria-invalid={Boolean(errors.address)} />{errors.address && <small>{errors.address}</small>}</label>}
            </div>
            <div className="checkout-summary"><h3>Your order</h3>{cart.map((item) => <div className="summary-item" key={item.name}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>{form.orderType === "Delivery" && <><div className="summary-total delivery-fee"><span>Delivery charge</span><span>To be confirmed</span></div><div className="summary-total"><span>Total before delivery</span><strong>{money(subtotal)}</strong></div></>}{form.orderType === "Pickup" && <div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div>}</div>
            {errors.cart && <p className="form-error">{errors.cart}</p>}
            {whatsAppNote && <p className="whatsapp-note" role="status">{whatsAppNote}</p>}
            <button className="button button-primary place-order-button" type="submit">Place order on WhatsApp <ArrowRight size={16} /></button>
            <p className="checkout-footnote">Your order details will open in WhatsApp for you to review and send.</p>
          </form>
        )}
      </section>
    </div>
  );
}

export default OrderPanel;
