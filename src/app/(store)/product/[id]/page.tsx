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

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Vendor: {product.vendor}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <p className="text-sm text-gray-500">Status: {product.status}</p>
        </div>
      </div>
    </div>
  );
}
