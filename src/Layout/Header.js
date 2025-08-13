'use client';

import Link from "next/link";
import logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { IoMdClose } from "react-icons/io"; // Close icon
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { apiGet } from "@/api/apiMethods";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart, cartitems, wishlist } = useCart();
  const cartItems = cart || [];
  const wishlistItems = wishlist || [];
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
 const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50); // or 15, as per your design needs
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(`api/website/${referenceWebsite}`);
        if (response) {
          setCategories(response.data?.website?.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await apiGet("api/auth/logOut");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
      };

  return (
    <div className="headerfix">
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 px-4 d-flex justify-content-end align-items-center">
        <Link href="/login/vendorlogin" className="text-white hover:text-primary mx-3">
          Become Vendor
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-link text-white mx-3">
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-white hover:text-primary mx-3">
            Login
          </Link>
        )}

        <div className="d-flex align-items-center ml-3">
          <Link href="/cart" className="btn btn-outline-secondary me-2 position-relative">
            <FaShoppingCart />
            {cartitems?.items?.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartitems?.items?.length}
              </span>
            )}
          </Link>

          <Link href="/wishlist" className="btn btn-outline-secondary me-2 position-relative">
            <AiFillHeart color="#ff4081" />
            {wishlistItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Header and Navigation */}
       
        <header
        className={`fixed top-10 left-0 w-full mt-[-5px] z-[1000] transition-all duration-300 ease-in-out ${scrolled ? 'bg-white shadow-sm' : 'bg-[#7f77775a] shadow-sm'
          } Kodchasan`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link href="/" passHref className="navbar-brand">
              <Image src={logo} className="logo rounded" alt="logo" width={50} />
            </Link>

            {/* Mobile Menu Button */}
            <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
              <span className="navbar-toggler-icon "></span>
            </button>

            {/* Desktop Navigation */}
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item"><Link href="/" className="text-black mx-3">Home</Link></li>
                <li className="nav-item"><Link href="/about" className="text-black mx-3">About</Link></li>
                
                <li className="nav-item">
                   <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                    className="text-black hover:text-primary mx-3 droplinkstyle"
                  >
                    <button onClick={toggleDropdown}>Products</button>
                    {dropdownVisible && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          background: "white",
                          border: "1px solid #ccc",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          zIndex: 1000,
                          borderRadius: "5px",
                          width: "200px",
                        }}
                      >
                        <Link
                      href={`/products/allproducts`}
                      style={{ color: '#000'}}> 
                        <div style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #f0f0f0"}}>  All Products</div>
                    
                    </Link>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <Link
                              href={`/products/allproducts?category=${category._id}`}
                              key={category._id}
                              style={{ color: '#000' }}
                            >
                              <div
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                                onClick={() => setDropdownVisible(false)}
                              >
                                {category.name}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div
                            style={{
                              padding: "8px 16px",
                              color: "#888",
                            }}
                          >
                            No categories found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
                 <li className="nav-item"><Link href="/orderhistory" className="text-black mx-3">Order History</Link></li>
                <li className="nav-item"><Link href="/contact" className="text-black mx-3">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Curtain Menu Overlay */}
     {/* Mobile Curtain Menu Overlay */}
<div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
  <div className="menu-header">
    <button className="close-btn" onClick={() => setMenuOpen(false)}>
      <IoMdClose size={28} />
    </button>
    <h3 className="menu-title">Menu</h3>
  </div>

  <div className="menu-content">
    <div className="menu-card" onClick={() => setMenuOpen(false)}>
      <Link href="/">🏠 Home</Link>
    </div>

    <div className="menu-card dropdown-card">
      <button onClick={toggleDropdown}>
        🛍 Products
      </button>
      {dropdownVisible && (
        <div className="dropdown-list">
          <Link href="/products/allproducts" onClick={() => setMenuOpen(false)}>
            All Products
          </Link>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                href={`/products/allproducts?category=${category._id}`}
                key={category._id}
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))
          ) : (
            <span className="no-category">No categories found</span>
          )}
        </div>
      )}
    </div>

    <div className="menu-card" onClick={() => setMenuOpen(false)}>
      <Link href="/about">ℹ️ About</Link>
    </div>
    <div className="menu-card" onClick={() => setMenuOpen(false)}>
      <Link href="/orderhistory">📦 Order History</Link>
    </div>
    <div className="menu-card" onClick={() => setMenuOpen(false)}>
      <Link href="/contact">📞 Contact Us</Link>
    </div>
  </div>
</div>

<style jsx>{`
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100%;
    background: #ffffff;
    box-shadow: -5px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition: right 0.4s ease;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  .mobile-menu-overlay.open {
    right: 0;
  }

  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .menu-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }

  .close-btn {
    background: #f5f5f5;
    border: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .close-btn:hover {
    background: #e4e4e4;
  }

  .menu-content {
    padding: 16px;
    overflow-y: auto;
  }

  .menu-card {
    background: #f9f9f9;
    padding: 14px 16px;
    border-radius: 12px;
    margin-bottom: 12px;
    transition: transform 0.2s ease, background 0.2s ease;
    font-size: 16px;
    font-weight: 500;
  }
  .menu-card:hover {
    transform: translateY(-2px);
    background: #f1f1f1;
  }

  .menu-card a {
    text-decoration: none;
    color: #333;
    display: block;
  }

  .dropdown-card button {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    text-align: left;
    padding: 0;
    cursor: pointer;
    color: #333;
  }

  .dropdown-list {
    margin-top: 8px;
    background: #fff;
    border-radius: 8px;
    padding: 8px 0;
    border: 1px solid #f0f0f0;
  }

  .dropdown-list a {
    display: block;
    padding: 8px 16px;
    color: #555;
    text-decoration: none;
    font-size: 14px;
    transition: background 0.2s ease;
  }
  .dropdown-list a:hover {
    background: #f8f8f8;
  }

  .no-category {
    display: block;
    padding: 8px 16px;
    color: #999;
    font-size: 14px;
  }
`}</style>

    </div>
  );
}






// 'use client';

// import Link from "next/link";
// import logo from "../assets/pinkcityimg/logo.png";
// import { useState, useEffect } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import Image from "next/image";
// import { AiFillHeart } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { apiGet } from "@/api/apiMethods";

// export default function Header() {
//   const [categories, setCategories] = useState([]);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const { cart, cartitems, wishlist } = useCart();
//   const cartItems = cart || [];
//   const wishlistItems = wishlist || [];
//   const router = useRouter();
//   const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await apiGet(`api/website/${referenceWebsite}`);
//         if (response) {
//           setCategories(response.data?.website?.categories);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("accessToken");
//       setIsLoggedIn(!!token);
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await apiGet("api/auth/logOut");
//       localStorage.removeItem("accessToken");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   return (
//     <div className="headerfix">
//       {/* Top Bar */}
//       {/* <div className="bg-dark text-white py-2 px-4 d-flex justify-content-end align-items-center"> */}
//         <div className="top-bar text-white py-2 px-4 d-flex justify-content-end align-items-center">
//         <Link href="/login/vendorlogin" className="text-white mx-3">
//           Become Vendor
//         </Link>
//         {isLoggedIn ? (
//           <button onClick={handleLogout} className="btn btn-link text-white mx-3">
//             Logout
//           </button>
//         ) : (
//           <Link href="/login" className="text-white mx-3">Login</Link>
//         )}

//         <div className="d-flex align-items-center ml-3">
//           <Link href="/cart" className="btn btn-outline-light me-2 position-relative">
//             <FaShoppingCart />
//             {cartitems?.items?.length > 0 && (
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                 {cartitems?.items?.length}
//               </span>
//             )}
//           </Link>

//           <Link href="/wishlist" className="btn btn-outline-light me-2 position-relative">
//             <AiFillHeart color="#ff4081" />
//             {wishlistItems.length > 0 && (
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                 {wishlistItems.length}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Header and Navigation */}
//       <header className={`header fixed-top ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`} style={{ transition: "all 0.3s ease" }}>
//         <nav className="navbar navbar-expand-lg">
//           <div className="container">
//             <Link href="/" passHref className="navbar-brand">
//               <Image src={logo} className="logo rounded" alt="logo" width={50} />
//             </Link>

//             <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
//               <span className="navbar-toggler-icon bg-dark"></span>
//             </button>

//             <div className="collapse navbar-collapse justify-content-end">
//               <ul className="navbar-nav mb-2 mb-lg-0">
//                 <li className="nav-item"><Link href="/" className="text-black mx-3">Home</Link></li>
//                 <li className="nav-item"><Link href="/about" className="text-black mx-3">About</Link></li>
//                 <li className="nav-item">
//                   <div className="text-black mx-3 droplinkstyle" style={{ position: "relative", display: "inline-block" }}>
//                     <button onClick={toggleDropdown}>Products</button>
//                     {dropdownVisible && (
//                       <div className="dropdown-menu">
//                         <Link href={`/products/allproducts`}><div className="dropdown-item">All Products</div></Link>
//                         {categories.length > 0 ? (
//                           categories.map((category) => (
//                             <Link
//                               href={`/products/allproducts?category=${category._id}`}
//                               key={category._id}
//                               className="dropdown-item"
//                               onClick={() => setDropdownVisible(false)}
//                             >
//                               {category.name}
//                             </Link>
//                           ))
//                         ) : (
//                           <div className="dropdown-item text-muted">No categories found</div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </li>
//                 <li className="nav-item"><Link href="/orderhistory" className="text-black mx-3">Order History</Link></li>
//                 <li className="nav-item"><Link href="/contact" className="text-black mx-3">Contact Us</Link></li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Overlay Menu */}
//       <div className={`overlay ${menuOpen ? "open" : ""}`}>
//         <button className="close-btn" onClick={() => setMenuOpen(false)}>
//           <IoMdClose size={24} color="#f41d19" />
//         </button>
//         <ul className="menu-list">
//           <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li className="nav-item">
//             <div className="mx-3 droplinkstylem" style={{ position: "relative", display: "inline-block" }}>
//               <button onClick={toggleDropdown}>Products</button>
//               {dropdownVisible && (
//                 <div className="dropdown-menu">
//                   <Link href={`/products/allproducts`}><div className="dropdown-item">All Products</div></Link>
//                   {categories.length > 0 ? (
//                     categories.map((category) => (
//                       <Link
//                         href={`/products/allproducts?category=${category._id}`}
//                         key={category._id}
//                         className="dropdown-item"
//                         onClick={() => {
//                           setDropdownVisible(false);
//                           setMenuOpen(false);
//                         }}
//                       >
//                         {category.name}
//                       </Link>
//                     ))
//                   ) : (
//                     <div className="dropdown-item text-muted">No categories found</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </li>
//           <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
//           <li><Link href="/orderhistory" onClick={() => setMenuOpen(false)}>Order History</Link></li>
//           <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
//         </ul>
//       </div>

//       {/* Styles */}
//       <style jsx>{`
//         .header {
//           z-index: 1000;
//         }
     
//   .top-bar {
//     background-color: transparent;
//   }

//   .headerfix.bg-white .top-bar {
//     background-color: white;
//     color: black;
//   }

//   .navbar-nav .nav-link,
//   .top-bar a {
//     transition: color 0.3s;
//   }

//   .bg-transparent .nav-link,
//   .bg-transparent .top-bar a {
//     color: white !important;
//   }

//   .bg-white .nav-link,
//   .bg-white .top-bar a {
//     color: black !important;
//   }



//         .dropdown-menu {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           background: white;
//           border: 1px solid #ccc;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           border-radius: 5px;
//           width: 200px;
//           z-index: 1001;
//         }

//         .dropdown-item {
//           padding: 8px 16px;
//           cursor: pointer;
//           border-bottom: 1px solid #f0f0f0;
//           color: black;
//           text-decoration: none;
//         }

//         .dropdown-item:hover {
//           background: #f8f9fa;
//         }

//         .overlay {
//           height: 100%;
//           width: 0;
//           position: fixed;
//           z-index: 1000;
//           top: 0;
//           right: 0;
//           background-color: #fff;
//           overflow-x: hidden;
//           transition: 0.5s;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
//                       rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
//                       rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
//         }

//         .overlay.open {
//           width: 80%;
//         }

//         .overlay .close-btn {
//           position: absolute;
//           top: 15px;
//           right: 25px;
//           background: none;
//           border: none;
//           cursor: pointer;
//         }

//         .overlay .menu-list {
//           list-style: none;
//           padding: 0;
//           text-align: center;
//         }

//         .overlay .menu-list li {
//           padding: 10px 0;
//         }

//         .overlay .menu-list a {
//           font-size: 22px;
//           color: red;
//           text-decoration: none;
//         }

//         .overlay .menu-list a:hover {
//           color: black;
//           text-decoration: underline;
//         }
//       `}</style>
//     </div>
//   );
// }
