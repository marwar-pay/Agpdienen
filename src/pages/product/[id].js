


"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/Layout/Header';
import { Col, Container, Row, Button, Badge } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '@/context/CartContext';
import { apiGet, apiPost } from '@/api/apiMethods';
import styles from '../../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart, setBuyNow, addToWishlist } = useCart();
  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState('');
  

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
    if (!selectedSize) return toast.error("Please select a size");
    await addToCart({ ...product, selectedSize });
  };
  
  const handleBuyNow = () => {
    if (!selectedSize) return toast.error("Please select a size");
    const token = localStorage.getItem("accessToken");
    if (token) {
      setBuyNow({ ...product, selectedSize });
      router.push("/checkout");
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
    <div className={styles.productPage}>
      <Header />
      <Container className="py-5">
        <Row className="g-5" style={{ marginTop: "1%" }}>
          {/* Image Gallery */}
          <Col md={6} className={styles.imageGallery}>
            <div className={styles.mainImage}>
              <img
                src={selectedImage || product.images[0]}
                className="img-fluid rounded-3"
                alt={product.productName}
              />
              {product.discount > 0 && (
                <Badge bg="danger" className={styles.discountBadge}>
                  {product.discount}% OFF
                </Badge>
              )}
            </div>
            <div className={styles.thumbnailRow}>
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    className="img-fluid"
                    alt={`thumbnail-${index}`}
                  />
                </div>
              ))}
            </div>
          </Col>

          {/* Product Details */}
          <Col md={6} className={styles.productDetails}>
            <div className="sticky-top pt-4">
              <h1 className="mb-3 fw-bold">{product.productName}</h1>
              
              <div className="d-flex align-items-center gap-3 mb-4">
                <h2 className="text-success mb-0">
                  ₹{Math.round(product.actualPrice)}
                  {product.price > product.actualPrice && (
                    <del className="text-muted fs-6 ms-2">₹{Math.round(product.price)}</del>
                  )}
                </h2>
                {product.discount > 0 && (
                  <span className="text-success fs-6">
                    (Save {product.discount}%)
                  </span>
                )}
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Select Size</h5>
                <div className="d-flex gap-2 flex-wrap">
                  {availableSizes.map((size, idx) => (
                    <Button
                      key={idx}
                      variant={selectedSize === size ? 'dark' : 'outline-dark'}
                      className={`${styles.sizeButton} rounded-circle`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <Button 
                  variant="dark" 
                  size="lg"
                  className="w-100 py-3"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline-dark" 
                  size="lg"
                  className="w-100 py-3"
                  onClick={handleBuyNow}
                  disabled={!selectedSize}
                >
                  Buy Now
                </Button>
              </div>

              <Button 
               variant="outline-dark" 
               size="lg"
               className="w-100 py-3"
                onClick={handleAddToWishlist}
              >
                <i className="bi bi-heart me-2"></i>Add to Wishlist
              </Button>

              <div className="mb-4 mt-10">
                <h5>Product Details</h5>
                <p className="text-muted">{product.description}</p>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-1"><strong>Material:</strong> Cotton</p>
                    <p className="mb-1"><strong>Fit:</strong> Regular</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-1"><strong>Care:</strong> Machine Wash</p>
                    <p className="mb-1"><strong>SKU:</strong> {product.sku}</p>
                  </div>
                </div>
              </div>

              <div className={styles.deliveryInfo}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <i className="bi bi-truck fs-4"></i>
                  <div>
                    <h6 className="mb-0">Free Delivery</h6>
                    <small className="text-muted">Estimated 3-5 days</small>
                  </div>
                </div>
              
            
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;