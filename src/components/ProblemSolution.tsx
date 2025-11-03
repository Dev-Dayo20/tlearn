import { Gamepad2, GraduationCap } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            The Screen Time Challenge
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Nigerian students spend hours on games and entertainment. What if that time built their future instead?
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="bg-card rounded-xl p-8 shadow-md border-2 border-destructive/20 animate-slide-up">
              <div className="w-16 h-16 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <Gamepad2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive mb-4">The Problem</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Hours spent on unproductive games and social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Digital distractions competing with homework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Parents struggling to monitor screen usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Falling behind in curriculum-based learning</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-card rounded-xl p-8 shadow-lg border-2 border-success animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-success mb-4">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>Transform screen time into structured learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>100% curriculum-aligned video lessons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>Parents track progress and learning hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>Excel academically while using devices productively</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
