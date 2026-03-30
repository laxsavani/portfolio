import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/hooks/use-smooth-scroll';

const navItems = [
  { name: 'Home',     id: 'home' },
  { name: 'About',    id: 'about' },
  { name: 'Skills',   id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Resume',   id: 'resume' },
  { name: 'Contact',  id: 'contact' },
];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('home');

  // Throttled scroll listener via RAF
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Scrolled state
        const scrollY = window.scrollY;
        setIsScrolled((prev) => {
          const next = scrollY > 50;
          return prev !== next ? next : prev;
        });

        // Active section detection
        const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
        let current = 'home';
        for (const section of sections) {
          if (scrollY >= section.offsetTop - 120) {
            current = section.id;
          }
        }
        setActiveSection((prev) => (prev !== current ? current : prev));

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    scrollToSection(id, -80);
    setIsMobileMenuOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((v) => !v), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav rounded-b-2xl md:top-4 md:left-6 md:right-6 md:rounded-2xl shadow-[0_10px_30px_hsl(var(--accent)/0.15)]'
          : 'bg-transparent pt-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="cursor-pointer focus:outline-none"
          >
            <span className={`text-xl md:text-2xl font-serif font-bold transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}>
              Lax<span className="text-gradient">Savani</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors duration-200 hover:text-accent focus:outline-none ${
                  activeSection === item.id
                    ? 'text-accent'
                    : isScrolled
                      ? 'text-foreground/80 hover:bg-muted'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none ${
              isScrolled
                ? 'text-foreground hover:bg-muted'
                : 'text-primary-foreground hover:bg-primary-foreground/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden glass-nav border-t border-border/30 rounded-b-2xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 rounded-lg cursor-pointer font-medium text-left transition-colors duration-200 focus:outline-none ${
                    activeSection === item.id
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground/80 hover:text-accent hover:bg-muted'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
