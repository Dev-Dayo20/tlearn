import { Quote } from "lucide-react";

const SocialProof = () => {
  const stats = [
    { value: "25+", label: "Schools Partnered" },
    { value: "1000+", label: "Active Students" },
    { value: "5000+", label: "Hours of Learning" },
    { value: "95%", label: "Student Satisfaction" },
  ];

  const testimonials = [
    {
      quote: "TLearn has completely transformed how our students engage with learning. The curriculum alignment is perfect, and the pricing makes it accessible to all families.",
      author: "Mrs. Adebayo",
      role: "Principal, Lagos Model Secondary School",
    },
    {
      quote: "My daughter now asks to use her tablet for TLearn instead of games. Her grades have improved significantly in just one term!",
      author: "Mr. Okonkwo",
      role: "Parent of SSS 2 Student",
    },
    {
      quote: "As a teacher, I love that I can track my students' progress and upload supplementary materials. It's a game-changer for education.",
      author: "Miss Chioma",
      role: "Mathematics Teacher, Abuja",
    },
  ];

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptLTEyIDEydi00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-12">
            What People Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Quote className="w-10 h-10 text-accent mb-4" />
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-bold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
