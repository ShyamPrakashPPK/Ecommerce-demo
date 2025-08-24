"use client";

import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string | number;
  name: string;
  image: string;
  href: string;
};

type CategoriumMosaicProps = {
  categories: Category[];
  view?: {
    viewCount: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  };
};

export default function CategoriumMosaic({
  categories,
  view = {
    viewCount: { mobile: 2, tablet: 4, desktop: 4 },
  },
}: CategoriumMosaicProps) {
  return (
    <div
      className={`
        
        grid gap-4
        grid-cols-${view.viewCount.mobile}
        sm:grid-cols-${view.viewCount.tablet}
        lg:grid-cols-${view.viewCount.desktop}
      `}
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.href}
          className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Category Image */}
          <div className="relative h-40 w-full">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-2 px-3 text-center text-sm font-semibold group-hover:bg-black/70 transition-colors">
            {cat.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
