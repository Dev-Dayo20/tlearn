import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptLTEyIDEydi00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">
                🎓 Nigeria's Most Affordable EdTech
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Transform Screen Time Into{" "}
              <span className="text-accent">Learning Time</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Curriculum-aligned digital learning for Primary to Senior
              Secondary School students. Turn unproductive hours into
              educational excellence.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mb-10 justify-center lg:justify-start text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold">₦1000/month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold">Curriculum-Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold">1000+ Active Students</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Button variant="success" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button> */}
              {/* <Button
                className="bg-accent text-black border-2 border-white hover:scale-105 transition-transform hover:bg-primary/5 hover:text-white"
                size="lg"
                onClick={() => {
                  navigate("/super-admin/login");
                }}
              >
                Schools - Learn More
              </Button> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-2xl rounded-3xl"></div>
            <img
              src={heroImage}
              alt="Diverse African students engaged with digital learning on tablets"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
