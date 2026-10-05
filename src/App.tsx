import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";
import Hero from "./sections/hero/Hero";
import About from "./sections/about/About";
import Tours from "./sections/tours/Tours";
import Services from "./sections/services/Services";
import Vip from "./sections/vip/Vip";
import Testimonials from "./sections/testimonials/Testimonials";
import Support from "./sections/support/Support";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tours />
        <Services />
        <Vip />
        <Testimonials />
        <Support />
      </main>
      <Footer />
      <ScrollTopButton />
    </MotionConfig>
  );
}
