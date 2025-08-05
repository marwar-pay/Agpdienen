import Header from "@/Layout/Header"
import About from "./About"
import ImagePage from "./Imagebanner"
import Testimonials from "../Home/Testimonial"
import AboutDetails from "../Home/AboutDetails"


function AbouComponent() {
  return (
    <div>
      <Header/>
 <ImagePage/> 
 <AboutDetails/>      
<About/>
<Testimonials/>
    </div>
  )
}

export default AbouComponent