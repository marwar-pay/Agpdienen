import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/api/apiMethods";

import img from "../../assets/pinkcityimg/images/1.jpg";
import img1 from "../../assets/pinkcityimg/images/2.jpg";
import img2 from "../../assets/pinkcityimg/images/3.jpg";
import img3 from "../../assets/pinkcityimg/images/4.jpg";
import img4 from "../../assets/pinkcityimg/images/5.jpg";

const CollectionList = () => {
  const [categories, setCategories] = useState([]);
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Array of local images
  const localImages = [img, img1, img2, img3, img4];

  return (
    <div className="container my-5 ">
      <div className="row">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div className="col-lg-2 col-md-2 col-sm-6 mb-4" key={index}>
              <div className=" h-100 text-center border-0 shadow-sm">
                <div className="">
                  <Link href={`/products/allproducts?category=${category._id}`} passHref className="d-block">
                    <div className="image-wrapper">
                      <Image
                        src={localImages[index % localImages.length]} // Cycle through local images
                        alt={category.name}
                        width={200}
                        height={200}
                        className="rounded-circle img-fluid mx-auto zoom-effect"
                        priority
                      />
                    </div>
                  </Link>
                  <h3 className="mt-3" style={{ fontSize: "14px", fontWeight: "600" }}>
                    <Link href={`/products/allproducts?category=${category._id}`} className="text-decoration-none text-dark">
                      {category.name}
                    </Link>
                  </h3>
                </div>
              </div>
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
