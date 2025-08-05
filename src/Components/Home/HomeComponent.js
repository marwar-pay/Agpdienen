import Navbar from "@/Layout/Header";
import ImageCarousel from "./Carousel";
import Marquee from "./Marque";
import AllProduct from "../Product/AllProduct";
// import About from "./About";
import Testimonials from "./Testimonial";
import BestsellerSection from "./Bestseller";
import Newsletter from "./Newsletter";
import CollectionList from "./Collection";
import ContactForm from "../Page/Contactform";
import Detail from "../About/Detail";
import Hero from "./Carousel";
import AboutDetails from "./AboutDetails";
import GridSection from "./Marque";
import About from "../About/About";





function HomeComponent() {

  return (
    <div>
        <Navbar/>
  
        <Hero/>
        <CollectionList/>
        <AllProduct/>
        <About/>  
        <Detail/> 
        <AboutDetails/> 
        <GridSection/>
        <BestsellerSection/>
        <ContactForm/>
        <Testimonials/>
        {/* <Newsletter/> */}
    </div>
  )
}

export default HomeComponent