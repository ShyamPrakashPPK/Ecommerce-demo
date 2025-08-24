'use client'
export default function AdminNavbar() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4"></div>
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
  