import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
