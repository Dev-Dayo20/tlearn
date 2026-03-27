import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
