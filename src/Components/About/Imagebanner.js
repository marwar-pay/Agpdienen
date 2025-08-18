import { useEffect, useState } from "react";
import Image from "next/image";
import { apiGet } from "@/api/apiMethods";

export default function ImagePage() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await apiGet("/api/banner/about");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBanner(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <div style={{ textAlign: "center" }}>
      {/* Banner Image */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image
          src={banner.imageUrl}
          alt="Banner Image"
          width={1200}
          height={600}
        />
      </div>

      {/* Text from API (with HTML formatting) */}
      {/* <div
        style={{ marginTop: "20px" }}
        dangerouslySetInnerHTML={{ __html: banner.altText }}
      /> */}
    </div>
  );
}
