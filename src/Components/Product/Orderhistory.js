import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete } from '@/api/apiMethods';
import { Container, Row, Col, Button, Form, Card, ListGroup, Spinner, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Header from '@/Layout/Header';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // Store order details for the modal
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const router = useRouter();

  // Fetch orders from API
  
  
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Login First");
      router.push("/login");
      return;
    }
    // const fetchOrders = async () => {
    //   try {
       
    //     const response = await apiGet('api/order/orders');
    //     if (response.data && response.data.orders) {
    //       setOrders(response.data.orders);
    //       setFilteredOrders(response.data.orders);
    //     } else {
    //       setError('No orders found');
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       // Server responded with a status other than 2xx
    //       console.error("Error response:", error.response.data);
    //     } else if (error.request) {
    //       //
    //       console.error("No response received:", error.request);
    //     } else {
    //       // Something else happened
    //       console.error("Error message:", error.message);
    //     }
    //     setError('No orders found. Please place an order.');
    //   }
    //    finally {
    //     setLoading(false);
    //   }
    // };


    const fetchOrders = async () => {
      try {
        const response = await apiGet('api/order/orders');
        console.log(" Orderhistory.js:63 ~ fetchOrders ~ response:", response.data);

        if (response.data && response.data.orders) {
          const sortedOrders = response.data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
          setFilteredOrders(sortedOrders);
        } else {
          setError('No orders found');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('No orders found. Please place an order.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();

  }, []);

  // Handle Search input
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const searchValue = e.target.value.trim().toLowerCase();
    const filtered = orders.filter((order) =>
      order._id.toLowerCase().includes(searchValue)
    );
    setFilteredOrders(filtered);
  };

  // Delete order


  // Handle Export
  const handleExport = () => {
    const exportData = filteredOrders.length > 0 ? filteredOrders : orders;
    const csvContent = [
      ['Order ID', 'Customer Email', 'Total Amount', 'Status', 'Payment Method'],
      ...exportData.map((order) => [
        order._id,
        order.customer.email,
        order.totalAmount,
        order.status,
        order.paymentMethod,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download =
      filteredOrders.length > 0 ? `order_${searchInput || 'filtered'}.csv` : 'orders.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Invoice Click
  const handleInvoiceClick = (orderId) => {
    window.open(`/invoice/${orderId}`, "_blank");
 };

  // View Order Details (Modal)
  const handleViewOrder = async (orderId) => {
    try {
      const response = await apiGet(`api/order/orders/${orderId}`);
      if (response.data.order) {
        setOrderDetails(response.data.order);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to fetch order details.');
    }
  };


  return (
    <>
    <Header/>
    <div>
    <Container>
    <Row className="mt-4">
  <Col md={12}>
    <h2 className="text-center font-weight-bold mb-4">Order Details</h2>
    <Row className=" mb-4">
      <Col xs={12} md={6} className="content-center justify-content-md-start">
        <Form.Control
          type="text"
          placeholder="Search by Order ID"
          value={searchInput}
          onChange={handleSearch}
          style={{ width: '100%', maxWidth: '300px' }}
        />
      </Col>
      <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end gap-4">
        <Button variant="success" onClick={handleSearch}>
          Reset
        </Button>
        <Button variant="secondary" onClick={handleExport}>
          Export Orders
        </Button>
      </Col>
    </Row>
  </Col>
</Row>

        </Container>
           {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
      <Container >
       

       {filteredOrders.length > 0 ? (
  filteredOrders.map((order) => (
    <Row key={order._id} className="mb-4">
      <Col md={12}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Row className="align-items-center mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <Col md={6}>
                <h5 className="text-primary mb-0">Order ID: {order?._id}</h5>
              </Col>
              <Col md={6} className="text-md-end">
                <span
                  className={`badge ${
                    order.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success'
                  }`}
                  style={{ padding: '10px 15px', fontSize: '0.9rem', borderRadius: '20px' }}
                >
                  {order?.status}
                </span>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <p><strong>Customer Name:</strong> {order?.customer?.firstName} {order?.customer?.lastName}</p>
                <p><strong>Email:</strong> {order?.customer?.email}</p>
                <p><strong>Mobile:</strong> {order?.customer?.mobile}</p>
                <p><strong>Payment Status:</strong> {order?.paymentStatus}</p>
                <p><strong>Total Amount:</strong> ₹{order?.totalAmount}</p>
              </Col>
              <Col md={6}>
                <h5 className="mb-3">Products:</h5>
                <ListGroup className="border-0">
                  {order.products.map((product, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center border-0 p-2"
                    >
                      <div>
                        <strong>{product?.product?.productName}</strong> - {product?.quantity} x ₹{product?.price}
                      </div>
                      <div>
                        <img
                          src={product?.product?.images}
                          alt="product"
                          className="rounded"
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginLeft: '10px' }}
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="mt-4 d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleInvoiceClick(order._id)}
                  >
                    Generate Invoice
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    View Order
                  </Button>
                </div>
              </Col>
            </Row>

            <hr />
            <h5 className="mt-3">Shipping Address:</h5>
            <p className="mb-1">{order?.shippingAddress?.address}</p>
            <p className="mb-0">
              {order?.shippingAddress?.state}, {order?.shippingAddress?.country} - {order?.shippingAddress?.pinCode}
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ))
) : (
  <div className="text-center text-muted">No orders found</div>
)}

      </Container>
)}
      {/* Modal for order details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {orderDetails && (
    <div className="p-3">
      <h5 className="text-primary mb-3">Order Details</h5>
      <div className="mb-4">
        <h6>Order ID:</h6>
        <p className="fw-bold">{orderDetails?._id}</p>
      </div>
      <div className="mb-4">
        <h6>Customer Information:</h6>
        <p>
          <strong>Name:</strong> {orderDetails?.customer?.firstName} {orderDetails?.customer?.lastName}
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${orderDetails?.customer?.email}`}>{orderDetails?.customer?.email}</a>
        </p>
        <p>
          <strong>Mobile:</strong> <a href={`tel:${orderDetails?.customer?.mobile}`}>{orderDetails?.customer?.mobile}</a>
        </p>
      </div>
      <div className="mb-4">
        <h6>Total Amount:</h6>
        <p className="fw-bold text-success">₹{orderDetails?.totalAmount}</p>
      </div>
      <div className="mb-4">
        <h6>Payment Status:</h6>
        <p className={orderDetails?.paymentStatus === "Paid" ? "text-success" : "text-danger"}>
          {orderDetails?.paymentStatus}
        </p>
      </div>
      <div className="mb-4">
        <h6>Products:</h6>
        <ListGroup>
          {orderDetails.products.map((product, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              <img
                src={product?.product?.images}
                alt={product?.product?.productName}
                className="me-3 rounded"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <strong>{product?.product?.productName}</strong>
                <p className="mb-0">
                  {product?.quantity} x ₹{product?.price} = <strong>₹{product?.total}</strong>
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="mb-4">
        <h6>Shipping Address:</h6>
        <p>{orderDetails?.shippingAddress?.address}</p>
        <p>
          {orderDetails?.shippingAddress?.state}, {orderDetails?.shippingAddress?.country} -{" "}
          {orderDetails?.shippingAddress?.pinCode}
        </p>
      </div>
    </div>
  )}
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default OrderHistory;