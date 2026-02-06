import { Button } from "@/components/ui/button";
import { Check, Star, School } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Monthly Plan",
      price: "₦1,000",
      period: "per student/month",
      description: "Perfect for trying out TLearn",
      features: [
        "Full curriculum access",
        "Video lessons on demand",
        "Progress tracking",
        "Mobile & desktop access",
        "Parent/School dashboard",
      ],
      popular: false,
    },
    {
      name: "Termly Plan",
      price: "₦1,500",
      period: "per student/term",
      description: "Most popular - Save 25%",
      features: [
        "Everything in Monthly",
        "3 months full access",
        "Priority support",
        "Downloadable resources",
        "Performance reports",
        "Certificate of completion",
      ],
      popular: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 bg-secondary/50 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Simple, Affordable Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that works for you. Schools get special bulk
            discounts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card dark:bg-card/40 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border ${
                plan.popular
                  ? "border-success/30 shadow-success/5"
                  : "border-border/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-success text-success-foreground px-6 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-success/20">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-prim tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    /{plan.period.split("/")[1]}
                  </span>
                </div>
              </div>

              <div className="h-px bg-border/50 mb-10" />

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                className={`w-full h-14 rounded-2xl font-bold text-base transition-all ${
                  plan.popular
                    ? "bg-success hover:bg-success/90 text-success-foreground shadow-lg shadow-success/20"
                    : "border-border hover:bg-secondary"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center bg-card dark:bg-card/20 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto shadow-xl border border-border/50">
          <div className="w-16 h-16 bg-prim/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <School className="w-8 h-8 text-prim" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
            School Bulk Discounts Available
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Enrolling multiple students? Contact us for special school pricing
            and custom packages designed for Large institutions.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-10 border-border hover:bg-secondary font-bold"
          >
            Talk to an Expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
