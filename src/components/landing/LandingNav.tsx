import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const LandingNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['overview', 'features', 'how-it-works', 'compatibility', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-12 left-0 right-0 z-[8000] px-4 sm:px-6 transition-all duration-300">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-soft border border-charcoal-100/80 py-3 px-5'
            : 'bg-white/60 backdrop-blur-xs py-4 px-6 border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="focus:outline-none">
            <BrandLogo showSubtitle={true} />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'compatibility', label: 'Compatibility' },
              { id: 'faq', label: 'FAQ' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-sage-700 bg-sage-50 font-semibold'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-ivory-200/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-charcoal-700 hover:text-charcoal-900 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/parent"
              className="px-4 py-2 text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl shadow-subtle hover:shadow-soft transition-all flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-700 hover:text-charcoal-900 hover:bg-ivory-200 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-ivory-300 flex flex-col gap-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'compatibility', label: 'Compatibility' },
              { id: 'faq', label: 'FAQ' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === item.id
                    ? 'text-sage-700 bg-sage-50 font-semibold'
                    : 'text-charcoal-600 hover:bg-ivory-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-ivory-300 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 text-sm font-semibold text-charcoal-700 bg-ivory-200 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/parent"
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-sage-600 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
