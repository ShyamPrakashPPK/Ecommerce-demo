"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, LogIn } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/products?search=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="container flex items-center gap-3 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">S</span>
          <span className="text-lg font-semibold tracking-tight md:text-xl">SafetyHub</span>
        </Link>

        {/* Search */}
        <form onSubmit={onSubmit} className="mx-auto hidden w-full max-w-2xl items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm md:flex">
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

        {/* Auth */}
        <Link
          href="/login"
          className="ml-auto inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50 md:ml-0"
        >
          <LogIn className="size-4" />
          <span>Login</span>
        </Link>
      </div>

      {/* Mobile search */}
      <div className="container pb-3 md:hidden">
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
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
    </header>
  );
}
