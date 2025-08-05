'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/Layout/Header";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
const router = useRouter();
  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
    toast.success("Item removed from wishlist!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const handleViewDetails = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <>
    <Header/>
    <div className="container my-5">
      <h1 className="text-center mb-4">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="row">
          {wishlist.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card" style={{height:'100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px',}}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="card-img-top"
                  // width={300}
                //   height={300}
                  style={{ width:'100%'}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text"><strong>Price:</strong> ₹{product.actualPrice}</p>
                  <p className="card-text"><strong>Description:</strong> {product.description || "No description available"}</p>
                  {product.rating && (
                    <p className="card-text">
                      <strong>Rating:</strong> {product.rating} / 5
                    </p>
                  )}
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                    <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleViewDetails(product._id)}
                >
                  View Details
                </Button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Your wishlist is empty!</p>
      )}
    </div>
    </>
  );
}
