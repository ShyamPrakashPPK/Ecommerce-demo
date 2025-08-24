// app/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  vendor?: string;
  category?: string;
  imageUrl?: string;
};

// Map vendor names to logo base filenames (without extension)
const VENDOR_LOGOS: Record<string, string> = {
  honeywell: "honeywell",
  ansell: "ansell",
  msa: "msa",
  bosch: "bosch",
  makita: "makita",
  "kimberly-clark": "kimberly-clark", // corrected spelling
  "kimberly clark": "kimberly-clark",
  cimberly: "kimberly-clark", // optional guard if your data has this typo
  caterpillar: "caterpillar",
  uvex: "uvex",
  dewalt: "dewalt",
  "3m": "3M",
  "3M": "3M",
};

function normalizeVendor(v?: string) {
  if (!v) return "";
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

function getVendorLogoPath(vendor?: string): { src: string; alt: string } | null {
  const norm = normalizeVendor(vendor);
  if (!norm) return null;

  // Try exact, then hyphenated
  const key = VENDOR_LOGOS[norm] ?? VENDOR_LOGOS[norm.replace(/\s/g, "-")];
  if (!key) return null;

  // Prefer SVG, fall back to PNG (ensure files exist in /public/vendors)
  // You can simplify to a single extension if all logos share the same type.
  // Note: Next/Image with public files can be referenced by absolute path.
  const svgPath = `/vendors/${key}.svg`;
  const pngPath = `/vendors/${key}.png`;

  // Heuristic: return SVG first; if you don't have SVGs, swap to PNG
  return { src: svgPath, alt: vendor ?? key };
}

export default function ProductCard(props: ProductCardProps) {
  const { _id, name, price, stock, vendor, category, imageUrl } = props;
  const inStock = typeof stock === "number" ? stock > 0 : Boolean(stock);
  const productHref = `/product/${_id}`;

  const vendorLogo = getVendorLogoPath(vendor);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow flex flex-col h-full">
      {/* Clickable image area */}
      <Link href={productHref} className="relative block w-full aspect-[4/3] bg-white">
        {/* Vendor tag */}
        <div className="absolute top-2 left-2 z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/95  px-2 py-1">
            {vendorLogo ? (
              <>
                <Image
                  src={vendorLogo.src}
                  alt={vendorLogo.alt}
                  width={40}
                  height={40}
                  className="object-contain"
                  // If you only have PNGs, you can add unoptimized for local raster assets if needed:
                  // unoptimized
                />
              </>
            ) : (
              <span className="text-xs font-bold text-gray-800">{vendor || "Brand"}</span>
            )}
          </div>
        </div>

        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-3"
          priority={false}
        />
      </Link>

      {/* Content area with flex-grow to push button to bottom */}
      <div className="px-3 pb-3 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-medium line-clamp-2 mt-2">{name}</h3>
          <div className="text-xs text-gray-500 mt-1">Category: {category || "—"}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="font-semibold">${Number(price).toFixed(2)}</div>
            <div
              className={`text-xs px-2 py-0.5 rounded ${
                inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </div>

        {/* Clickable button - always at bottom */}
        <Link
          href={productHref}
          className="block w-full mt-3 bg-cyan-600 text-white rounded-md py-2 text-center font-medium hover:bg-cyan-700 transition-colors"
        >
          Send Enquiry
        </Link>
      </div>
    </div>
  );
}
