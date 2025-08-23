export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Total Products: 20</div>
        <div className="p-4 bg-white rounded shadow">Out of Stock: 5</div>
        <div className="p-4 bg-white rounded shadow">Vendors: 4</div>
      </div>
    </div>
  );
}


