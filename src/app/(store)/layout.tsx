import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
