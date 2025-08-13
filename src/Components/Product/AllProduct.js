// 'use client';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { apiGet } from "@/api/apiMethods";

// const AllProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState(); // e.g., "price" or "name"
//   const [sortOrder, setSortOrder] = useState(); // e.g., "asc" or "desc"
//   const router = useRouter();
//   const [category, setCategory] = useState('')
//   const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

//   // function getDeviceType() {
//   //   let userAgent = navigator.userAgent.toLowerCase();

//   //   if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
//   //     return "Mobile";
//   //   } else {
//   //     return "Desktop/Laptop";
//   //   }
//   // }

//   // useEffect(() => {
//   //   console.log("Device Type:", getDeviceType());
//   // }, [])

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         referenceWebsite,
//         limit: productsPerPage,
//         page: currentPage,
//         minPrice,
//         maxPrice,
//         search,
//         sortBy,
//         sortOrder,
//         category: category || ''
//       });

//       const response = await apiGet(`api/product/getproducts?${queryParams}`);
//       setProducts(response.data?.products || []);
//       setTotalProducts(response.data?.pagination?.totalDocuments || 0); // Assuming `total` is sent by the API
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const queryString = router.query; // Get query params from Next.js router

//   useEffect(() => {
//     if (queryString?.category) {
//       setCategory(queryString.category);
//       console.log(queryString.category);
//     }
//   }, [queryString]);


//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, minPrice, maxPrice, search, sortBy, sortOrder, category]);

//   const handleViewDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const resetFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setSearch("");
//     setSortBy();
//     setSortOrder();
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   return (
//     <Container className="mt-4">
//       <h5 class="section-content__title product-title">Fresh Off The Runway</h5>
//       <Row className="mb-3">
//         {/* Search */}
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Search</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Search products"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         {/* Min Price */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Min Price</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Min Price"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         {/* Max Price */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Max Price</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Max Price"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         {/* Sort By */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Sort By</Form.Label>
//             <Form.Select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value={null} >None</option>
//               <option value="price">Price</option>
//               <option value="name">Name</option>
//               <option value="discount">Discount</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* Sort Order */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Sort Order</Form.Label>
//             <Form.Select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="">None</option>
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* Reset Button */}
//         <Col md={1} className="align-self-end">
//           <Button variant="secondary" onClick={resetFilters}>
//             Reset
//           </Button>
//         </Col>
//       </Row>

//       {/* Product Listing */}
//       <Row>
//         {loading ? (
//           <Col>
//             <p>Loading...</p>
//           </Col>
//         ) : error ? (
//           <Col>
//             <p className="text-danger">{error}</p>
//           </Col>
//         ) : (
//           products.map((product) => (
//             <Col md={3} key={product._id} className="mb-4" onClick={() => handleViewDetails(product._id)}>
//               <Card className="h-100 shadow-sm">
//                 <div
//                   style={{
//                     height: "230px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden",
//                     padding: "10px",
//                   }}
//                 >
//                   <Card.Img className="zoom-effect"
//                     variant="bottom"
//                     src={product.images[0] || "/placeholder.jpg"}
//                     alt={product.productName}
//                     style={{
//                       objectFit: "contain",
//                       maxHeight: "100%",
//                       maxWidth: "100%",
//                     }}
//                   />
//                 </div>
//                 <Card.Body>
//                   <Card.Title>{product.productName}</Card.Title>
//                   <Card.Text style={{ fontSize: '14px', color: '#666' }}>{product.description}</Card.Text>
//                   <Card.Text className="text-success">
//                     Price: ₹{product.actualPrice}  <span style={{ float: 'right' }}> MRP: <span className="text-decoration-line-through">₹{product.price}</span></span>
//                   </Card.Text>
//                   {/* <Card.Text className="text-muted">
//                     MRP: <span className="text-decoration-line-through">₹{product.price}</span>
//                   </Card.Text> */}
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>

//       {/* Pagination */}
//       <div className="d-flex justify-content-between mt-3">
//         <Button
//           variant="outline-secondary"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <Button
//           variant="outline-secondary"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default AllProduct;




// 'use client';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { apiGet } from "@/api/apiMethods";

// const AllProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [minDiscount, setMinDiscount] = useState('');
//   const [maxDiscount, setMaxDiscount] = useState('');
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState();
//   const [sortOrder, setSortOrder] = useState();
//   const router = useRouter();
//   const [category, setCategory] = useState('');
//   const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

//   // Initialize filters from URL query parameters
//   useEffect(() => {
//     const { query } = router;
//     if (query.minDiscount) setMinDiscount(query.minDiscount);
//     if (query.maxDiscount) setMaxDiscount(query.maxDiscount);
//     if (query.category) setCategory(query.category);
//     if (query.search) setSearch(query.search);
//     if (query.sortBy) setSortBy(query.sortBy);
//     if (query.sortOrder) setSortOrder(query.sortOrder);
//   }, [router.query]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams({
//         referenceWebsite,
//         limit: productsPerPage,
//         page: currentPage,
//         ...(minDiscount && { minDiscount }),
//         ...(maxDiscount && { maxDiscount }),
//         ...(search && { search }),
//         ...(sortBy && { sortBy }),
//         ...(sortOrder && { sortOrder }),
//         ...(category && { category })
//       });

//       const response = await apiGet(`api/product/getproducts?${queryParams}`);
//       setProducts(response.data?.products || []);
//       setTotalProducts(response.data?.pagination?.totalDocuments || 0);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, minDiscount, maxDiscount, search, sortBy, sortOrder, category]);

//   const handleViewDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const resetFilters = () => {
//     setMinDiscount("");
//     setMaxDiscount("");
//     setSearch("");
//     setSortBy();
//     setSortOrder();
//     setCurrentPage(1);
//     router.push('/products/allproducts', undefined, { shallow: true });
//   };

//   const calculateDiscount = (actualPrice, price) => {
//     return Math.round(((price - actualPrice) / price) * 100);
//   };

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   return (
//     <Container className="mt-4">
//       <h5 className="section-content__title product-title">Fresh Off The Runway</h5>

//       {/* Display active discount filters */}
//       {(minDiscount || maxDiscount) && (
//         <div className="mb-3">
//           <strong>Active Discount Filter: </strong>
//           {minDiscount && `Min: ${minDiscount}%`}
//           {minDiscount && maxDiscount && ' - '}
//           {maxDiscount && `Max: ${maxDiscount}%`}
//           <Button 
//             variant="link" 
//             onClick={() => {
//               setMinDiscount('');
//               setMaxDiscount('');
//             }}
//           >
//             Clear Discount Filter
//           </Button>
//         </div>
//       )}

//       <Row className="mb-3">
//         {/* Search */}
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Search</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Search products"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         {/* Min Discount */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Min Discount (%)</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Min Discount"
//               value={minDiscount}
//               onChange={(e) => setMinDiscount(e.target.value)}
//               min="0"
//               max="100"
//             />
//           </Form.Group>
//         </Col>

//         {/* Max Discount */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Max Discount (%)</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Max Discount"
//               value={maxDiscount}
//               onChange={(e) => setMaxDiscount(e.target.value)}
//               min="0"
//               max="100"
//             />
//           </Form.Group>
//         </Col>

//         {/* Sort By */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Sort By</Form.Label>
//             <Form.Select
//               value={sortBy || ''}
//               onChange={(e) => setSortBy(e.target.value || undefined)}
//             >
//               <option value="">None</option>
//               <option value="price">Price</option>
//               <option value="name">Name</option>
//               <option value="discount">Discount</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* Sort Order */}
//         <Col md={2}>
//           <Form.Group>
//             <Form.Label>Sort Order</Form.Label>
//             <Form.Select
//               value={sortOrder || ''}
//               onChange={(e) => setSortOrder(e.target.value || undefined)}
//             >
//               <option value="">None</option>
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* Reset Button */}
//         <Col md={1} className="align-self-end">
//           <Button variant="secondary" onClick={resetFilters}>
//             Reset
//           </Button>
//         </Col>
//       </Row>

//       {/* Product Listing */}
//       <Row>
//         {loading ? (
//           <Col>
//             <p>Loading...</p>
//           </Col>
//         ) : error ? (
//           <Col>
//             <p className="text-danger">{error}</p>
//           </Col>
//         ) : products.length === 0 ? (
//           <Col>
//             <p>No products found matching your filters.</p>
//             <Button variant="primary" onClick={resetFilters}>
//               Reset Filters
//             </Button>
//           </Col>
//         ) : (
//           products.map((product) => {
//             const discount = calculateDiscount(product.actualPrice, product.price);
//             return (
//               <Col md={3} key={product._id} className="mb-4" onClick={() => handleViewDetails(product._id)}>
//                 <Card className="h-100 shadow-sm">
//                   <div
//                     style={{
//                       height: "230px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       overflow: "hidden",
//                       padding: "10px",
//                     }}
//                   >
//                     <Card.Img className="zoom-effect"
//                       variant="bottom"
//                       src={product.images[0] || "/placeholder.jpg"}
//                       alt={product.productName}
//                       style={{
//                         objectFit: "contain",
//                         maxHeight: "100%",
//                         maxWidth: "100%",
//                       }}
//                     />
//                   </div>
//                   <Card.Body>
//                     <Card.Title>{product.productName}</Card.Title>
//                     <Card.Text style={{ fontSize: '14px', color: '#666' }}>
//                       {product.description}
//                     </Card.Text>
//                     <Card.Text className="text-success">
//                       Price: ₹{product.actualPrice}  
//                       <span style={{ float: 'right' }}> 
//                         MRP: <span className="text-decoration-line-through">₹{product.price}</span>
//                       </span>
//                     </Card.Text>
//                     <Card.Text className="text-danger fw-bold">
//                       {discount}% OFF
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })
//         )}
//       </Row>

//       {/* Pagination */}
//       <div className="d-flex justify-content-between mt-3">
//         <Button
//           variant="outline-secondary"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <Button
//           variant="outline-secondary"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default AllProduct;


'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { apiGet } from "@/api/apiMethods";
import { PanelBottom } from "lucide-react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // All filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [category, setCategory] = useState('');

  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  // Initialize filters from URL query parameters
  useEffect(() => {
    const { query } = router;
    if (query.minPrice) setMinPrice(query.minPrice);
    if (query.maxPrice) setMaxPrice(query.maxPrice);
    if (query.minDiscount) setMinDiscount(query.minDiscount);
    if (query.maxDiscount) setMaxDiscount(query.maxDiscount);
    if (query.category) setCategory(query.category);
    if (query.search) setSearch(query.search);
    if (query.sortBy) setSortBy(query.sortBy);
    if (query.sortOrder) setSortOrder(query.sortOrder);
  }, [router.query]);

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
        ...(router.query.minDiscount ? { minDiscount: router.query.minDiscount } : minDiscount && { minDiscount }),
        ...(router.query.maxDiscount ? { maxDiscount: router.query.maxDiscount } : maxDiscount && { maxDiscount }),

        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(router.query.category && { category: router.query.category })
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
    setCurrentPage(1);
    router.push('/products/allproducts', undefined, { shallow: true });
  };

  const calculateDiscount = (actualPrice, price) => {
    return Math.round(((price - actualPrice) / price) * 100);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <Container className="mt-4">
      <h5 className="section-content__title product-title rounded-end ">Fresh Off The Runway</h5>

      {/* Display active filters */}


      <Row className="mb-3">
        {/* Search */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Category */}


        {/* Min Price */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
          </Form.Group>
        </Col>

        {/* Max Price */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </Form.Group>
        </Col>

        {/* Min Discount */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Min Discount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min %"
              value={minDiscount}
              onChange={(e) => setMinDiscount(e.target.value)}
              min="0"
              max="100"
            />
          </Form.Group>
        </Col>

        {/* Max Discount */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Max Discount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max %"
              value={maxDiscount}
              onChange={(e) => setMaxDiscount(e.target.value)}
              min="0"
              max="100"
            />
          </Form.Group>
        </Col>

        {/* Sort By */}
        <Col md={1}>
          <Form.Group>
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
        </Col>

        {/* Sort Order */}
        <Col md={1}>
          <Form.Group>
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
        </Col>

        {/* Reset Button */}

      </Row>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Col md={12} className="align-center">
          <Button variant="outline-secondary" onClick={resetFilters}>
            Reset All
          </Button>
        </Col>
      </div>

      {/* Product Listing */}
      <Row>
        {loading ? (
          <Col>
            <p>Loading...</p>
          </Col>
        ) : error ? (
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
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
              <Col
                xs={6}  // 👈 Added for 2 cards in mobile view
                md={3}
                key={product._id}
                className="mb-4"
                onClick={() => handleViewDetails(product._id)}
              >
                <Card
                  className="h-100 border-0 shadow-sm product-card"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                >
                  {/* Image Section */}
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

                  {/* Content Section */}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      className="fw-bold text-truncate"
                      style={{ fontSize: "15px", marginBottom: "5px" }}
                    >
                      {product.productName}
                    </Card.Title>

                    <Card.Text
                      style={{ fontSize: '13px', color: '#666', flexGrow: 1 }}
                    >
                      {product.description.split(' ').slice(0, 18).join(' ')}
                      {product.description.split(' ').length > 18 ? '...' : ''}
                    </Card.Text>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-success">
                          ₹{product.actualPrice}
                        </span>
                        <small className="text-muted text-decoration-line-through">
                          ₹{product.price}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Hover Styles */}
                <style >{`
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    }
    .product-card:hover .product-img {
      transform: scale(1.08);
    }
  `}</style>
              </Col>

            );
          })
        )}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AllProduct;