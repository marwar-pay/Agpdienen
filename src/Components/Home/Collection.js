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
  const localImages = [ img3, img1, img2, img4,img5,img,img7,img6];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={index}>
              <Link
                href={`/products/allproducts?category=${category._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="text-center">
                  {/* Circular image */}
                  <div
                    className="mx-auto mb-2"
                    style={{
                      width: "120px",
                      height: "120px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      border: "1px solid #eee", background: "linear-gradient(to right, #e3b7a3, #a5cec7)",
                    }}
                  >
                    <Image
                      src={localImages[index % localImages.length]}
                      alt={category.name}
                      width={120}
                      height={120}
                      className="img-fluid object-fit-cover"
                      priority
                    />
                  </div>
                  {/* Category name */}
                  <h6 className="text-capitalize fw-semibold" style={{ fontSize: "14px" }}>
                    {category.name}
                  </h6>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center w-100">Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
