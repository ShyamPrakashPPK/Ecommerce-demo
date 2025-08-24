"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const imageOptions = [
    "https://static.vecteezy.com/system/resources/thumbnails/046/407/589/small/yellow-helmet-cap-isolated-on-transparent-background-free-png.png",
    "https://d3rbxgeqn1ye9j.cloudfront.net/media/image/88/f6/4b/9897479sKTmnmgdchk2H_540x540.jpg",
    "https://image.made-in-china.com/2f0j00QjEhSwfggHpK/Safety-Harmful-Chemical-Industry-Worker-Safety-Half-Face-Respirator-Half-Face-Gas-Mask.webp",
  ] as const;

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    vendor: "",
    status: "active",
    description: "",
    images: [] as string[],
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          price: String(data.price ?? ""),
          stock: String(data.stock ?? ""),
          category: data.category || "",
          vendor: data.vendor || "",
          status: data.status || "active",
          description: data.description || "",
          images: data.images || [],
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((f) => ({ ...f, images: selected }));
  };

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category.trim(),
      vendor: form.vendor.trim(),
      status: form.status,
      description: form.description.trim(),
      images: form.images,
    };

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (res.ok) {
      router.push("/admin/products");
    } else {
      const { error } = await res.json().catch(() => ({ error: "Failed to update product" }));
      alert(error || "Failed to update product");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">✏️ Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-2xl shadow-md border"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              name="price"
              type="number"
              inputMode="decimal"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              name="stock"
              type="number"
              inputMode="numeric"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Category & Vendor now text inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vendor</label>
            <input
              name="vendor"
              type="text"
              value={form.vendor}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* ✅ Multi-select for images */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Images</label>
          <select
            multiple
            size={3}
            name="images"
            value={form.images}
            onChange={handleImageChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            {imageOptions.map((img, idx) => (
              <option key={idx} value={img}>
                {img}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Tip: Hold <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> to select multiple.
          </p>

          {form.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`Selected ${idx}`}
                    className="h-24 w-full object-cover rounded-md border shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full w-6 h-6 text-xs hover:bg-gray-50"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
