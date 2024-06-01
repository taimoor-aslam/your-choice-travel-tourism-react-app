import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import "bootstrap/dist/css/bootstrap.min.css";
import Introduction from "./components/Introduction";
import Tours from "./components/Tours";
import Services from "./components/Services";
import CustomerSupport from "./components/CustomerSupport";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SwitchButton from "./components/SwitchButton";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Hero />
      <Navbar />
      <Introduction />
      <Tours />
      <Services />
      <CustomerSupport />
      <Testimonials />
      <SwitchButton />
      <Footer />
    </div>
  );
}
