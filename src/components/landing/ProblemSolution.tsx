import { Gamepad2, GraduationCap } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 tracking-tight">
            The Screen Time Challenge
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg leading-relaxed">
            Nigerian students spend hours on games and entertainment. What if
            that time built their future instead?
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="bg-card dark:bg-card/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-destructive/5 border-2 border-destructive/10 animate-slide-up">
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6">
                <Gamepad2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive mb-4">
                The Problem
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-destructive">✗</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Hours spent on unproductive games and social media
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-destructive">✗</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Digital distractions competing with homework
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-destructive">✗</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Parents struggling to monitor screen usage
                  </span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div
              className="bg-card dark:bg-card/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-success/5 border-2 border-success/20 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-success mb-4">
                The Solution
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-success">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Transform screen time into structured learning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-success">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    100% curriculum-aligned video lessons
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-success">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Parents track progress and learning hours
                  </span>
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
