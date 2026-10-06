import { useEffect } from "react";
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

function CafeSite() {
  const { toast, isCartOpen } = useOrder();

  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView();
  }, []);

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <FeaturedMenu />
        <Menu />
        <ComboOffers />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MobileActions />
      {isCartOpen && <OrderPanel />}
      {toast && <div className="order-toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

function App() {
  return <OrderProvider><CafeSite /></OrderProvider>;
}

export default App;
