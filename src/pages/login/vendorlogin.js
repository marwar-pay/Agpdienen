import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiPost } from "@/api/apiMethods";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const VENDOR_API_ENDPOINT = `api/vendor-login`;

export default function VendorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await apiPost(VENDOR_API_ENDPOINT, {  referenceWebsite: referenceWebsite || '', username, password });
      const { token, refreshToken, role } = response?.data?.vendorData;
  
      if (role === "vendor") {
        setSnackbarMessage("Login successful! Redirecting...");
        setOpenSnackbar(true);
        const currentWebsite = encodeURIComponent(window.location.origin);
        setTimeout(() => {
          router.push(`https://com.yunicare.in/?accessToken=${token}&source=${currentWebsite}`);
        }, 1500);
      } else {
        setError("Access restricted to vendors only");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError(null);
  };

  return (
    <div className={`login-container ${isMounted ? 'mounted' : ''}`}>
      <div className="login-background">
        <div className="floating-product product-1"></div>
        <div className="floating-product product-2"></div>
        <div className="floating-product product-3"></div>
      </div>
      
      <div className="login-card">
        <div className="card-header">
          <div className="logo-container">
            <div className="logo-badge"></div>
            <h2>Vendor Dashboard</h2>
          </div>
          <p>Manage your products and orders</p>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group floating-input">
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
              <div className="underline"></div>
            </div>
            
            <div className="form-group floating-input">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <div className="underline"></div>
            </div>
            
            <div className="form-options">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
             
            </div>
            
            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="button-icon">→</span>
                  Sign In
                </>
              )}
            </button>
          </form>
          
     
        </div>
        
        {(error || openSnackbar) && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
            {error || snackbarMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleCloseSnackbar}
              aria-label="Close"
            ></button>
          </div>
        )}
        
        <div className="card-footer">
          <p>
            New vendor? <Link href="/register/vendor">Request access</Link>
          </p>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');
      `}</style>
      
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f7ff;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        
        .login-container.mounted {
          opacity: 1;
          transform: translateY(0);
        }
        
        .login-background {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .floating-product {
          position: absolute;
          border-radius: 12px;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          animation-duration: 25s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          opacity: 0.9;
        }
        
        .product-1 {
          width: 120px;
          height: 120px;
          top: 15%;
          left: 10%;
          background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%);
          animation-name: float-1;
        }
        
        .product-2 {
          width: 80px;
          height: 80px;
          top: 65%;
          left: 15%;
          background: linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%);
          animation-name: float-2;
        }
        
        .product-3 {
          width: 100px;
          height: 100px;
          top: 30%;
          right: 10%;
          background: linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%);
          animation-name: float-3;
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(5deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-5deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        .login-card {
          width: 100%;
          max-width: 420px;
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          background: white;
          z-index: 1;
          transform: scale(0.95);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        
        .login-card:hover {
          transform: scale(1);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
        }
        
        .card-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2.5rem 2rem;
          text-align: center;
        }
        
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .logo-badge {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 18px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transform: rotate(0deg);
          transition: transform 0.6s ease;
        }
        
        .login-card:hover .logo-badge {
          transform: rotate(15deg);
        }
        
        .card-header h2 {
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.8rem;
        }
        
        .card-header p {
          opacity: 0.9;
          margin-bottom: 0;
          font-size: 0.95rem;
        }
        
        .card-body {
          padding: 2.5rem 2rem;
          background-color: white;
        }
        
        .form-group {
          margin-bottom: 1.8rem;
          position: relative;
        }
        
        .floating-input input {
          height: 50px;
          padding-top: 18px;
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .floating-input input:focus {
          box-shadow: none;
          border-color: #667eea;
        }
        
        .floating-input label {
          position: absolute;
          top: 15px;
          left: 12px;
          color: #999;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        
        .floating-input input:focus + label,
        .floating-input input:not(:placeholder-shown) + label {
          top: 0;
          left: 0;
          font-size: 12px;
          color: #667eea;
        }
        
        .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.4s ease;
        }
        
        .floating-input input:focus ~ .underline {
          width: 100%;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .forgot-password {
          color: #667eea;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .forgot-password:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        
        .login-button {
          width: 100%;
          padding: 0.9rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .login-button:active {
          transform: translateY(0);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          transform: none !important;
        }
        
        .button-icon {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        
        .login-button:hover .button-icon {
          transform: translateX(4px);
        }
        
        .social-login {
          margin-top: 2rem;
        }
        
        .divider {
          display: flex;
          align-items: center;
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        
        .divider::before, .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #eee;
        }
        
        .divider span {
          padding: 0 1rem;
        }
        
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        .social-btn.google {
          color: #db4437;
        }
        
        .social-btn.facebook {
          color: #4267B2;
        }
        
        .social-btn.apple {
          color: #000;
        }
        
        .alert {
          border-radius: 8px;
          margin-top: 1.5rem;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-footer {
          background-color: #f9f9ff;
          padding: 1.2rem 2rem;
          text-align: center;
          border-top: 1px solid #f0f0f0;
        }
        
        .card-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .card-footer a:hover {
          color: #764ba2;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}