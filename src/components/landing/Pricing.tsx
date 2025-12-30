import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Monthly Plan",
      price: "₦1000",
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
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works for you. Schools get special bulk discounts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in ${
                plan.popular ? "border-2 border-success" : "border border-border"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-success text-success-foreground px-4 py-1 rounded-full flex items-center gap-1 shadow-success">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period.split('/')[1]}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "success" : "outline"}
                size="lg"
                className="w-full"
              >
                Start Free Trial
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center bg-card rounded-xl p-8 max-w-3xl mx-auto shadow-md border border-border">
          <h3 className="text-xl font-bold text-foreground mb-2">School Bulk Discounts Available</h3>
          <p className="text-muted-foreground mb-4">
            Enrolling multiple students? Contact us for special school pricing and custom packages.
          </p>
          <Button variant="outline" size="lg">
            Contact for School Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
