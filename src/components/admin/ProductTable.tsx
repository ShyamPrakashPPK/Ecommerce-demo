"use client";



const sampleProducts = [
  { id: 1, name: "Safety Helmet", brand: "3M", price: 1200, stock: 50, vendor: "Vendor A", status: "Active" },
  { id: 2, name: "Safety Gloves", brand: "Honeywell", price: 600, stock: 80, vendor: "Vendor B", status: "Active" },
  { id: 3, name: "Safety Shoes", brand: "Karam", price: 2200, stock: 30, vendor: "Vendor C", status: "Inactive" },
];

export default function ProductTable() {
  return (
    <table className="w-full bg-white rounded shadow overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3">Brand</th>
          <th className="p-3">Price</th>
          <th className="p-3">Stock</th>
          <th className="p-3">Vendor</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sampleProducts.map((p) => (
          <tr key={p.id} className="border-t hover:bg-gray-100">
            <td className="p-3">{p.name}</td>
            <td className="p-3">{p.brand}</td>
            <td className="p-3">₹{p.price}</td>
            <td className="p-3">{p.stock}</td>
            <td className="p-3">{p.vendor}</td>
            <td className="p-3">{p.status}</td>
            <td className="p-3 flex gap-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
