import { UserPlus, Video, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Subscribe",
      description: "Choose between individual (₦500/month) or school enrollment. Start your free trial today with no credit card required.",
    },
    {
      number: "02",
      icon: Video,
      title: "Access Curriculum Videos",
      description: "Browse our extensive library of curriculum-aligned video lessons for Primary to SSS levels. Learn from expert educators.",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Learn & Track Progress",
      description: "Students learn at their own pace while parents and schools monitor progress through comprehensive dashboards.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptLTEyIDEydi00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            How TLearn Works
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Get started in three simple steps and transform learning today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                  <div className="w-14 h-14 bg-gradient-success rounded-lg flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-success-foreground" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Arrow (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6L26 16L16 26M26 16H6" stroke="#FFCB05" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
