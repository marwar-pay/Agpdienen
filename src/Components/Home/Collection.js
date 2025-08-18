// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { apiGet } from "@/api/apiMethods";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// import img from "../../assets/pinkcityimg/images/1.jpg";
// import img1 from "../../assets/pinkcityimg/images/2.jpg";
// import img2 from "../../assets/pinkcityimg/images/3.jpg";
// import img3 from "../../assets/pinkcityimg/images/4.jpg";
// import img4 from "../../assets/pinkcityimg/images/5.jpg";
// import img5 from "../../assets/pinkcityimg/images/6.jpg";
// import img6 from "../../assets/pinkcityimg/images/7.png";
// import img7 from "../../assets/pinkcityimg/images/8.jpg";

// const CollectionList = () => {
//   const [categories, setCategories] = useState([]);
//   const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

//   const fetchCategories = async () => {
//     try {
//       const response = await apiGet(`api/website/${referenceWebsite}`);
//       if (response) {
//         setCategories(response.data?.website?.categories || []);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Local images
//   const localImages = [img3, img1, img2, img4, img5, img, img7, img6];

//   return (
//     <div className="container my-5">
//       <h2 className="text-center fw-bold mb-4">Shop by Category</h2>

//       <Swiper
//         modules={[Autoplay]}
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         loop={true}
//         spaceBetween={20}
//         breakpoints={{
//           320: { slidesPerView: 4 }, // ✅ 4 cards in mobile
//           576: { slidesPerView: 4 },
//           768: { slidesPerView: 4 },
//           992: { slidesPerView: 5 },
//           1200: { slidesPerView: 6 },
//         }}
//       >
//         {categories.length > 0 ? (
//           categories.map((category, index) => (
//             <SwiperSlide key={index}>
//               <Link
//                 href={`/products/allproducts?category=${category._id}`}
//                 className="text-decoration-none"
//               >
//                 <div className="text-center category-card">
//                   <div className="circle-img mx-auto">
//                     <Image
//                       src={localImages[index % localImages.length]}
//                       alt={category.name}
//                       fill
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                   <h6 className="mt-3 fw-semibold text-dark">
//                     {category.name}
//                   </h6>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))
//         ) : (
//           <p className="text-center w-100">Loading categories...</p>
//         )}
//       </Swiper>

//       <style>{`
//         .circle-img {
//           position: relative;
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           overflow: hidden;
//           box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .circle-img:hover {
//           transform: scale(1.05);
//           box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
//         }

//         .category-card h6 {
//           font-size: 14px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CollectionList;




"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/api/apiMethods";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Shop by Category</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 4 },
          576: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/products/allproducts?category=${category._id}`}
                className="text-decoration-none"
              >
                <div className="text-center category-card">
                  <div className="circle-img mx-auto">
                    <Image
                      src={category.image || "/placeholder.jpg"} // ✅ API image
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h6 className="mt-3 fw-semibold text-dark">
                    {category.name}
                  </h6>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center w-100">Loading categories...</p>
        )}
      </Swiper>

      <style>{`
        .circle-img {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .circle-img:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
        }

        .category-card h6 {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default CollectionList;




