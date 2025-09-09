import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PotentillaIcon = () => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    {/* Potentilla flower with 5 petals in fluorescent pink */}
    <circle cx="12" cy="10" r="2" fill="hsl(320, 100%, 75%)" opacity="0.9" />
    <ellipse cx="12" cy="6" rx="2.5" ry="3" fill="hsl(330, 100%, 70%)" opacity="0.8" />
    <ellipse cx="16.5" cy="8.5" rx="2.5" ry="3" fill="hsl(325, 100%, 72%)" opacity="0.8" transform="rotate(72 16.5 8.5)" />
    <ellipse cx="15" cy="13.5" rx="2.5" ry="3" fill="hsl(315, 100%, 68%)" opacity="0.8" transform="rotate(144 15 13.5)" />
    <ellipse cx="9" cy="13.5" rx="2.5" ry="3" fill="hsl(335, 100%, 74%)" opacity="0.8" transform="rotate(216 9 13.5)" />
    <ellipse cx="7.5" cy="8.5" rx="2.5" ry="3" fill="hsl(310, 100%, 70%)" opacity="0.8" transform="rotate(288 7.5 8.5)" />
    {/* Stem in natural green */}
    <path d="M12 12 L12 18" stroke="hsl(120, 60%, 50%)" strokeWidth="2" opacity="0.7" />
    {/* Small leaves in green */}
    <path d="M10 14 Q8 15 10 16" stroke="hsl(130, 50%, 45%)" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M14 14 Q16 15 14 16" stroke="hsl(130, 50%, 45%)" strokeWidth="1.5" fill="none" opacity="0.6" />
  </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-background via-background to-secondary/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - Mobile First */}
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
          <PotentillaIcon />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              Discover
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground -mt-1">
              your best self
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/services/therapy"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Individual Therapy</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Personalized one-on-one sessions for your mental health journey
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/services/group"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Group Therapy</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Connect with others on similar journeys in a supportive environment
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/insurance" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Insurance
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  About Us
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Contact Us
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/resources" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Resources
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Actions + Hamburger Menu */}
        <div className="flex items-center space-x-2">
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              Patient Login
            </Button>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              New Patients
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <PotentillaIcon />
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-primary">
                        Discover
                      </span>
                      <span className="text-xs text-muted-foreground -mt-1">
                        your best self
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <div className="space-y-1">
                    <Link
                      to="/services"
                      className="flex items-center px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                    <Link
                      to="/insurance"
                      className="flex items-center px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Insurance
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/resources"
                      className="flex items-center px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Resources
                    </Link>
                  </div>
                </nav>

                {/* Mobile Action Buttons */}
                <div className="space-y-3 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => setIsOpen(false)}
                  >
                    Patient Login
                  </Button>
                  <Button 
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    New Patients
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;