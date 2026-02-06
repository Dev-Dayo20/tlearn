import {
  DollarSign,
  BookCheck,
  Shield,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";

const WhyTLearn = () => {
  const advantages = [
    {
      icon: DollarSign,
      title: "Most Affordable",
      description:
        "At ₦500/month, TLearn is Nigeria's most affordable EdTech platform without compromising quality.",
    },
    {
      icon: BookCheck,
      title: "100% Curriculum-Aligned",
      description:
        "Every lesson follows the Nigerian curriculum precisely - from Primary 1 to SSS 3.",
    },
    {
      icon: Shield,
      title: "Reduces Digital Distractions",
      description:
        "Replace unproductive screen time with structured, educational content that builds futures.",
    },
    {
      icon: BarChart3,
      title: "School Admin Dashboards",
      description:
        "Comprehensive management tools for schools to track students and upload custom content.",
    },
    {
      icon: Users,
      title: "Parent Progress Tracking",
      description:
        "Parents get full visibility into their child's learning journey and achievements.",
    },
    {
      icon: Clock,
      title: "Learn Anytime, Anywhere",
      description:
        "24/7 access to quality education on any device - no internet limitations after download.",
    },
  ];

  return (
    <section id="why-tlearn" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
          Why Nigerian Institutions Choose TLearn
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed">
          We combine local curriculum expertise with world-class technology to
          deliver a truly native learning experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "NERDC Aligned",
              description: "100% compliant with the Nigerian curriculum.",
            },
            {
              title: "Low Data Mode",
              description: "Optimized video compression for data efficiency.",
            },
            {
              title: "Expert Teachers",
              description: "Lessons delivered by top national educators.",
            },
            {
              title: "Scalable Tech",
              description: "Reliable platform that grows with your school.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-secondary/50 dark:bg-card/40 backdrop-blur-sm border border-border/50 hover:shadow-xl transition-all animate-fade-in group"
            >
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-prim transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTLearn;
