import { BookOpen, School, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "For Students",
      description: "Access curriculum-aligned video lessons anytime, anywhere. Track your progress, learn at your own pace, and excel in your studies.",
      benefits: ["Video lessons on demand", "Progress tracking", "Self-paced learning", "Mobile & desktop access"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: School,
      title: "For Schools",
      description: "Empower your institution with comprehensive student management, performance monitoring, and custom content upload capabilities.",
      benefits: ["Student management dashboard", "Performance analytics", "Upload custom content", "Bulk enrollment"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: "For Parents",
      description: "Affordable, structured learning with complete visibility. Monitor your child's progress and ensure productive screen time.",
      benefits: ["Affordable pricing (₦500/month)", "Progress visibility", "Curriculum alignment", "Learning reports"],
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Built for Everyone in the Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            TLearn serves students, schools, and parents with tailored features for each role in education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`${feature.color} mt-0.5`}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
