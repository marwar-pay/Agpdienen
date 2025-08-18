
'use client';

import Link from "next/link";
import logo from "../assets/images/logo.png";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { apiGet } from "@/api/apiMethods";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart, cartitems, wishlist } = useCart();
  const cartItems = cart || [];
  const wishlistItems = wishlist || [];
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
  const [scrolled, setScrolled] = useState(false);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Scroll listener for header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(`api/website/${referenceWebsite}`);
        if (response) {
          setCategories(response.data?.website?.categories || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Check login state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    }
  }, []);

  // Logout
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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="headerfix" style={{ zIndex: "2000" }}>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 px-4 d-flex justify-content-end align-items-center">
        <Link href="/login/vendorlogin" className="text-white mx-3">
          Become Vendor
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-link text-white mx-3">
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-white mx-3">
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

      {/* Header */}
      <header
        className={`fixed top-10 left-0 w-full mt-[-5px] z-[1000] transition-all duration-300 ease-in-out ${scrolled ? 'bg-white shadow-sm' : 'bg-[#7f77775a] shadow-sm'} Kodchasan`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link href="/" passHref className="navbar-brand">
              <Image src={logo} className="logo rounded" alt="logo" width={50} />
            </Link>

            {/* Mobile Menu Button */}
            <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Desktop Navigation */}
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item"><Link href="/" className="text-black mx-3">Home</Link></li>
                <li className="nav-item"><Link href="/about" className="text-black mx-3">About</Link></li>

                {/* Desktop Dropdown */}
                <li className="nav-item" ref={desktopDropdownRef}>
                  <div className="text-black mx-3 droplinkstyle">
                    <button onClick={() => setDesktopDropdownOpen(prev => !prev)}>Products</button>
                    {desktopDropdownOpen && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        background: "white",
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        borderRadius: "8px",
                        width: "350px",
                        padding: "8px",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "6px"
                      }}>
                        <Link
                          href={`/products/allproducts`}
                          style={{ textDecoration: "none", color: "#000" }}
                          onClick={() => setDesktopDropdownOpen(false)} // ✅ close dropdown
                        >
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px",
                            border: "1px solid #f0f0f0",
                            borderRadius: "6px"
                          }}>
                            <Image src="/placeholder.jpg" alt="All Products" width={35} height={35} style={{ borderRadius: "50%" }} />
                            <span style={{ fontSize: "13px", fontWeight: "500" }}>All Products</span>
                          </div>
                        </Link>
                        {categories.map(category => (
                          <Link
                            href={`/products/allproducts?category=${category._id}`}
                            key={category._id}
                            style={{ textDecoration: "none", color: "#000" }}
                            onClick={() => setDesktopDropdownOpen(false)} // ✅ close dropdown
                          >
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "6px",
                              border: "1px solid #f0f0f0",
                              borderRadius: "6px"
                            }}>
                              <Image
                                src={category.image || "/placeholder.jpg"}
                                alt={category.name}
                                width={35}
                                height={35}
                                style={{ borderRadius: "50%" }}
                              />
                              <span style={{ fontSize: "13px", fontWeight: "500" }}>{category.name}</span>
                            </div>
                          </Link>
                        ))}
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

      {/* Mobile Menu Overlay */}
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

          <div className="menu-card dropdown-card" ref={mobileDropdownRef}>
            <button onClick={() => setMobileDropdownOpen(prev => !prev)}>
              🛍 Products
            </button>
            {mobileDropdownOpen && (
              <div className="dropdown-list">
                <Link href="/products/allproducts" onClick={() => setMenuOpen(false)} style={{
                  display: "flex", alignItems: "center", padding: "8px 12px", gap: "8px"
                }}>
                  <Image src="/placeholder.jpg" alt="All Products" width={30} height={30} style={{ borderRadius: "50%" }} />
                  All Products
                </Link>
                {categories.map(category => (
                  <Link
                    href={`/products/allproducts?category=${category._id}`}
                    key={category._id}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", padding: "8px 12px", gap: "8px"
                    }}
                  >
                    <Image src={category.image || "/placeholder.jpg"} alt={category.name} width={30} height={30} style={{ borderRadius: "50%" }} />
                    {category.name}
                  </Link>
                ))}
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
          font-size: 16px;
          font-weight: 500;
        }
        .menu-card a {
          text-decoration: none;
          color: #333;
          display: block;
        }
        .dropdown-list {
          margin-top: 8px;
          background: #fff;
          border-radius: 8px;
          padding: 8px 0;
          border: 1px solid #f0f0f0;
        }
      `}</style>
    </div>
  );
}
