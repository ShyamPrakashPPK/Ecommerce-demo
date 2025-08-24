"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  vendor?: string;
  category?: string;
  imageUrl?: string;
  images?: string[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch featured products with proper query parameters
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Use query parameters to get featured products, sorted by latest updated, limited to 15 for smooth looping
        const res = await fetch("/api/products?sort=latestUpdated&limit=15");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        
        // Handle the API response structure properly
        const productsData = data.products || [];
        
        // Normalize the data to ensure imageUrl is available
        const normalizedProducts = productsData.map((product: any) => ({
          ...product,
          imageUrl: product.imageUrl || (Array.isArray(product.images) && product.images[0]) || "/placeholder.svg"
        }));
        
        setProducts(normalizedProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Show 5 products per slide
  const itemsPerSlide = 5;
  const maxIndex = Math.max(0, Math.ceil(products.length / itemsPerSlide) - 1);

  const prev = () => setIndex((i) => i === 0 ? maxIndex : i - 1);
  const next = () => setIndex((i) => i === maxIndex ? 0 : i + 1);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (products.length <= itemsPerSlide) return; // Don't auto-advance if no need

    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, maxIndex]);

  if (loading) {
    return (
      <div className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
              <div className="w-full aspect-[4/3] bg-gray-200"></div>
              <div className="px-4 py-4">
                <div className="h-4 bg-gray-200 rounded mt-2"></div>
                <div className="h-3 bg-gray-200 rounded mt-2"></div>
                <div className="flex items-center justify-between mt-3">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
        </div>
        <div className="text-center py-12 text-gray-500">
          No featured products available at the moment.
        </div>
      </div>
    );
  }

  // Get current slide products
  const currentProducts = products.slice(index * itemsPerSlide, (index + 1) * itemsPerSlide);

  return (
    <div className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        {products.length > itemsPerSlide && (
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {currentProducts.map((product) => (
          <div key={product._id} className="w-full">
            <ProductCard 
              _id={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              vendor={product.vendor}
              category={product.category}
              imageUrl={product.imageUrl}
            />
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {products.length > itemsPerSlide && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                i === index 
                  ? 'bg-blue-600 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
