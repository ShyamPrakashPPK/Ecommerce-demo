"use client";

import { useState, useEffect } from "react";
import ProductsGrid from "@/components/store/ProductGrid";

const dummyProducts = [
  {
    id: "1",
    name: "3M Speedglas Welding Helmet",
    price: 120,
    oldPrice: 150,
    stock: 5,
    category: "Safety Equipment",
    vendor: "3M",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "MSA V-Gard Hard Hat",
    price: 45,
    stock: 0,
    category: "Safety Helmet",
    vendor: "MSA",
    imageUrl: "https://via.placeholder.com/150",
  },
  // ...add more dummy products
];

const banners = [
  "https://via.placeholder.com/1200x400?text=Banner+1",
  "https://via.placeholder.com/1200x400?text=Banner+2",
  "https://via.placeholder.com/1200x400?text=Banner+3",
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner Slider */}
      <div className="w-full h-64 sm:h-96 overflow-hidden rounded-xl shadow-md mb-8">
        <img
          src={banners[currentBanner]}
          alt="Banner"
          className="w-full h-full object-cover transition-all"
        />
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-bold">Featured Products</h2>
      {/* <ProductsGrid products={dummyProducts} /> */}
    </main>
  );
}
