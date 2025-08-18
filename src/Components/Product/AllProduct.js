'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container, Row, Col, Card, Button, Form, Offcanvas
} from "react-bootstrap";
import { apiGet } from "@/api/apiMethods";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [category, setCategory] = useState('');

  // Mobile filter offcanvas
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        referenceWebsite,
        limit: productsPerPage,
        page: currentPage,
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(minDiscount && { minDiscount }),
        ...(maxDiscount && { maxDiscount }),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(category && { category })
      });

      const response = await apiGet(`api/product/getproducts?${queryParams}`);
      setProducts(response.data?.products || []);
      setTotalProducts(response.data?.pagination?.totalDocuments || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, minPrice, maxPrice, minDiscount, maxDiscount, search, sortBy, sortOrder, category]);

  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinDiscount("");
    setMaxDiscount("");
    setSearch("");
    setSortBy();
    setSortOrder();
    setCategory("");
    setCurrentPage(1);
  };

  const calculateDiscount = (actualPrice, price) => {
    return Math.round(((price - actualPrice) / price) * 100);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const filterContent = (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Saree, Kurti"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Min Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="10000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Min Discount %</Form.Label>
        <Form.Control
          type="number"
          placeholder="0"
          value={minDiscount}
          onChange={(e) => setMinDiscount(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Discount %</Form.Label>
        <Form.Control
          type="number"
          placeholder="100"
          value={maxDiscount}
          onChange={(e) => setMaxDiscount(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Saree, Kurti"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sort By</Form.Label>
        <Form.Select
          value={sortBy || ''}
          onChange={(e) => setSortBy(e.target.value || undefined)}
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="discount">Discount</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Order</Form.Label>
        <Form.Select
          value={sortOrder || ''}
          onChange={(e) => setSortOrder(e.target.value || undefined)}
        >
          <option value="">None</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Form.Select>
      </Form.Group>

      <Button
        variant="outline-secondary"
        className="w-100 mt-2 glassy-btn"
        onClick={() => {
          resetFilters();
          handleCloseFilter(); // Also close on mobile
        }}
      >
        Reset All
      </Button>
    </>
  );

  return (
    <Container className="mt-4">
      <h5 className="section-content__title product-title rounded-end mb-3 glassy-btn">
        Fresh Off The Runway
      </h5>

      {/* Mobile Filter Button */}
      <div className="d-md-none mb-3 text-end">
        <Button onClick={handleShowFilter} className="glassy-btn">
          Filters
        </Button>
      </div>

      <Row>
        {/* Desktop Filter */}
        <Col md={3} className="d-none d-md-block">
          <div className="p-3 border rounded bg-white">
            <h6 className="fw-bold mb-3">Refine Results</h6>
            {filterContent}
          </div>
        </Col>

        {/* Mobile Offcanvas Filter */}
        <Offcanvas show={showFilter} onHide={handleCloseFilter} placement="start" className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Refine Results</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{marginTop:"50px"}}>
            {filterContent}
          </Offcanvas.Body>
        </Offcanvas>

        {/* Product List */}
        <Col md={9}>
          <Row>
            {loading ? (
              <Col><p>Loading...</p></Col>
            ) : error ? (
              <Col><p className="text-danger">{error}</p></Col>
            ) : products.length === 0 ? (
              <Col>
                <p>No products found matching your filters.</p>
                <Button variant="primary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </Col>
            ) : (
              products.map((product) => {
                const discount = calculateDiscount(product.actualPrice, product.price);
                return (
                  <Col xs={6} md={3} key={product._id} className="mb-4">
                    <Card
                      className="h-100 border-0 shadow-sm product-card"
                      style={{ borderRadius: "12px", cursor: "pointer" }}
                      onClick={() => handleViewDetails(product._id)}
                    >
                      <div
                        style={{
                          height: "230px",
                          position: "relative",
                          backgroundColor: "#f8f9fa",
                          overflow: "hidden"
                        }}
                      >
                        <Card.Img
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.productName}
                          style={{
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                            padding: "10px",
                            transition: "transform 0.4s ease"
                          }}
                          className="product-img"
                        />
                        {discount > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              background: "#dc3545",
                              color: "#fff",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}
                          >
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title
                          className="fw-bold text-truncate"
                          style={{ fontSize: "15px" }}
                        >
                          {product.productName}
                        </Card.Title>
                        <Card.Text style={{ fontSize: '13px', color: '#666', flexGrow: 1 }}>
                          {product.description?.split(' ').slice(0, 18).join(' ')}
                          {product.description?.split(' ').length > 18 ? '...' : ''}
                        </Card.Text>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-success">₹{product.actualPrice}</span>
                          <small className="text-muted text-decoration-line-through">
                            ₹{product.price}
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <Button className="glassy-btn"
              variant="outline-secondary"    
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button className="glassy-btn"
              variant="outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>

      {/* Styles */}
      <style>{`
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .product-card:hover .product-img {
          transform: scale(1.08);
        }
        .glassy-btn {
          background: linear-gradient(135deg, rgba(80, 200, 180, 0.85), rgba(250, 130, 150, 0.85));
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 8px 20px;
          font-weight: 600;
          transition: all 0.3s ease-in-out;
        }
        .glassy-btn:hover {
          background: linear-gradient(135deg, rgba(80, 200, 180, 1), rgba(250, 130, 150, 1));
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
        }
        .glassy-btn:disabled {
          background: rgba(200, 200, 200, 0.5);
          color: #666;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
    </Container>
  );
};

export default AllProduct;
