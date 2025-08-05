
'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import Header from "@/Layout/Header";
import { apiGet, apiPost, apiPut } from "@/api/apiMethods";
import { Loader } from "lucide-react";
import { ChoosePaymentMethod } from "../modals/ChoosePaymentMethod";
import { load } from "@cashfreepayments/cashfree-js";

const CartOrderForm = () => {
  const router = useRouter();
  const txnid = `tgD59N${Date.now()}`; // Unique transaction ID
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cart, setCart] = useState([]); // Store cart items here
  const [formData, setFormData] = useState({
    referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
    products: [],
    shippingAddress: {
      address: "",
      pinCode: "",
      state: "",
      country: "",
    },
    type: "cart",
  });
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [deviceType, setDeviceType] = useState("");

  function getDeviceType() {
    let userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|ipod/.test(userAgent) ? "Mobile" : "Desktop/Laptop";
  }
  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0).toFixed(2);

  // Fetch cart data from API
  useEffect(() => {
    apiGet("api/cart")
      .then((response) => {
        const cartData = response.data.cart;
        setCart(cartData.items); // Update cart with the items
        setFormData({
          ...formData,
          products: cartData.items.map((item) => ({
            product: item.product._id,
            productName: item.product.productName,
            price: item.product.actualPrice,
            quantity: item.quantity,
            total: item.total,
          })),
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,languages")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          flag: country.flags?.png || country.flags?.svg,
          languages: Object.values(country.languages || {}).join(", "),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (selectedCountry) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: selectedCountry }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching states:", data.msg);
            setStates([]);
          } else {
            setStates(data.data.states.map((state) => state.name));
          }
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [selectedCountry]);

  // Handle input change for form
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  function generateFakePhoneNumber() {
    const firstDigit = ["9", "8", "7", "6"][Math.floor(Math.random() * 4)];
    const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
    return firstDigit + remainingDigits;
  }

  const handleCashfree = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin
    const cashfree = await load({ mode: "production" });
    if (!cashfree) {
      console.error("Cashfree SDK not initialized");
      return;
    }

    const orderResponse = await apiPost("api/order/order", formData);
    if (orderResponse.data && orderResponse.data.message !== "Order created successfully") return
    const order_id = orderResponse.data?.order?.id;
    const orderAmount = formData.products.reduce((acc, item) => acc + item.total, 0);
    const customerId = crypto.randomUUID();
    const customerPhone = generateFakePhoneNumber();
    const returnUrl = `${baseUrl}/thanks?orderId=${order_id}`;
    const response = await axios.post("https://payment.yunicare.in/api/cashfree", {
      // const response = await axios.post("http://localhost:5099/api/cashfree", {
      orderAmount,
      customerId,
      customerPhone,
      order_id,
      returnUrl
    })
    console.log(" OrderForm.js:141 ~ handleCashfree ~ response:", response.data);


    let checkoutOptions = {
      paymentSessionId: response.data.payment_session_id,
      redirectTarget: "_modal",
    };

    cashfree.checkout(checkoutOptions).then((result) => {
      console.log(" OrderForm.js:150 ~ cashfree.checkout ~ result:", result);

      if (result.error) {
        console.log("Error:", result.error);
      }
      if (result.redirect) {
        console.log("Payment is being redirected");
      }
      if (result.paymentDetails) {
        console.log(" Cartorder.js:436 ~ cashfree.checkout ~ result.paymentDetails:", result.paymentDetails);

        const payload = { status: "processing", paymentStatus: "completed" };
        (async () => {
          try {
            await apiPut(`api/order/orders/${order_id}/status`, payload);
            window.location.href = `${baseUrl}/thanks?orderId=${order_id}`;
          } catch (error) {
            console.log(" OrderForm.js:164 ~ error:", error);
          }
        })();
      }
    });
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        totalAmount,
      };

      console.log("Form Data Before Submit:", orderData); // Debugging step

      // Send order data to backend
      const response = await apiPost("api/order/order", orderData);
      // alert(response.data.message);
      if (response.data && response.data.message === "Order created successfully") {
        // Get the order ID from the response
        const orderId = response.data.order._id; // Assuming 'orderid' is part of the response

        // Reset form after successful submission
        setFormData({
          referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
          products: [],
          shippingAddress: {
            address: "",
            pinCode: "",
            state: "",
            country: "",
          },
        });
        let postReqURl = "https://payment.yunicare.in/payment/phonePeAgpdienen";
        let postData = {
          // "client_id": "AgpdienenUAT_2501131447128754045048",
          // "client_version": 1,
          // "client_secret": "N2Q3NGEzYjQtOWNlNC00ODExLThmZjAtOWQwMzE1MTEzZTRl",
          "merchantOrderId": orderId,  // Pass the order ID here
          "amount": Number(totalAmount) * 100,  // Multiply the total by 100
          "redirectUrl": `${baseUrl}/thanks?orderId=${orderId}`,
        };
        const paymentResponse = await apiPost(postReqURl, postData);
        console.log(paymentResponse)
        const url = paymentResponse?.data?.redirectUrl;
        window.location.href = url;
      }

      // Redirect to thank-you page
      // router.push("/thanks");
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("An error occurred while submitting the order.");
    } finally {
      setLoading(false);
    }
  };

  let pollingInterval;
  let timeoutTimer;

  let fetchOrderStatus = async (orderId) => {
    const baseUrl = window.location.origin;
    try {
      const response = await apiGet(`api/order/orders/${orderId}`);
      const orderData = response.data.order;

      console.log("Order Payment Status:", orderData.paymentStatus);

      if (orderData.paymentStatus === "completed" || orderData.paymentStatus === "failed") {
        clearInterval(pollingInterval); // Stop polling
        clearTimeout(timeoutTimer); // Stop the timeout if status is received
        setLoading(false);
        window.location.href = `${baseUrl}/thanks?orderId=${orderId}`; // Redirect to the Thank You page
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  const handleUPIPayment = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        totalAmount,
      };

      console.log("Form Data Before Submit:", orderData); // Debugging step

      // Send order data to backend
      const response = await apiPost("api/order/order", orderData);
      // alert(response.data.message);
      if (response.data && response.data.message === "Order created successfully") {
        // Get the order ID from the response
        const orderId = response.data.order._id; // Assuming 'orderid' is part of the response

        // Reset form after successful submission
        setFormData({
          referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
          products: [],
          shippingAddress: {
            address: "",
            pinCode: "",
            state: "",
            country: "",
          },
        });
        let postReqURl = "https://payment.yunicare.in/api/uat/phonePe";
        let postData = {
          "merchantOrderId": orderId,
          "amount": Number(totalAmount) * 100,
        };

        const paymentResponse = await apiPost(postReqURl, postData);
        console.log("Payment Response:", paymentResponse.data);

        const url = paymentResponse?.data?.intentUrl;
        window.location.href = `${url}`;
        setLoading(true);

        // Start polling order status every 15 seconds
        pollingInterval = setInterval(() => {
          fetchOrderStatus(orderId);
        }, 15000);

        // Set a timeout of 3 minutes to stop polling and redirect if no valid status is received
        timeoutTimer = setTimeout(() => {
          clearInterval(pollingInterval); // Stop polling
          setLoading(false);
          console.warn("Payment status not updated in 3 minutes, redirecting to home.");
          window.location.href = "/"; // Redirect to the Home page
        }, 180000); // 3 minutes (180000ms)
      }

      // Redirect to thank-you page
      // router.push("/thanks");
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("An error occurred while submitting the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && (
        <div style={{ height: "100vh", width: "100vw", zIndex: 99999 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader className="animate-spin text-yellow-500 w-16 h-16" />
        </div>
      )}
      <Container className="mt-5">
        <div>
          <h2>Checkout</h2>
          {/* Display Cart Items */}
          <Row className="mb-3 border p-3">
            <Col md={8}>
              {cart.map((item) => (
                <Row key={item.product._id} className="mb-3">
                  <Col md={6}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.productName}
                      style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                    <h5>{item.product.productName}</h5>
                    <p>Quantity: {item.quantity}</p>
                  </Col>
                  <Col md={6}>
                    <p>Price: ₹{(item.total).toFixed(2)}</p>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col md={4} className="text-end">
              <h4 className="text-success">Total: ₹{totalAmount}</h4>
            </Col>
          </Row>

          {/* Shipping Form */}
          <h5>Shipping Details</h5>
          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.shippingAddress.address}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.shippingAddress.pinCode}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Country</label>
              <select
                name="country"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  handleInputChange(e);
                }}
                className="form-control"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>State</label>
              <select
                name="state"
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* <Button
              variant="success"
              type="submit"
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button> */}

            {deviceType === "Mobile" ? (
              <div>
                <button type="button" className="btn btn-success btn-block mt-3" onClick={handleUPIPayment}>
                  Pay by UPI
                </button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ marginTop: "20px" }}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : " Pay Now"}
                </Button>
              </div>
            ) : (
              <ChoosePaymentMethod phonepe={handleSubmit} cashfree={handleCashfree} />
            )}


          </Form>
        </div>
      </Container>
    </>
  );
};

export default CartOrderForm;
