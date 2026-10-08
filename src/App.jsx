import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedMenu from "./components/FeaturedMenu";
import Menu from "./components/Menu";
import ComboOffers from "./components/ComboOffers";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileActions from "./components/MobileActions";
import OrderPanel from "./components/OrderPanel";
import { OrderProvider } from "./context/OrderProvider";
import { useOrder } from "./context/useOrder";
import QrMenu from "./components/QrMenu";
import ReviewsCTA from "./components/ReviewsCTA";
import { getCafeStatus, openingHours } from "./utils/openingHours";
import { business } from "./config/business";

function CafeSite() {
  const [cafeStatus, setCafeStatus] = useState(() => getCafeStatus());

  useEffect(() => {
    const refreshCafeStatus = () => {
      const nextStatus = getCafeStatus();
      setCafeStatus((current) => current.isOpen === nextStatus.isOpen && current.detail === nextStatus.detail
        ? current
        : nextStatus);
    };
    const timer = window.setInterval(refreshCafeStatus, 60_000);
    window.addEventListener("focus", refreshCafeStatus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refreshCafeStatus);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView();
  }, []);

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    let socialUrl = document.querySelector('meta[property="og:url"]');
    if (!socialUrl) {
      socialUrl = document.createElement("meta");
      socialUrl.setAttribute("property", "og:url");
      document.head.append(socialUrl);
    }
    socialUrl.content = canonicalUrl;

    const imageUrl = new URL("/images/CafeImage10.webp", origin).href;
    let socialImage = document.querySelector('meta[property="og:image"]');
    if (!socialImage) {
      socialImage = document.createElement("meta");
      socialImage.setAttribute("property", "og:image");
      document.head.append(socialImage);
    }
    socialImage.content = imageUrl;
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement("meta");
      twitterImage.name = "twitter:image";
      document.head.append(twitterImage);
    }
    twitterImage.content = imageUrl;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      name: "N Café",
      url: origin,
      image: imageUrl,
      telephone: `+91${business.phone}`,
      address: {
        "@type": "PostalAddress",
      streetAddress: "Opposite PMT College, Loni Budruk",
        addressLocality: "Shirdi",
        postalCode: "413736",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      hasMap: business.maps,
      sameAs: [business.instagram],
      openingHoursSpecification: openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${hours.day}`,
        opens: `${String(Math.floor(hours.start / 60)).padStart(2, "0")}:${String(hours.start % 60).padStart(2, "0")}`,
        closes: `${String(Math.floor(hours.end / 60)).padStart(2, "0")}:${String(hours.end % 60).padStart(2, "0")}`,
      })),
    };
    let schema = document.getElementById("restaurant-structured-data");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "restaurant-structured-data";
      schema.type = "application/ld+json";
      document.head.append(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="site-shell">
      <Navbar cafeStatus={cafeStatus} />
      <main>
        <Hero cafeStatus={cafeStatus} />
        <FeaturedMenu />
        <Menu />
        <QrMenu />
        <ComboOffers />
        <About />
        <Gallery />
        <Contact />
        <ReviewsCTA />
      </main>
      <Footer />
      <MobileActions />
    </div>
  );
}

function OrderOverlays() {
  const { toast, isCartOpen } = useOrder();
  return <>
    {isCartOpen && <OrderPanel />}
    {toast && <div className="order-toast" role="status" aria-live="polite">{toast}</div>}
  </>;
}

function App() {
  return <OrderProvider><CafeSite /><OrderOverlays /></OrderProvider>;
}

export default App;
