import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scroll-utils";
import logoPath from "@assets/HayTree_Web_Services_LLC_Green_1755799665804.png";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'Services', href: 'services' },
    { label: 'Process', href: 'process' },
    { label: 'Testimonials', href: 'testimonials' },
    { label: 'Tools', href: 'tools' },
  ];

  const handleNavClick = (href: string) => {
    smoothScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          isScrolled 
            ? 'bg-white backdrop-blur-md border-gray-200' 
            : 'bg-white backdrop-blur-sm border-white/20'
        }`}
        data-testid="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src={logoPath} 
                alt="HayTree Web Services Logo" 
                className="h-10 w-auto"
                data-testid="nav-logo"
              />
              <span className="text-xl font-bold text-[var(--dark-navy)]">HayTree</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-[var(--tree-green)] transition-colors font-medium"
                  data-testid={`nav-link-${item.href}`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick('contact')}
                className="bg-[var(--tree-green)] text-white hover:bg-[var(--accent-green)] transition-colors"
                data-testid="nav-contact-button"
              >
                Contact
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-[var(--tree-green)]"
                data-testid="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white backdrop-blur-md border-t border-gray-200" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[var(--tree-green)] hover:bg-gray-50 rounded-md font-medium"
                  data-testid={`mobile-nav-link-${item.href}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left px-3 py-2 text-[var(--tree-green)] font-semibold hover:bg-gray-50 rounded-md"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
