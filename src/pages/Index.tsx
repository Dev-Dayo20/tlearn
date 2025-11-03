import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import WhyTLearn from "@/components/WhyTLearn";
import SocialProof from "@/components/SocialProof";
import TargetAudience from "@/components/TargetAudience";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing />
      <WhyTLearn />
      <TargetAudience />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
