import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  GraduationCap,
  Users,
  School,
  DollarSign,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import tlearn from "@/assets/tlearn.png";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const features = [
    {
      title: "For Students",
      description: "Access video lessons and track your progress",
      icon: GraduationCap,
      href: "#target-audience",
    },
    {
      title: "For Parents",
      description: "Monitor learning and manage subscriptions",
      icon: Users,
      href: "#target-audience",
    },
    {
      title: "For Schools",
      description: "Manage students and upload custom content",
      icon: School,
      href: "#target-audience",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <img
              src={tlearn}
              alt="TLearn Logo"
              className="h-12 sm:h-14 lg:h-16 max-w-[140px] sm:max-w-[160px] w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10 hover:text-accent-foreground data-[state=open]:bg-accent/10 transition-colors">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-card/95 backdrop-blur-lg border border-border shadow-2xl">
                      {features.map((feature) => (
                        <li key={feature.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={feature.href}
                              className={cn(
                                "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-accent/10 hover:translate-x-1 focus:bg-accent/10",
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <feature.icon className="h-5 w-5 text-prim" />
                                <div className="text-sm font-semibold leading-none text-foreground">
                                  {feature.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {feature.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a
                    href="#pricing"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
                  >
                    Pricing
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a
                    href="#why-tlearn"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
                  >
                    Why TLearn
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a
                    href="#contact"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
                  >
                    Contact
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-accent/10 transition-colors"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-accent" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-bold px-6 shadow-md shadow-accent/10"
                onClick={() => (window.location.href = "#target-audience")}
              >
                Join Now
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-accent" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-border"
              >
                <nav className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-prim/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-prim" />
                      </div>
                      <span className="text-xl font-bold tracking-tight">
                        TLearn
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                        Features
                      </p>
                      {features.map((feature) => (
                        <a
                          key={feature.title}
                          href={feature.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-start gap-3 rounded-xl p-3 hover:bg-accent/10 transition-all active:scale-95 border border-transparent hover:border-accent/10"
                        >
                          <div className={`p-2 rounded-lg bg-prim/5`}>
                            <feature.icon className="h-5 w-5 text-prim" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {feature.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {feature.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="h-px bg-border/50 mx-2" />

                    <div className="space-y-1">
                      {[
                        {
                          icon: DollarSign,
                          label: "Pricing",
                          href: "#pricing",
                        },
                        {
                          icon: GraduationCap,
                          label: "Why TLearn",
                          href: "#why-tlearn",
                        },
                        { icon: Users, label: "Contact", href: "#contact" },
                      ].map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent/10 transition-all active:scale-95"
                        >
                          <div className="p-2 rounded-lg bg-secondary">
                            <item.icon className="h-5 w-5 text-foreground/70" />
                          </div>
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </a>
                      ))}
                    </div>

                    <Button
                      variant="default"
                      className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold py-6 shadow-lg shadow-accent/20"
                      onClick={() => setIsOpen(false)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
