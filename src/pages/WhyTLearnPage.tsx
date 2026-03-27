import Navbar from "@/components/landing/Navbar";
import WhyTLearn from "@/components/landing/WhyTLearn";
import Footer from "@/components/landing/Footer";

const WhyTLearnPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <WhyTLearn />
      </main>
      <Footer />
    </div>
  );
};

export default WhyTLearnPage;
