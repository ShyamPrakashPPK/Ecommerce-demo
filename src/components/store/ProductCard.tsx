import Image from "next/image";

type ProductCardProps = {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  vendor?: string;
  category?: string;
  imageUrl?: string;
};

export default function ProductCard(props: ProductCardProps) {
  const { name, price, stock, vendor, category, imageUrl } = props;
  const inStock = typeof stock === "number" ? stock > 0 : Boolean(stock);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow">
      <div className="relative w-full aspect-[4/3] bg-white">
        <div className="absolute top-2 left-2 z-10 text-xs font-bold text-red-600 bg-white/90 px-1.5 py-0.5 rounded">
          {vendor || "Brand"}
        </div>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-3"
        />
      </div>
      <div className="px-3 pb-3">
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
        <button className="w-full mt-3 bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700">
          Send Enquiry
        </button>
      </div>
    </div>
  );
}
