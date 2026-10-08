import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useOrder, useOrderActions } from "../context/useOrder";
import { business } from "../config/business";
import { responsiveImageProps } from "../utils/responsiveImage";

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;
const formatPickupTime = (value) => {
  if (!value) return "Not specified";
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
};

function OrderPanel() {
  const { cart, itemCount, subtotal } = useOrder();
  const { setIsCartOpen, setQuantity, removeItem, clearCart } = useOrderActions();
  const [view, setView] = useState("cart");
  const [form, setForm] = useState({ name: "", phone: "", orderType: "Pickup", address: "", pickupTime: "", specialInstructions: "" });
  const [errors, setErrors] = useState({});
  const [whatsAppNote, setWhatsAppNote] = useState("");
  const drawerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const focusable = () => [...(drawerRef.current?.querySelectorAll("a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex='-1'])") || [])].filter((element) => element.getAttribute("aria-hidden") !== "true");
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCartOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;
      if (event.shiftKey && document.activeElement === elements[0]) {
        event.preventDefault();
        elements.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === elements.at(-1)) {
        event.preventDefault();
        elements[0].focus();
      }
    };
    document.body.style.overflow = "hidden";
    focusable()[0]?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [setIsCartOpen]);

  useEffect(() => { titleRef.current?.focus(); }, [view]);

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

    const orderLines = cart.flatMap((item, index) => [
      `${index + 1}. ${item.name} × ${item.quantity}`,
      `   ${money(item.price)} × ${item.quantity} = ${money(item.price * item.quantity)}`,
    ]);
    const message = [
      "Hello N Café 👋",
      "",
      form.orderType === "Pickup" ? "New Pickup Order" : "New Delivery Order",
      "",
      "Customer:",
      `Name: ${form.name.trim()}`,
      `Phone: ${phone}`,
      "",
      "Items:",
      ...orderLines,
      "",
      "--------------------",
      `Total: ${money(subtotal)}`,
      "--------------------",
      "",
      ...(form.orderType === "Pickup" ? [`Pickup Time: ${formatPickupTime(form.pickupTime)}`] : [`Delivery Address: ${form.address.trim()}`]),
      ...(form.specialInstructions.trim() ? [`Special Instructions: ${form.specialInstructions.trim()}`] : []),
      "",
      "Please confirm my order.",
    ].join("\n");
    const whatsappUrl = `${business.whatsapp}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setWhatsAppNote(whatsappWindow ? "WhatsApp opened with your order details. Review the message and send it to N Café." : "Your browser blocked the new tab. Allow pop-ups, then place your order again.");
  };

  return (
    <div className="order-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCartOpen(false); }}>
      <section ref={drawerRef} className={`order-drawer${view === "checkout" ? " is-checkout" : ""}`} role="dialog" aria-modal="true" aria-labelledby="order-panel-title">
        <header className="order-header">
          {view === "checkout" ? <button className="order-back" type="button" onClick={() => setView("cart")}><ArrowLeft size={17} /> Cart</button> : <span className="order-kicker">N Café · Order online</span>}
          <button className="order-close" type="button" aria-label="Close cart" onClick={() => setIsCartOpen(false)}><X size={20} /></button>
          <h2 ref={titleRef} id="order-panel-title" tabIndex={-1}>{view === "cart" ? "Your cart" : "Pickup details"}</h2>
          {view === "cart" && <p>{itemCount} {itemCount === 1 ? "item" : "items"} · Freshly prepared for you</p>}
        </header>

        {view === "cart" ? (
          cart.length ? (
            <>
              <div className="order-items">
                {cart.map((item) => <article className="cart-line" key={item.name}>
                  <img src={item.image} {...responsiveImageProps(item.image, "68px")} alt={`${item.name}`} loading="lazy" decoding="async" />
                  <div className="cart-line-info"><h3>{item.name}</h3><span>{money(item.price)} each</span><div className="quantity-stepper cart-quantity" aria-label={`Quantity for ${item.name}`}><button type="button" aria-label={`Remove one ${item.name}`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.name, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => setQuantity(item.name, item.quantity + 1)}><Plus size={13} /></button></div></div>
                  <div className="cart-line-total"><strong>{money(item.price * item.quantity)}</strong><button type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeItem(item.name)}><Trash2 size={15} /></button></div>
                </article>)}
              </div>
              <div className="order-footer">
                <div className="order-total-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div className="order-total-row order-item-count"><span>Total items</span><strong>{itemCount}</strong></div>
                <div className="order-cart-actions"><button className="clear-cart-button" type="button" onClick={clearCart}><Trash2 size={15} /> Clear cart</button><button className="button button-primary" type="button" onClick={() => { setView("checkout"); setWhatsAppNote(""); }}>Order on WhatsApp <ArrowRight size={16} /></button></div>
              </div>
            </>
          ) : (
            <div className="empty-cart"><span><ShoppingBag size={25} /></span><h3>Your cart is empty</h3><p>Add something delicious from our menu.</p><a className="button button-primary" href="#menu" onClick={() => setIsCartOpen(false)}>Browse menu <ArrowRight size={16} /></a></div>
          )
        ) : (
          <form className="checkout-form" onSubmit={placeOrder} noValidate>
            <div className="checkout-fields">
              <label className="form-field">Customer name <span>*</span><input autoComplete="name" name="name" value={form.name} onChange={updateField} placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
              <label className="form-field">Phone number <span>*</span><input autoComplete="tel" inputMode="tel" name="phone" value={form.phone} onChange={updateField} placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
              <fieldset className="order-type-field"><legend>Order type <span>*</span></legend><div className="order-type-options">{["Pickup", "Delivery"].map((type) => <label key={type} className={form.orderType === type ? "is-selected" : ""}><input type="radio" name="orderType" value={type} checked={form.orderType === type} onChange={updateField} /><span>{type}</span></label>)}</div></fieldset>
              {form.orderType === "Pickup" ? <label className="form-field">Pickup time <span className="optional-field">Optional</span><input type="time" name="pickupTime" value={form.pickupTime} onChange={updateField} /></label> : <label className="form-field">Delivery address <span>*</span><textarea autoComplete="street-address" name="address" rows="3" value={form.address} onChange={updateField} placeholder="House / building, street, area" aria-invalid={Boolean(errors.address)} />{errors.address && <small>{errors.address}</small>}</label>}
              <label className="form-field">Special instructions <span className="optional-field">Optional</span><textarea name="specialInstructions" rows="2" value={form.specialInstructions} onChange={updateField} placeholder="Anything we should know?" /></label>
            </div>
            <div className="checkout-summary"><h3>Your order</h3>{cart.map((item) => <div className="summary-item" key={item.name}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div></div>
            {errors.cart && <p className="form-error">{errors.cart}</p>}
            {whatsAppNote && <p className="whatsapp-note" role="status">{whatsAppNote}</p>}
            <button className="button button-primary place-order-button" type="submit">Send order on WhatsApp <ArrowRight size={16} /></button>
            <p className="checkout-footnote">Review and send your order in WhatsApp. No payment is taken on this website.</p>
          </form>
        )}
      </section>
    </div>
  );
}

export default OrderPanel;
