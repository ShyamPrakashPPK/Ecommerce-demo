"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);
    router.push("/admin/products");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        ✏️ Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter product name"
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Price</label>
            <input
              type="number"
              value={form.price || 0}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              placeholder="Enter price"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Stock</label>
            <input
              type="number"
              value={form.stock || 0}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
              placeholder="Enter stock quantity"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Category & Vendor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <input
              type="text"
              value={form.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Enter category"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Vendor</label>
            <input
              type="text"
              value={form.vendor || ""}
              onChange={(e) => handleChange("vendor", e.target.value)}
              placeholder="Enter vendor"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter product description"
            rows={4}
            className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
