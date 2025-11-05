import { useState } from "react";
import { GraduationCap, Users, School } from "lucide-react";

const TargetAudience = () => {
  const [activeTab, setActiveTab] = useState("students");

  const tabs = [
    { id: "students", label: "For Students", icon: GraduationCap },
    { id: "parents", label: "For Parents", icon: Users },
    { id: "schools", label: "For Schools", icon: School },
  ];

  const content = {
    students: {
      title: "Empower Your Learning Journey",
      description: "Take control of your education with engaging video lessons that make learning fun and effective.",
      benefits: [
        "Access thousands of curriculum-aligned video lessons",
        "Learn at your own pace, anytime, anywhere",
        "Track your progress and celebrate achievements",
        "Interactive quizzes and assessments",
        "Earn certificates as you complete modules",
        "Mobile and desktop learning experience",
      ],
    },
    parents: {
      title: "Invest in Your Child's Future",
      description: "Give your child the gift of quality education at Nigeria's most affordable price.",
      benefits: [
        "Monitor your child's learning progress in real-time",
        "Ensure productive screen time with curriculum content",
        "Affordable at just ₦500/month or ₦1,500/term",
        "Receive detailed progress reports",
        "Support academic excellence from home",
        "Free trial to see results before subscribing",
      ],
    },
    schools: {
      title: "Transform Your Institution",
      description: "Equip your school with cutting-edge EdTech tools that enhance teaching and learning.",
      benefits: [
        "Comprehensive student management dashboard",
        "Upload and manage custom educational content",
        "Track performance across all enrolled students",
        "Bulk enrollment with special pricing",
        "Generate institutional performance reports",
        "Integration with existing school systems",
      ],
    },
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Built for Every Stakeholder
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how TLearn serves your unique needs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-success text-success-foreground shadow-success scale-105"
                    : "bg-card text-muted-foreground hover:bg-card/80"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {activeContent.title}
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            {activeContent.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {activeContent.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50"
              >
                <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success text-sm">✓</span>
                </div>
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
