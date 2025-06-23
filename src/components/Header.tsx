
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  config: any;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!config) return null;

  const { company, header } = config;
  const navLinks = header?.navigation || [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src={company.logo} alt={company.name} className="w-12 h-12" />
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                {company.name}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center space-x-8 transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}>
            {navLinks.map((link: any, index: number) => (
              <Link
                key={index}
                to={link.href}
                className={`font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t bg-white/95 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link: any, index: number) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`font-medium transition-colors px-4 ${
                    location.pathname === link.href
                      ? 'text-amber-600'
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" className="px-4">
                <Button className="bg-amber-600 hover:bg-amber-700 w-fit">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
