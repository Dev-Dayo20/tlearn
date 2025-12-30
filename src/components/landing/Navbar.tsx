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
} from "lucide-react";
import { cn } from "@/lib/utils";
import tlearn from "@/assets/tlearn.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <img
              src={tlearn}
              alt="TLearn Logo"
              className="h-14 sm:h-16 max-w-[160px] w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <li key={feature.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={feature.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <feature.icon className="h-5 w-5 text-primary" />
                                <div className="text-sm font-medium leading-none">
                                  {feature.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Pricing
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a
                    href="#why-tlearn"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Why TLearn
                  </a>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <a
                    href="#contact"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Contact
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* <Button variant="success" size="sm">
              Start Free Trial
            </Button> */}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a href="#" className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-primary">TLearn</span>
                </a>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground px-2">
                      Features
                    </p>
                    {features.map((feature) => (
                      <a
                        key={feature.title}
                        href={feature.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-3 rounded-md p-2 hover:bg-accent transition-colors"
                      >
                        <feature.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors"
                  >
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">Pricing</span>
                  </a>

                  <a
                    href="#why-tlearn"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors"
                  >
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">Why TLearn</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors"
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">Contact</span>
                  </a>
                  {/* 
                  <Button
                    variant="success"
                    className="w-full mt-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Free Trial
                  </Button> */}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
