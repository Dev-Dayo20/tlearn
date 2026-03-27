import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-secondary dark:bg-gradient-hero-dark relative overflow-hidden">
      {/* Decorative Blur Shapes */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-prim/10 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground dark:text-foreground mb-6 tracking-tight leading-tight">
            Ready to Revolutionize Learning in Your Institution?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/get-started")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl font-bold py-7 px-10 text-lg shadow-xl shadow-accent/20 transition-all hover:scale-105"
            >
              Join TLearn Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/get-started")}
              className="border-primary/20 text-primary bg-primary/5 backdrop-blur-md hover:bg-primary/10 rounded-2xl font-bold py-7 px-10 text-lg transition-all dark:border-border dark:text-foreground"
            >
              School Partnerships
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-success">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success font-bold">✓</span>
              </div>
              <span className="font-medium">Full Curriculum Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success font-bold">✓</span>
              </div>
              <span className="font-medium">All Learning Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <span className="text-success font-bold">✓</span>
              </div>
              <span className="font-medium">Premium Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
