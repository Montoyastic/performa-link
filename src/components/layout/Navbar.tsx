
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the dashboard or any authenticated route
  const isAuthRoute = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/employee') || 
                     location.pathname.includes('/manager');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isAuthRoute || mobileMenuOpen
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PerformPlus
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {!isAuthRoute ? (
              <>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}>
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
                  }`}>
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/contact" ? "text-primary" : "text-muted-foreground"
                  }`}>
                  Contact
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant="default" 
                    className="ml-4 shadow-sm hover:shadow transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                  }`}>
                  Dashboard
                </Link>
                <Link 
                  to="/employee/portal" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/employee") ? "text-primary" : "text-muted-foreground"
                  }`}>
                  Employee Portal
                </Link>
                <Link 
                  to="/manager/portal" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname.includes("/manager") ? "text-primary" : "text-muted-foreground"
                  }`}>
                  Manager Portal
                </Link>
                <Link to="/">
                  <Button 
                    variant="outline" 
                    className="ml-4 shadow-sm hover:shadow transition-all"
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-10 w-10 p-0"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 py-5 space-y-4 bg-white dark:bg-gray-900">
            {!isAuthRoute ? (
              <>
                <Link
                  to="/"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/dashboard"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employee/portal"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Employee Portal
                </Link>
                <Link
                  to="/manager/portal"
                  className="block text-sm font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manager Portal
                </Link>
                <Link
                  to="/"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
