import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/api/apiMethods";

import img from "../../assets/pinkcityimg/images/1.jpg";
import img1 from "../../assets/pinkcityimg/images/2.jpg";
import img2 from "../../assets/pinkcityimg/images/3.jpg";
import img3 from "../../assets/pinkcityimg/images/4.jpg";
import img4 from "../../assets/pinkcityimg/images/5.jpg";
import img5 from "../../assets/pinkcityimg/images/6.jpg";
import img6 from "../../assets/pinkcityimg/images/7.png";
import img7 from "../../assets/pinkcityimg/images/8.jpg";

const CollectionList = () => {
  const [categories, setCategories] = useState([]);
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Local images to loop through
  const localImages = [img3, img1, img2, img4, img5, img, img7, img6];

  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-10"
              key={index}
            >
              <Link
                href={`/products/allproducts?category=${category._id}`}
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 shadow-sm hover-card"
                  style={{
                    borderRadius: "12px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    className="position-relative"
                    style={{
                      height: "160px",
                      overflow: "hidden",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  >
                    <Image
                      src={localImages[index % localImages.length]}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body text-center p-3">
                    <h6
                      className="fw-semibold text-dark mb-0"
                      style={{ fontSize: "14px" }}
                    >
                      {category.name}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center w-100">Loading categories...</p>
        )}
      </div>

      {/* Hover Effect Styles */}
      <style jsx>{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
};

export default CollectionList;
