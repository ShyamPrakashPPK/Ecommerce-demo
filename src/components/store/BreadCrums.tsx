"use client";

import Link from "next/link";
import { Home } from "lucide-react";

type Crumb = {
  name: string;
  link?: string; // if not given, render as plain text
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="bg-gray-200 p-4 text-sm text-gray-700">
      <div className="container mx-auto flex items-center px-[10%]">
        <Link href="/" className="flex items-center hover:text-gray-800">
          <Home className="w-4 h-4" />
          <span className="ml-1">Home</span>
        </Link>

        {items.map((item, idx) => (
          <span key={idx} className="flex items-center">
            <span className="mx-2">/</span>
            {item.link ? (
              <Link
                href={item.link}
                className="hover:text-gray-800 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium">{item.name}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
