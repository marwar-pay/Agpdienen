
"use client";
import { useCart } from "@/context/CartContext";
import Header from "@/Layout/Header";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";

const Checkout = () => {
  const { buyNowProduct, updateQuantitys, removeFromCarts } = useCart();
  const router = useRouter();

  // Redirect to home if no product
  useEffect(() => {
    if (!buyNowProduct) {
      router.push("/");
    }
  }, [buyNowProduct, router]);

  // Calculate total price based on quantity
  const totalAmount = buyNowProduct ? buyNowProduct.actualPrice * buyNowProduct.qty : 0;

  const handleOrderNow = () => {
    if (buyNowProduct) {
      // Redirect to the order form page with all necessary details
      router.push({
        pathname: "/orderform",
        // query: { product: JSON.stringify(buyNowProduct), totalAmount },
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <div>
          <h2>Checkout</h2>
          <Row>
            {/* Product Details */}
            {buyNowProduct && (
              <>
                <Col md={3}>
                  <img
                    src={buyNowProduct.images[0]}
                    alt={buyNowProduct.productName}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={6}>
                  <h4>{buyNowProduct.productName}</h4>
                  <p>{buyNowProduct.description}</p>
                  <h4 className="text-success">Price: ₹{buyNowProduct.actualPrice}</h4>

                  {/* Quantity Input */}
                  <div className="d-flex align-items-center mb-3">
                    <Button
                      variant="secondary"
                      onClick={() => updateQuantitys(buyNowProduct._id, buyNowProduct.qty - 1)}
                      disabled={buyNowProduct.qty <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3">{buyNowProduct.qty}</span> {/* Quantity Display */}
                    <Button
                      variant="secondary"
                      onClick={() => updateQuantitys(buyNowProduct._id, buyNowProduct.qty + 1)}
                    >
                      +
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="danger"
                    onClick={() => removeFromCarts(buyNowProduct._id)}
                  >
                    Remove
                  </Button>
                </Col>

                {/* Total Amount */}
                <Col md={3}>
                  <h4>Total: ₹{totalAmount}</h4>
                  <Button variant="success" onClick={handleOrderNow}>
                    Order Now
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
