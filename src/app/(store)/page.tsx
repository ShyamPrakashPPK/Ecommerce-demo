"use client";

import { useState, useEffect } from "react";
import ProductsGrid from "@/components/store/ProductGrid";
import FullBanner from "@/components/store/FullBanner";
import CategoriumMosaic from "@/components/store/CategoriumMosaic";
import FeaturedProducts from "@/components/store/FeaturedProducts";

export default function HomePage() {
  const widgetDetails = {
    view: {
      viewCount: { mobile: 2, tablet: 3, desktop: 5 },
    },
  };

  const categories = [
    {
      id: 1,
      name: "Safety Helmets",
      image:
        "https://d3rbxgeqn1ye9j.cloudfront.net/media/image/88/f6/4b/9897479sKTmnmgdchk2H_540x540.jpg",
      href: "/products?category=Safety&sort=latestUpdated&page=1&limit=8",
    },
    {
      id: 2,
      name: "Respirators",
      image:
        "https://image.made-in-china.com/2f0j00QjEhSwfggHpK/Safety-Harmful-Chemical-Industry-Worker-Safety-Half-Face-Respirator-Half-Face-Gas-Mask.webp",
      href: "/products?category=Safety&sort=latestUpdated&page=1&limit=8",
    },
    {
      id: 3,
      name: "Gloves",
      image: "/banners/3.png", // local example
      href: "/products?category=Safety&sort=latestUpdated&page=1&limit=8",
    },
    {
      id: 4,
      name: "Robotics",
      image: "/banners/4.png",
      href: "/products?category=Safety&sort=latestUpdated&page=1&limit=8",
    },
  ];

  return (
    <main className="">
      {/* Banner Slider */}
<FullBanner/>

<div className="px-4">
        <h2 className="text-2xl font-bold mb-6 mt-10">Shop by Category</h2>
        <CategoriumMosaic categories={categories} view={widgetDetails.view} />
      </div>

      
        {/* Featured Products Carousel */}
        <div className="px-4">
        <FeaturedProducts />
        </div>
    </main>
  );
}
