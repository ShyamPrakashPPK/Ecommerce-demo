"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { label: "All Products", href: "/products" },
  { label: "Safety Helmets", href: "/products?category=helmets" },
  { label: "Respirators", href: "/products?category=respirators" },
  { label: "Gloves", href: "/products?category=gloves" },
  { label: "Welding Helmets", href: "/products?category=welding-helmets" },
  { label: "Eye Protection", href: "/products?category=eye-protection" },
  { label: "Ear Protection", href: "/products?category=ear-protection" },
  { label: "Safety Shoes", href: "/products?category=safety-shoes" },
];

export default function CategoriesBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="container">
        <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
          {categories.map((c) => {
            const active = pathname.startsWith("/products") && c.label === "All Products";
            return (
              <Link
                key={c.href}
                href={c.href}
                className={[
                  "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm",
                  active ? "border-brand-600 text-brand-700 bg-brand-50" : "hover:bg-slate-50",
                ].join(" ")}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
