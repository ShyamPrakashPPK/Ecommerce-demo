"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-2xl font-bold border-b">Admin Panel</div>
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-md ${
              pathname === link.href ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
