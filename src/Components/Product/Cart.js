
'use client';
import { useCart } from "@/context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";
import { Table,} from "react-bootstrap";

const Cart = () => {
  const { cart,cartitems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  // Handle checkout functionality
  const handleCheckout = () => {
    // Pass cart items as query params or handle via context
    router.push({
      pathname: "/cartorderform",
      // query: { cartItems: JSON.stringify(cart) }, // Sending cart data to the next page
    });
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
 
          <h2 className="my-3">Cart Items</h2>
      {cartitems?.items?.length === 0 || !cart ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
  <Row>
 <Col md={8}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartitems?.items?.map((item) => (
                <tr key={item._id}>
                  <td className="text-center">
                    <img
                      src={item.product?.images?.[0] || "/default-image.jpg"}
                      alt={item?.product?.productName || "Product Image"}
                      style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "8px" }}
                    />
                  </td>
                  <td>{item?.product?.productName || "Unnamed Product"}</td>
                  <td>₹{item?.product?.actualPrice}</td>
                  <td>
                  <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product?._id, Number(e.target.value) || 1)
                        }
                        style={{ width: "60px" }}
                      />
                  </td>
                  <td>₹{(item.total).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item?.product?._id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Col>
          <Col md={4}>
          {/* <Row className="mt-4"> */}
          <div className="p-3 border rounded text-center" style={{ backgroundColor: "#f8f9fa" }}>
            <h4>Total: ₹{cartitems?.totalAmount}</h4>
            <Button variant="success" className="mt-2 btn-lg w-100" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
          </Col>
          </Row>
        </>
      )}
        
      </Container>
    </>
  );
};

export default Cart;

