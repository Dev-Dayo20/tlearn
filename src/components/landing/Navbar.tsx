import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";
import tlearn from "@/assets/tlearn.png";
import tlearnWhite from "@/assets/tlearnWhite.png";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={theme === "dark" ? tlearnWhite : tlearn}
              alt="TLearn Logo"
              className="h-12 sm:h-14 lg:h-16 max-w-[140px] sm:max-w-[160px] w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center gap-6">
              <Link
                to="/features"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
              >
                Features
              </Link>

              <Link
                to="/pricing"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
              >
                Pricing
              </Link>

              <Link
                to="/why-tlearn"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-prim focus:outline-none"
              >
                Why TLearn
              </Link>
            </div>

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
                onClick={() => navigate("/get-started")}
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
                    <div className="space-y-1">
                      {[
                        {
                          icon: LayoutDashboard,
                          label: "Features",
                          to: "/features",
                        },
                        {
                          icon: DollarSign,
                          label: "Pricing",
                          to: "/pricing",
                        },
                        {
                          icon: GraduationCap,
                          label: "Why TLearn",
                          to: "/why-tlearn",
                        },
                        // { icon: Users, label: "Contact", to: "/contact" },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent/10 transition-all active:scale-95"
                        >
                          <div className="p-2 rounded-lg bg-secondary">
                            <item.icon className="h-5 w-5 text-foreground/70" />
                          </div>
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Button
                      variant="default"
                      className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold py-6 shadow-lg shadow-accent/20"
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/get-started");
                      }}
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
