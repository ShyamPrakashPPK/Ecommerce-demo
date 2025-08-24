import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
