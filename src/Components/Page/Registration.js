'use client';
import Image from "next/image";
import img from '../../assets/pinkcityimg/Login.gif';
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
      const res = await apiPost('api/auth/signUp', formData);
      toast.success("register successful!");
      setMessage('User registered successfully');
      setTimeout(() => router.push('/login'), 2000); // Navigate to /login after 2 seconds
    } catch (error) {
      toast.error("register failed!");
      // Handle duplicate email error specifically
      if (error.response && error.response.data.includes('duplicate key error')) {
        setMessage('email already exists. Please use a different email address.');
      } else {
        setMessage('Error registering user: ' + (error.response?.data || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.overlayContainer}>
        <h1 style={{ position: "absolute", top: "140px" }}>Register</h1>
        <div style={{...styles.registrationContainer,}}>
          {/* <div style={styles.leftPane}>
          <h2 style={styles.heading}>REGISTER</h2>
          <p style={styles.subText}>Create your account to access Orders, Wishlist, and Recommendations</p>
          <Image
            src={img} // Replace this with the appropriate image URL
            alt="Registration Illustration"
            // style={styles.image}
          />
        </div> */}
          <div style={styles.rightPane}>
            <form style={styles.form} onSubmit={handleSubmit}>

              <input
                type="text"
                style={styles.input}
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your First Name"
                required
              />
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                style={styles.input}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Your Last Name"
                required
              />
              <input
                type="email"
                className="form-control"
                id="email"
                style={styles.input}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />

              <input
                type="password"
                className="form-control"
                id="Password"
                name="password"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />

              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                style={styles.input}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile No"
                required
              />

              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" style={styles.registerButton} disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
              <Link href="/login" style={styles.loginButton}>Already have an account? Login
              </Link>

            </form>
          </div>
        </div>
        {/* <ToastContainer position="top-right" autoClose={2000} /> */}
      </div>
    </>
  );
}

const styles = {
  overlayContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    // marginTop: '70px',
  },
  registrationContainer: {
    display: "flex",
    width: "700px",
    height: "500px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  leftPane: {
    backgroundColor: "black",
    color: "#fff",
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "150px",
  },
  rightPane: {
    backgroundColor: "#fff",
    flex: 1,
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  registerButton: {
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  loginButton: {
    backgroundColor: "#fff",
    color: "#441539",
    border: "1px solid #441539",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
