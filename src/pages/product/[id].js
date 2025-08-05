"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/Layout/Header';

import { Col, Container, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '@/context/CartContext';
import { apiGet, apiPost } from '@/api/apiMethods';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart, setBuyNow, addToWishlist } = useCart();
  useEffect(() => {
    if (id) {
      // Fetch product details using axios
      apiGet(`api/product/getproduct/${id}`)
        .then((response) => {
          if (response.data.product) {
            setProduct(response.data.product);
          } else {
            toast.error("Product not found");
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          toast.error("Error fetching product details");
        });
    }
  }, [id]);
  



  




const handleAddToCart = async () => {
  await addToCart(product); // Calls the context function that handles the API interaction
};

  const handleBuyNow = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setBuyNow(product); // Store product for Buy Now
          router.push("/checkout"); // Redirect to checkout page
        } else {
          toast.error("Login First");
          router.push("/login");
        }
      };
      const handleAddToWishlist = () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
              addToWishlist(product); // Add to wishlist
              toast.success("Product added to wishlist!");
            } else {
              toast.error("Login First");
              router.push("/login");
            }
          };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
  
    <div>
         <Header />
           <Container className="mt-5">
             <Row>
               {/* Left Section */}
               <Col md={6}>
                 <img
                  src={selectedImage || product.images[0]}
                 className=" mb-3"
                   style={{ width: "70%", cursor: "pointer"  }}
                    className="zoom-effect"
                 />
                 <div className="d-flex gap-2">
                   {product.images.map((img, index) => (
                     <img
                      key={index}
                      src={img}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border: selectedImage === img ? "2px solid blue" : "none",
                      }}
                      onClick={() => setSelectedImage(img)}
                      alt={`thumbnail-${index}`}  className="zoom-effect"
                    />
                  ))}
                </div>
              </Col>
    
              {/* Right Section */}
               <Col md={6}>
                 <h2>{product.productName}</h2>
                 <p>{product.description}</p>
                 <h4 className="text-success">Price: ₹{product.actualPrice}</h4>
               <p className="text-muted">
                   MRP: <span className="text-decoration-line-through">₹{product.price}</span>
                 </p>
                 <Row>
                   <Col>
                     <button className="btn btn-primary" onClick={handleAddToCart}>
                       Add to Cart
                     </button>
                   </Col>
                   <Col>
                     <button className="btn btn-success" onClick={handleBuyNow}>
                       Buy Now
                     </button>
                   </Col>
                 <Col>
                   <button className="btn btn-warning" onClick={handleAddToWishlist}>
                     Add to Wishlist
                   </button>
                 </Col>
               </Row>
             </Col>
           </Row>
         </Container>
           
        </div> 
  );
};

export default ProductDetail;
