"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
];


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="flex items-center justify-center gap-4 p-4 text-2xl font-bold">
        <Image src="/logo.svg" alt="ZedExel" width={32} height={32} />Admin
      </div>
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
