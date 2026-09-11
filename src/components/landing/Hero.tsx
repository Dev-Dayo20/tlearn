import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-hero dark:bg-gradient-hero-dark overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptLTEyIDEydi00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Decorative Blur Shapes - Light Theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prim/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 dark:hidden" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 dark:hidden" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/20 dark:bg-accent/10 rounded-full backdrop-blur-sm border border-accent/20">
              <span className="text-sm font-semibold text-accent">
                🎓 Nigeria's Most Affordable EdTech
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-foreground mb-6 leading-tight tracking-tight">
              Transform Screen Time Into{" "}
              <span className="text-accent drop-shadow-sm">Learning Time</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 dark:text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curriculum-aligned digital learning for Primary to Senior
              Secondary School students. Turn unproductive hours into
              educational excellence.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-10 justify-center lg:justify-start">
              {/* <div className="flex items-center gap-2 bg-white/5 dark:bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 dark:border-border">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold text-white dark:text-foreground text-sm">
                  ₦1000/month
                </span>
              </div> */}
              <div className="flex items-center gap-2 bg-white/5 dark:bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 dark:border-border">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold text-white dark:text-foreground text-sm">
                  Curriculum-Aligned
                </span>
              </div>
              {/* <div className="flex items-center gap-2 bg-white/5 dark:bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 dark:border-border">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold text-white dark:text-foreground text-sm">
                  1000+ Students
                </span>
              </div> */}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 rounded-full font-bold shadow-lg shadow-accent/20"
                onClick={() => navigate("/get-started")}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-scale-in flex justify-center lg:justify-end">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-2xl rounded-3xl"></div>
            <div className="relative p-2 bg-white/10 dark:bg-card/20 backdrop-blur-md rounded-3xl border border-white/20 dark:border-border/50 shadow-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="Diverse African students engaged with digital learning on tablets"
                className="relative rounded-2xl shadow-lg w-full max-w-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
