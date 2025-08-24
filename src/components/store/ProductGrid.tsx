import ProductCard from "./ProductCard";

type Product = {
    _id: string;
    name: string;
    price: number;
    oldPrice?: number;
    stock: number;
    category: string;
    vendor: string;
    brand: string;
    imageUrl: string;
  };
  
export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
