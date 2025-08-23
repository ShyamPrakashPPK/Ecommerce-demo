"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  vendor: string;
  image: string;
};

const DUMMY: Product[] = [
  {
    id: "p1",
    name: "3M Speedglas Welding Helmet",
    price: 299.0,
    category: "Welding Helmets",
    vendor: "3M",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "MSA V-Gard Safety Helmet",
    price: 34.0,
    category: "Safety Helmets",
    vendor: "MSA",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "3M 6200 Half-Face Respirator",
    price: 42.0,
    category: "Respirators",
    vendor: "3M",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a6b0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Coated Grip Gloves (Pair)",
    price: 9.99,
    category: "Gloves",
    vendor: "SafeHands",
    image:
      "https://images.unsplash.com/photo-1624711492029-8b8b9c6f8d09?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Polycarbonate Safety Glasses",
    price: 12.5,
    category: "Eye Protection",
    vendor: "ProGuard",
    image:
      "https://images.unsplash.com/photo-1580894742760-6ede441c98f6?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProductSlider() {
  const [index, setIndex] = useState(0);

  // show 1 item on mobile, 2 on md, 3 on lg — compute at render
  const visibleCount = useMemo(() => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % DUMMY.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // compute visible slice
  function getVisible() {
    const items: Product[] = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(DUMMY[(index + i) % DUMMY.length]);
    }
    return items;
  }

  const visible = getVisible();

  return (
    <section className="container my-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-semibold md:text-2xl">Trending Products</h2>
        <div className="text-sm text-slate-500">Auto-rotates every 3s</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article
            key={p.id}
            className="group rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md"
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            <div className="space-y-1 p-2">
              <h3 className="line-clamp-2 text-sm font-medium md:text-base">{p.name}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{p.category}</span>
                <span>•</span>
                <span>{p.vendor}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-semibold">${p.price.toFixed(2)}</span>
                <button className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
                  Send Enquiry
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* tiny dots for feedback */}
      <div className="mt-4 flex justify-center gap-2">
        {DUMMY.map((_, i) => {
          const active = i === index;
          return (
            <span
              key={i}
              className={[
                "h-1.5 w-1.5 rounded-full transition",
                active ? "bg-brand-600 scale-110" : "bg-slate-300",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
