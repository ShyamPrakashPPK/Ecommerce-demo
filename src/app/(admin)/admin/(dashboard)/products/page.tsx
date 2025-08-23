

  "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch(
      `/api/admin/products?search=${search}&category=${category}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setProducts(data.products);
    setCategories(data.categories);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search, category]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          onClick={() => router.push("/admin/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border px-3 py-2 rounded-md"
        >
          {[5, 10, 20, 30, 40, 50].map((num) => (
            <option key={num} value={num}>
              {num} / page
            </option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border">Name</th>
              <th className="text-left p-3 border">Category</th>
              <th className="text-left p-3 border">Brand</th>
              <th className="text-left p-3 border">Vendor</th>
              <th className="text-left p-3 border">Price</th>
              <th className="text-left p-3 border">Stock</th>
              <th className="text-left p-3 border">Status</th>
              <th className="text-left p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">{p.brand}</td>
                <td className="p-3 border">{p.vendor}</td>
                <td className="p-3 border">₹{p.price}</td>
                <td className="p-3 border">{p.stock}</td>
                <td className="p-3 border">{p.status}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => router.push(`/admin/products/${p._id}/edit`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Prev
        </button>
        <span className="px-3 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
