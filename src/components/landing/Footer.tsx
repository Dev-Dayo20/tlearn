import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import tlearn from "@/assets/tlearn.png";
import tlearnWhite from "@/assets/tlearnWhite.png";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  const resources = [
    { label: "FAQs", href: "#faqs" },
    { label: "Contact Support", href: "#contact" },
    { label: "Blog", href: "#blog" },
    { label: "Curriculum Guide", href: "#curriculum" },
  ];

  const forSchools = [
    { label: "School Pricing", href: "#school-pricing" },
    { label: "Bulk Enrollment", href: "#bulk" },
    { label: "Admin Dashboard", href: "#dashboard" },
    { label: "Case Studies", href: "#cases" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#facebook", label: "Facebook" },
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Instagram, href: "#instagram", label: "Instagram" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-hero dark:bg-gradient-hero-dark relative overflow-hidden text-white dark:text-foreground border-t border-white/10 dark:border-border/50">
      {/* Decorative Blur Shapes */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-prim/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={tlearnWhite}
                alt="TLearn Logo"
                className="h-16 sm:h-14 lg:h-16 max-w-[180px] w-auto object-contain transition-transform hover:scale-105"
              />
            </div>
            <p className="text-white/70 dark:text-muted-foreground mb-8 max-w-sm leading-relaxed text-sm md:text-base">
              Nigeria's most affordable EdTech platform, transforming screen
              time into productive learning for students from Primary to SSS.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/80 dark:text-muted-foreground group">
                <div className="p-2 bg-white/10 dark:bg-card/40 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a
                  href="mailto:info@tlearn.ng"
                  className="hover:text-accent transition-colors"
                >
                  info@tlearn.ng
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80 dark:text-muted-foreground group">
                <div className="p-2 bg-white/10 dark:bg-card/40 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <a
                  href="tel:+2341234567890"
                  className="hover:text-accent transition-colors"
                >
                  +234 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80 dark:text-muted-foreground group">
                <div className="p-2 bg-white/10 dark:bg-card/40 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-bold text-lg mb-6 text-white dark:text-foreground tracking-tight underline decoration-accent/30 decoration-2 underline-offset-8">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 dark:text-muted-foreground hover:text-accent transition-all hover:translate-x-1 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-bold text-lg mb-6 text-white dark:text-foreground tracking-tight underline decoration-accent/30 decoration-2 underline-offset-8">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 dark:text-muted-foreground hover:text-accent transition-all hover:translate-x-1 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Schools */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-bold text-lg mb-6 text-white dark:text-foreground tracking-tight underline decoration-accent/30 decoration-2 underline-offset-8">
              For Schools
            </h3>
            <ul className="space-y-3">
              {forSchools.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 dark:text-muted-foreground hover:text-accent transition-all hover:translate-x-1 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 dark:border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-white/40 dark:text-muted-foreground/60 order-3 md:order-1">
            © {new Date().getFullYear()} TLearn. All rights reserved.
          </div>

          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 bg-white/5 dark:bg-card/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 dark:border-border/50 hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-black/5 group"
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>

          <div className="flex gap-6 text-sm order-2 md:order-3">
            <a
              href="#privacy"
              className="text-white/40 dark:text-muted-foreground/60 hover:text-accent transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-white/40 dark:text-muted-foreground/60 hover:text-accent transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
