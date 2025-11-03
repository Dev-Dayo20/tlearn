import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptLTEyIDEydi00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6 animate-scale-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Start Your Free Trial Today</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Ready to Start Learning?
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Join 1000+ students already transforming their screen time into academic excellence. 
            Try TLearn free for 7 days - no credit card required.
          </p>

          <div className="bg-card rounded-2xl p-8 shadow-2xl max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-12 text-base"
                />
                <Button variant="success" size="lg" className="group whitespace-nowrap">
                  Get Started Free
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                🎁 <strong>Free 7-day trial</strong> • No credit card required • Cancel anytime
              </p>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/80">
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
