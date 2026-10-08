import { useEffect, useRef, useState } from "react";
import { ArrowRight, QrCode } from "lucide-react";

function QrMenu() {
  const sectionRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(() => !("IntersectionObserver" in window));
  const [qrImage, setQrImage] = useState("");
  const [menuUrl] = useState(() => {
    const destination = new URL(window.location.href);
    destination.hash = "menu";
    return destination.toString();
  });
  const [qrUnavailable, setQrUnavailable] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isNearViewport) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isNearViewport]);

  useEffect(() => {
    if (!isNearViewport) return undefined;
    let active = true;

    import("qrcode").then((qrModule) => {
      const QRCode = qrModule.default || qrModule;
      return QRCode.toDataURL(menuUrl, {
        errorCorrectionLevel: "Q",
        margin: 2,
        width: 240,
        color: { dark: "#071116", light: "#ffffff" },
      });
    }).then((image) => {
      if (active) setQrImage(image);
    }).catch(() => {
      if (active) setQrUnavailable(true);
    });

    return () => { active = false; };
  }, [isNearViewport, menuUrl]);

  return (
    <section ref={sectionRef} className="section qr-menu" aria-labelledby="qr-menu-title">
      <div className="container qr-menu-inner">
        <div className="qr-menu-copy">
          <p className="eyebrow">Scan. Explore. Order.</p>
          <h2 id="qr-menu-title">Browse the menu on your phone.</h2>
          <p className="section-lede">Scan the QR code to explore the N Café menu and order directly from your phone.</p>
          <a className="button button-outline qr-menu-button" href="#menu">Browse the menu <ArrowRight size={16} /></a>
        </div>
        <div className="qr-menu-code-wrap">
          {qrImage ? (
            <a className="qr-menu-code" href={menuUrl} aria-label="Open the N Café menu">
              <img src={qrImage} alt="Scannable QR code linking to the N Café menu" />
            </a>
          ) : (
            <div className="qr-menu-code qr-menu-code-loading" role="status" aria-live="polite">
              <QrCode size={42} strokeWidth={1.4} aria-hidden="true" />
              <span>{qrUnavailable ? "QR code unavailable" : "Preparing menu code…"}</span>
            </div>
          )}
          <span className="qr-menu-caption">SCAN TO VIEW MENU</span>
        </div>
      </div>
    </section>
  );
}

export default QrMenu;
