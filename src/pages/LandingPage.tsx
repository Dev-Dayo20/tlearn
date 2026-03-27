import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import HowItWorks from "@/components/landing/HowItWorks";
import SocialProof from "@/components/landing/SocialProof";
import TargetAudience from "@/components/landing/TargetAudience";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <TargetAudience />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
