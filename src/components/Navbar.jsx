import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { resumeData } from '../data/resumeData';

const Navbar = ({ scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['about', 'skills', 'experience', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [firstName, lastName] = resumeData.name.split(' ');

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[101]"
        style={{ 
          width: `${scrollProgress}%`,
          background: 'linear-gradient(to right, var(--accent), var(--accent2))' 
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-400 ease-in-out ${
          isScrolled 
            ? 'bg-surface/90 backdrop-blur-[20px] border-b border-border py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
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
          <div className="hidden md:flex items-center space-x-8">
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
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full group-[.active-link]:w-full"></span>
              </Link>
            ))}
            <a 
              href="/Resume.pdf" 
              download
              className="border border-accent text-accent px-5 py-2 rounded font-sans text-sm tracking-wide transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-2xl text-text cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RiCloseLine /> : <RiMenuLine />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-bg/95 backdrop-blur-[20px] flex flex-col justify-center items-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
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
            <motion.a
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              href="/Resume.pdf"
              download
              className="border border-accent text-accent px-8 py-3 rounded font-sans text-lg tracking-wide transition-all duration-300 hover:bg-accent hover:text-white"
              onClick={() => setIsOpen(false)}
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
