"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, LogIn, ShoppingBag } from "lucide-react";

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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/products?search=${encodeURIComponent(q.trim())}`);
  }

  const isProductsPath = pathname.startsWith("/products");

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      {/* Top bar (logo, search, auth/actions) */}
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center gap-3 py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight md:text-xl">
              SafetyHub
            </span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={onSubmit}
            className="mx-auto hidden w-full max-w-2xl items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm md:flex"
          >
            <Search className="size-5 opacity-60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search helmets, respirators, gloves, welding…"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Search
            </button>
          </form>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              <LogIn className="size-4" />
              <span>Login</span>
            </Link>

            {/* Cart (optional, mirrors the reference image’s right icon) */}
            <Link
              href="/cart"
              className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-slate-50 md:inline-flex"
            >
              <ShoppingBag className="size-4" />
              <span>Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm"
          >
            <Search className="size-5 opacity-60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Categories bar */}
      <nav className="border-t border-gray-200 bg-white/95">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
            {categories.map((c) => {
              const active = isProductsPath && c.label === "All Products";
              
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={[
                    "whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
