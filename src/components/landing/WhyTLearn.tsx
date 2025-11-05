import { DollarSign, BookCheck, Shield, BarChart3, Users, Clock } from "lucide-react";

const WhyTLearn = () => {
  const advantages = [
    {
      icon: DollarSign,
      title: "Most Affordable",
      description: "At ₦500/month, TLearn is Nigeria's most affordable EdTech platform without compromising quality.",
    },
    {
      icon: BookCheck,
      title: "100% Curriculum-Aligned",
      description: "Every lesson follows the Nigerian curriculum precisely - from Primary 1 to SSS 3.",
    },
    {
      icon: Shield,
      title: "Reduces Digital Distractions",
      description: "Replace unproductive screen time with structured, educational content that builds futures.",
    },
    {
      icon: BarChart3,
      title: "School Admin Dashboards",
      description: "Comprehensive management tools for schools to track students and upload custom content.",
    },
    {
      icon: Users,
      title: "Parent Progress Tracking",
      description: "Parents get full visibility into their child's learning journey and achievements.",
    },
    {
      icon: Clock,
      title: "Learn Anytime, Anywhere",
      description: "24/7 access to quality education on any device - no internet limitations after download.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose TLearn?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just another EdTech platform. Here's what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border group hover:border-success animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                <advantage.icon className="w-6 h-6 text-success" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTLearn;
