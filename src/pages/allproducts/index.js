import AllProduct from "@/Components/Product/AllProduct"
import Header from "@/Layout/Header"




function index() {
  return (
    <div>
      <Header/>
      <div style={{marginTop:'10%'}}>
        <h2 className="text-center">All Products</h2>
        <AllProduct/>
        </div>
    </div>
  )
}

export default index