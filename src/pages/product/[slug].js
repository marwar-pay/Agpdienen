"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/Layout/Header';
import { Col, Container, Row, Button, Badge, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '@/context/CartContext';
import { apiGet } from '@/api/apiMethods';
import styles from '../../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const router = useRouter();
  // const { id } = router.query;
  const { id, slug } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart, setBuyNow, addToWishlist } = useCart();
  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (id) {
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
      addToWishlist(product);
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
        <Row className="g-5 mt-4">
          
          {/* Image Gallery */}
          <Col md={6}>
            <Card className="shadow-lg rounded-4 p-3 border-0">
              <div className={styles.mainImage}>
                <img
                  src={selectedImage || product.images[0]}
                  className="img-fluid rounded-3 shadow-sm"
                  alt={product.productName}
                  style={{ transition: "0.3s ease-in-out", cursor: "zoom-in" }}
                />
                {product.discount > 0 && (
                  <Badge bg="danger" className={styles.discountBadge}>
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              <div className="d-flex gap-3 justify-content-center mt-3 flex-wrap">
                {product.images.map((img, index) => (
                  <div 
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                    onClick={() => setSelectedImage(img)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      className="img-fluid rounded-2 shadow-sm"
                      alt={`thumbnail-${index}`}
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <Card className="shadow-lg rounded-4 p-4 border-0 sticky-top">
              <h1 className="fw-bold mb-3">{product.productName}</h1>
              
              {/* Price Section */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <h2 className="text-success mb-0 fw-bold">
                  ₹{Math.round(product.actualPrice)}
                  {product.price > product.actualPrice && (
                    <del className="text-muted fs-6 ms-2">₹{Math.round(product.price)}</del>
                  )}
                </h2>
                {product.discount > 0 && (
                  <span className="text-success fw-semibold">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <h5 className="mb-3">Select Size</h5>
                <div className="d-flex gap-2 flex-wrap">
                  {availableSizes.map((size, idx) => (
                    <Button
                      key={idx}
                      variant={selectedSize === size ? 'dark' : 'outline-dark'}
                      className={`${styles.sizeButton} rounded-pill px-4 py-2 fw-semibold`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-3 mb-4">
                <Button 
                  variant="dark" 
                  size="lg"
                  className="w-100 py-3 rounded-3 shadow-sm"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  🛒 Add to Cart
                </Button>
                <Button 
                  variant="success" 
                  size="lg"
                  className="w-100 py-3 rounded-3 shadow-sm"
                  onClick={handleBuyNow}
                  disabled={!selectedSize}
                >
                  ⚡ Buy Now
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="lg"
                  className="w-100 py-3 rounded-3 shadow-sm"
                  onClick={handleAddToWishlist}
                >
                  ❤️ Add to Wishlist
                </Button>
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <h5 className="fw-bold">Product Details</h5>
                <p className="text-muted">{product.description}</p>
                <Row>
                  <Col sm={6}>
                    <p><strong>Material:</strong> Cotton</p>
                    <p><strong>Fit:</strong> Regular</p>
                  </Col>
                  <Col sm={6}>
                    <p><strong>Care:</strong> Machine Wash</p>
                    <p><strong>SKU:</strong> {product.sku}</p>
                  </Col>
                </Row>
              </div>

              {/* Delivery Info */}
              <Card className="p-3 border-0 shadow-sm rounded-3 bg-light">
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-truck fs-3 text-success"></i>
                  <div>
                    <h6 className="mb-0 fw-bold">Free Delivery</h6>
                    <small className="text-muted">Estimated 3-5 days</small>
                  </div>
                </div>
              </Card>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
