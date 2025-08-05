"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Header from "@/Layout/Header";
import { CheckCircle, Loader, XCircle } from "lucide-react";

export default function ThankYou() {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderStatus, setOrderStatus] = useState("processing");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`https://ajay.yunicare.in/api/order/orders/${orderId}`);
        const orderData = response.data.order;
        setOrderStatus(orderData.status);
        setPaymentStatus(orderData.paymentStatus);
      } catch (error) {
        console.error("Error fetching order status:", error);
        setPaymentStatus("failed");
      }
    };

    fetchOrderStatus();

    const intervalId = setInterval(() => {
      if (paymentStatus !== "completed" || paymentStatus !== "failed") {
        fetchOrderStatus();
      } else {
        clearInterval(intervalId);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [orderId, orderStatus]);

  // Redirect to home after 15 sec if payment status is completed or failed
  useEffect(() => {
    if (paymentStatus === "completed" || paymentStatus === "failed") {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 15000); // 15 sec

      return () => clearTimeout(timeoutId);
    }
  }, [paymentStatus, router]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6  text-center" >
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full">
          {paymentStatus === "processing" && (
            <div className="flex flex-col items-center">
              <Loader className="animate-spin text-blue-500 w-16 h-16" />
              <h2 className="text-xl font-semibold mt-4">Processing Your Order...</h2>
              <p className="text-gray-500">Please wait while we confirm your purchase.</p>
            </div>
          )}

          {paymentStatus === "completed" && (
            <div className="flex flex-col items-center text-green-600">
              <CheckCircle className="w-16 h-16" />
              <h2 className="text-xl font-bold mt-4">Order Successful!</h2>
              <p className="text-gray-600">Thank you for your purchase. Your order will be shipped soon.</p>
              {/* <p className="text-sm text-gray-500">Redirecting to home in 15 seconds...</p> */}
            </div>
          )}

          {paymentStatus === "failed" && (
            <div className="flex flex-col items-center text-red-500">
              <XCircle className="w-16 h-16" />
              <h2 className="text-xl font-bold mt-4">Order Failed</h2>
              <p className="text-gray-600">Something went wrong. Please try again or contact support.</p>
              {/* <p className="text-sm text-gray-500">Redirecting to home in 15 seconds...</p> */}
            </div>
          )}
          {paymentStatus === "pending" && (
  <div className="flex flex-col items-center text-yellow-500">
    <Loader className="animate-spin text-yellow-500 w-16 h-16" />
    <h2 className="text-xl font-bold mt-4">Order Pending</h2>
    <p className="text-gray-600">Your payment is still pending. Please wait or contact support if the issue persists.</p>
    {/* <p className="text-sm text-gray-500">Redirecting to home in 15 seconds...</p> */}
  </div>
)}


          <div className="mt-6 text-lg">
            <p className="font-semibold">Payment Status: <span className="text-blue-600">{paymentStatus}</span></p>
            <p className="font-semibold">Order Status: <span className="text-blue-600">{orderStatus}</span></p>
          </div>

          <Link href="/" className="mt-6 inline-block bg-danger text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">Return to Home</Link>
        </div>
      </div>
    </>
  );
}
