'use client'
export default function AdminNavbar() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
      className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      Logout
    </button>    </header>
  );
}
  