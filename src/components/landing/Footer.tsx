import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

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
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                <span className="text-success-foreground font-bold text-xl">TL</span>
              </div>
              <span className="text-2xl font-bold">TLearn</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-sm">
              Nigeria's most affordable EdTech platform, transforming screen time into productive learning for students from Primary to SSS.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@tlearn.ng" className="hover:text-accent transition-colors">
                  info@tlearn.ng
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <a href="tel:+2341234567890" className="hover:text-accent transition-colors">
                  +234 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Schools */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Schools</h3>
            <ul className="space-y-2">
              {forSchools.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} TLearn. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-success hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
