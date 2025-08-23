"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  vendor: string;
  stock: number;
  status: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-bold text-green-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
