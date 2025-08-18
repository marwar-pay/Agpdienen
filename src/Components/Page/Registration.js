'use client';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useState } from "react";
import { apiPost } from "@/api/apiMethods";
import { useRouter } from "next/navigation";
import Header from "@/Layout/Header";

export default function RegistrationPage() {
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const [formData, setFormData] = useState({
    referenceWebsite: referenceWebsite || '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    isActive: true,
  });
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost('api/auth/signUp', formData);
      toast.success("Registered successfully!");
      setMessage('User registered successfully');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      toast.error("Registration failed!");
      if (error.response && error.response.data.includes('duplicate key error')) {
        setMessage('Email already exists. Please use a different email address.');
      } else {
        setMessage('Error: ' + (error.response?.data || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.pageWrapper}>
        <div style={styles.overlay}></div>
        <div style={styles.registerCard}>
          <h2 style={styles.title}>Create Account 🛍️</h2>
          <p style={styles.subtitle}>Join us to explore the best fashion</p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Password"
              required
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={styles.input}
              placeholder="Mobile Number"
              required
            />
            <button type="submit" style={styles.registerButton} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link href="/login" style={styles.loginLink}>
              Already have an account? Login
            </Link>
          </form>
          {message && <p style={{ color: "#ffcccc", marginTop: "10px" }}>{message}</p>}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=1600&q=80')", // Fashion background
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "20px",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
  },
  registerCard: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "30px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    marginBottom: "8px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#ddd",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.3)",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    backdropFilter: "blur(4px)",
  },
  registerButton: {
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s ease",
  },
  loginLink: {
    display: "block",
    marginTop: "12px",
    fontSize: "13px",
    color: "#f8cdda",
    textDecoration: "none",
  },
};
