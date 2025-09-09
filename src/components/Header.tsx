import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const WingIcon = () => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M2 18C2 18 4 16 8 14C12 12 16 10 20 8C22 7 23 6 24 5C23 6 22 8 20 10C18 12 14 14 10 16C6 18 2 18 2 18Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M2 14C2 14 4 12 8 10C12 8 16 6 20 4C22 3 23 2 24 1C23 2 22 4 20 6C18 8 14 10 10 12C6 14 2 14 2 14Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M2 10C2 10 4 8 8 6C12 4 16 2 20 0C22 -1 23 -2 24 -3C23 -2 22 0 20 2C18 4 14 6 10 8C6 10 2 10 2 10Z"
      fill="currentColor"
      opacity="0.4"
    />
  </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-background via-background to-secondary/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo - Mobile First */}
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
          <WingIcon />
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
                    <WingIcon />
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