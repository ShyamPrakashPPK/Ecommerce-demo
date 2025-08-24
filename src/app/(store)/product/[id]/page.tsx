"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/store/BreadCrums";

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
  // optional fields if your API supports them; handled defensively
  images?: string[];          // array of image URLs (public paths)
  thumbnail?: string;         // primary image fallback
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`, { cache: "no-store" });
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

  // Build image sources safely
  const gallery = useMemo(() => {
    const imgs = product?.images && product.images.length > 0 ? product.images : [];
    const primary = product?.thumbnail || imgs[0] || "/placeholder.svg";
    const unique = Array.from(new Set([primary, ...imgs])).filter(Boolean);
    return unique;
  }, [product]);

  useEffect(() => {
    if (gallery.length > 0) setActiveImg(gallery[0]);
  }, [gallery]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[420px] w-full bg-gray-100 rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-5 bg-gray-100 rounded w-1/2" />
            <div className="h-24 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-100 rounded w-1/3" />
            <div className="h-10 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="max-w-5xl mx-auto px-4 py-10">Product not found</div>;
  }

  const inStock = (product.stock ?? 0) > 0;
  const stockLabel =
    product.status?.toLowerCase() === "discontinued"
      ? "Discontinued"
      : inStock
      ? "In stock"
      : "Out of stock";

  function decQty() {
    setQty((q) => Math.max(1, q - 1));
  }
  function incQty() {
    setQty((q) => Math.min(99, q + 1));
  }

  return (
    <div className="min-h-screen">
      <div className="pb-10">
        <Breadcrumb
          items={[
            { name: "Products", link: "/products" },
            { name: product.name },
          ]} />
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        

        {/* Header Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div className="relative w-full h-[380px] md:h-[460px] bg-white border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={activeImg || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-3">
                {gallery.map((src) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(src)}
                    className={`relative h-20 bg-white border rounded-xl overflow-hidden hover:shadow-sm ${
                      activeImg === src ? "border-cyan-600" : "border-gray-200"
                    }`}
                    aria-label="Select product image"
                  >
                    <Image
                      src={src}
                      alt="Thumbnail"
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  stockLabel === "Discontinued"
                    ? "bg-gray-100 text-gray-700"
                    : inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stockLabel}
              </span>
              {product.brand ? (
                <span className="text-sm text-gray-500">Brand: {product.brand}</span>
              ) : null}
              {product.vendor ? (
                <span className="text-sm text-gray-500">Vendor: {product.vendor}</span>
              ) : null}
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                ₹{Number(product.price || 0).toLocaleString("en-IN")}
              </p>
              {product.stock > 0 && (
                <p className="mt-1 text-xs text-gray-500">Inclusive of all taxes</p>
              )}
            </div>

            {/* Short description */}
            {product.description ? (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {product.description.length > 220
                  ? product.description.slice(0, 220) + "…"
                  : product.description}
              </p>
            ) : null}

            {/* Qty + Actions */}
            <div className="mt-6 flex items-center gap-4">
              <div className="inline-flex items-center rounded-lg border border-gray-200">
                <button
                  onClick={decQty}
                  className="h-10 w-10 flex items-center justify-center text-lg hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setQty(Number.isFinite(v) ? Math.min(99, Math.max(1, v)) : 1);
                  }}
                  className="h-10 w-14 text-center outline-none"
                />
                <button
                  onClick={incQty}
                  className="h-10 w-10 flex items-center justify-center text-lg hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                disabled={!inStock}
                className={`h-11 px-5 rounded-lg text-white font-medium shadow-sm ${
                  inStock
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>

              <button
                disabled={!inStock}
                className={`h-11 px-5 rounded-lg font-medium border ${
                  inStock
                    ? "border-cyan-600 text-cyan-700 hover:bg-cyan-50"
                    : "border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Meta */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              {product.category && (
                <div>
                  <span className="text-gray-500">Category: </span>
                  <span className="font-medium">{product.category}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">SKU: </span>
                <span className="font-medium">{product._id}</span>
              </div>
              <div>
                <span className="text-gray-500">Vendor: </span>
                <span className="font-medium">{product.vendor || "-"}</span>
              </div>
              <div>
                <span className="text-gray-500">Stock: </span>
                <span className="font-medium">{product.stock ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description and Details */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl">
          <div className="flex border-b border-gray-200">
            <button className="px-5 py-3 text-sm font-medium text-cyan-700 border-b-2 border-cyan-600">
              Description
            </button>
            {/* Add more tabs later if needed */}
          </div>
          <div className="p-5 md:p-6">
            <article className="prose prose-sm max-w-none prose-headings:mb-3 prose-p:my-3 prose-li:my-1">
              {product.description ? (
                <p className="text-gray-700">{product.description}</p>
              ) : (
                <p className="text-gray-500">No description provided.</p>
              )}
            </article>
          </div>
        </div>

        {/* Bottom banner (optional) */}
        <div className="mt-10">
          <div className="relative w-full h-[180px] md:h-[220px] lg:h-[260px] rounded-2xl overflow-hidden">
            <Image
              src={"/banners/3.png"} // replace with your banner
              alt="Promotional banner"
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute left-6 top-6 md:left-8 md:top-8">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                Bulk Orders? Get Special Pricing
              </h3>
              <p className="text-white/90 mt-1 text-sm md:text-base">
                Contact our sales team for enterprise quotes.
              </p>
              <button className="mt-3 h-10 px-4 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
