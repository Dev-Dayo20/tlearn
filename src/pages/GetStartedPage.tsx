import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  School,
  Users,
  Building,
  GraduationCap,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const GetStartedPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for now
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Request received! Our onboarding team will contact you shortly.",
      );
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactPhone = "+234 708 692 8592";
  const contactEmail = "hello@tlearn.ng"; // Placeholder email as discussed

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Let's Get You Set Up on TLearn
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We personalize the onboarding process to ensure you get exactly
              what you need. Choose your path below to connect with our team.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="bg-card dark:bg-card/40 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl p-6 md:p-10 lg:p-12 animate-slide-up">
            <Tabs defaultValue="schools" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10 h-14 bg-secondary/50 p-1">
                <TabsTrigger
                  value="schools"
                  className="rounded-xl font-bold text-base data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md transition-all h-full"
                >
                  <School className="w-5 h-5 mr-2" />
                  For Schools
                </TabsTrigger>
                <TabsTrigger
                  value="parents"
                  className="rounded-xl font-bold text-base data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md transition-all h-full"
                >
                  <Users className="w-5 h-5 mr-2" />
                  For Parents
                </TabsTrigger>
              </TabsList>

              {/* Schools Tab */}
              <TabsContent value="schools" className="mt-0">
                <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
                  {/* Form Side */}
                  <div className="md:col-span-3">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Building className="w-6 h-6 text-primary" />
                        Partner with TLearn
                      </h2>
                      <p className="text-muted-foreground">
                        Equip your entire school with curriculum-aligned content
                        and management dashboards. Fill this form and we'll set
                        up a demo.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="schoolName">School Name *</Label>
                          <Input
                            id="schoolName"
                            required
                            placeholder="e.g. Oxford Academy"
                            className="bg-secondary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Person *</Label>
                          <Input
                            id="contactName"
                            required
                            placeholder="Your full name"
                            className="bg-secondary/30"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="you@school.com"
                            className="bg-secondary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            placeholder="+234 ..."
                            className="bg-secondary/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your school size or specific needs..."
                          className="resize-none h-24 bg-secondary/30"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-14 rounded-xl font-bold text-lg bg-primary hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Request Demo"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 w-5 h-5" />
                        )}
                      </Button>
                    </form>
                  </div>

                  {/* Direct Contact Side */}
                  <div className="md:col-span-2 space-y-8">
                    <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                      <h3 className="font-bold text-lg mb-4">Direct Contact</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Need immediate assistance? Reach out to our admissions
                        team directly.
                      </p>

                      <div className="space-y-4">
                        <a
                          href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                          className="flex items-center gap-4 p-4 rounded-xl bg-background hover:border-primary border border-transparent transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Call Us
                            </p>
                            <p className="font-semibold group-hover:text-primary transition-colors">
                              {contactPhone}
                            </p>
                          </div>
                        </a>

                        <a
                          href={`mailto:${contactEmail}`}
                          className="flex items-center gap-4 p-4 rounded-xl bg-background hover:border-primary border border-transparent transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Email Us
                            </p>
                            <p className="font-semibold group-hover:text-primary transition-colors">
                              {contactEmail}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Parents / Students Tab */}
              <TabsContent value="parents" className="mt-0">
                <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
                  {/* Form Side */}
                  <div className="md:col-span-3">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-accent" />
                        Start Learning Today
                      </h2>
                      <p className="text-muted-foreground">
                        Get structured, affordable, and distraction-free
                        learning at just ₦500/month. Request your child's
                        account below.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="parentName">
                            Parent/Guardian Name *
                          </Label>
                          <Input
                            id="parentName"
                            required
                            placeholder="Your full name"
                            className="bg-secondary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentPhone">Phone Number *</Label>
                          <Input
                            id="parentPhone"
                            type="tel"
                            required
                            placeholder="+234 ..."
                            className="bg-secondary/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentEmail">Email Address *</Label>
                        <Input
                          id="parentEmail"
                          type="email"
                          required
                          placeholder="you@email.com"
                          className="bg-secondary/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentGrade">
                          Child's Class/Grade *
                        </Label>
                        <Input
                          id="studentGrade"
                          required
                          placeholder="e.g. Primary 4, JSS 2"
                          className="bg-secondary/30"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-14 rounded-xl font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90 mt-4 shadow-lg shadow-accent/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Request Setup"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 w-5 h-5" />
                        )}
                      </Button>
                    </form>
                  </div>

                  {/* WhatsApp Priority Side */}
                  <div className="md:col-span-2 space-y-8">
                    <div className="bg-gradient-to-br from-success/10 to-transparent rounded-2xl p-6 border border-success/20">
                      <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mb-4">
                        <MessageCircle className="w-6 h-6 text-success" />
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">
                        Fastest Way: WhatsApp
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        Skip the form and chat directly with our onboarding team
                        on WhatsApp. We typically set up student accounts in
                        under 10 minutes.
                      </p>

                      <a
                        href={`https://wa.me/${contactPhone.replace(/\s+/g, "").replace("+", "")}?text=Hi%20TLearn!%20I%20would%20like%20to%20set%20up%20an%20account%20for%20my%20child.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-12 bg-success hover:bg-success/90 text-success-foreground rounded-xl font-bold transition-all shadow-lg shadow-success/20"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Simple Process Footer */}
          <div className="mt-16 text-center grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-border/50 pt-16">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto text-muted-foreground font-bold">
                1
              </div>
              <h4 className="font-bold">Reach Out</h4>
              <p className="text-sm text-muted-foreground">
                Fill the form or message us.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto text-muted-foreground font-bold">
                2
              </div>
              <h4 className="font-bold">We Setup</h4>
              <p className="text-sm text-muted-foreground">
                Our team configures your account perfectly.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto text-muted-foreground font-bold">
                3
              </div>
              <h4 className="font-bold">Start Learning</h4>
              <p className="text-sm text-muted-foreground">
                Log in and access the full curriculum.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetStartedPage;
