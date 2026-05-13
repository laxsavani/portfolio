import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { FiAward } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollProgress((totalScroll / windowHeight) * 100);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[101]"
      style={{
        width: `${scrollProgress}%`,
        background: 'linear-gradient(to right, var(--accent), var(--accent2))',
      }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
  const [firstName, lastName] = resumeData.name.split(' ');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar (Isolated for performance) */}
      <ScrollProgressBar />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center relative">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-syne font-extrabold text-[1.4rem] cursor-pointer"
          >
            <Link to="hero" smooth={true} duration={500}>
              <span className="text-text">{firstName} </span>
              <span className="text-accent">{lastName}</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="font-sans text-[0.85rem] uppercase tracking-[0.1em] text-muted cursor-pointer relative group transition-colors hover:text-text"
                activeClass="text-accent active-link"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full group-[.active-link]:w-full" />
              </Link>
            ))}

            {/* Certifications — separate page */}
            <button
              onClick={() => navigate('/certifications')}
              className="flex items-center gap-1.5 font-sans text-[0.85rem] uppercase tracking-[0.1em] text-muted cursor-pointer relative group transition-colors hover:text-accent"
            >
              <FiAward className="text-sm" />
              Certs
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            <a
              href="/Resume.pdf"
              download
              className="border border-accent text-accent px-5 py-2 rounded font-sans text-sm tracking-wide transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Toggle - Absolutely Positioned to avoid Flexbox overflow */}
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 lg:hidden flex items-center justify-center text-3xl text-accent p-2 rounded-md hover:bg-accent/10 transition-colors z-[9999]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-bg/95 backdrop-blur-[20px] flex flex-col justify-start pt-28 pb-10 overflow-y-auto items-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="font-syne text-3xl text-muted uppercase tracking-wider hover:text-accent cursor-pointer"
                  activeClass="text-accent"
                >
                  {link}
                </Link>
              </motion.div>
            ))}

            {/* Certifications in mobile menu */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              <button
                onClick={() => { setIsOpen(false); navigate('/certifications'); }}
                className="font-syne text-3xl text-muted uppercase tracking-wider hover:text-accent cursor-pointer flex items-center gap-3"
              >
                <FiAward />
                Certs
              </button>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (navLinks.length + 1) * 0.08 }}
              href="/Resume.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="border border-accent text-accent px-8 py-3 rounded font-sans text-lg tracking-wide transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
