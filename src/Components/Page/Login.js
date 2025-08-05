import Image from "next/image";
import img from "../../assets/pinkcityimg/Login.gif";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { apiPost } from "@/api/apiMethods";
import Header from "@/Layout/Header";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiPost("api/auth/logIn", {
        referenceWebsite: referenceWebsite || '',
        email,
        password,
      });

      console.log("Response:", res.data);

      if (res.status === 200 && res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);

        toast.success(res.data.msg || "Login successful!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error(res.data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Login failed. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };



  return (
    <>
      <Header />
      <div style={styles.overlayContainer}>
        <h1 style={{position: "absolute", top:"130px"}}>Login</h1>
        <div style={styles.loginContainer}>
          {/* <div style={styles.leftPane}>
            <h2 style={styles.heading}>LOGIN</h2>
            <p style={styles.subText}>
              Get access to your Orders, Wishlist, and Recommendations
              </p>
              <Image
              src={img}
              alt="Login Illustration"
              width={300}
              height={150}
              style={styles.image}
              />
              </div> */}
          <div style={styles.rightPane}>
            <form style={styles.form} onSubmit={handleLogin}>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={styles.forgotContainer}>
                <Link href="/forgot-password" style={styles.forgotLink}>
                  Forgot?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                style={styles.loginButton}
              >
                Login
              </button>
              {message && (
                <div className="alert alert-info mt-3" role="alert">
                  {message}
                </div>
              )}
              <Link
                href="/register"
                style={{
                  color: "#441539",
                  textAlign: "center",
                  marginTop: "10px",
                  display: "block",
                }}
              >
                Register
              </Link>
            </form>
          </div>
        </div>
        {message && <p style={{ color: "red" }}>{message}</p>}
        {/* <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      /> */}
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
    // marginTop: "80px",
  },
  loginContainer: {
    display: "flex",
    width: "600px",
    height: "400px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  leftPane: {
    backgroundColor: "red",
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
  forgotContainer: {
    display: "flex",
    justifyContent: "flex-end",
    // marginBottom: "20px",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#007bff",
    textDecoration: "none",
  },
  loginButton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
};
