'use client';
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
// import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";
import { apiPost } from "@/api/apiMethods";

const CheckoutForm = () => {
  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
    mobileNo: "",
    email: "",
 
  });

  // const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post order data to your API
      await apiPost("api/order5/orders5", orderData);

      // Redirect to payment page with appropriate data
      let postReqURL = "https://payment.yunicare.in/payment/ImpactStoreGeneratePayment";
      let postData = {
        trxId: "uniqueTransactionId", // Generate or get the actual transaction ID
        amount: String(1000), // Pass the total amount here
        redirectUrl: "http://impactstore.in/cart",
      };

      // Make the payment API request (you may want to handle the response)
      await axios.post(postReqURL, postData);

      // Optionally, redirect the user to the payment page after successful submission
      // router.push("/payment");
      window.location.href = "/payment";
    } catch (error) {
      console.error("Error submitting order", error);
    }
  };

  return (
     <><Header/>
    <Container className="mt-5">
    <div>
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={orderData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={orderData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="address" className="mt-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={orderData.pincode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={orderData.state}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={orderData.country}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={orderData.mobileNo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={orderData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="mt-4">
          Submit and Proceed to Payment
        </Button>
      </Form>
   </div> </Container>
    </>
  );
};

export default CheckoutForm;
