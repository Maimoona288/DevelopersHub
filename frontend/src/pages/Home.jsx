import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Services from "../components/Home/Services";
import Portfolio from "../components/Home/Portfolio";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Testimonials from "../components/Home/Testimonials";
import Booking from "../components/Home/Booking";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
        <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseUs/>
      <Testimonials />
         <Booking />
          <Footer />
      
    </>
  );
};

export default Home;