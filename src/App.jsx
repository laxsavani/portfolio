import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
};

const PageLoader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[999] bg-bg flex items-center justify-center"
    >
      <div className="w-16 h-16 border-4 border-surface border-t-accent rounded-full animate-spin"></div>
    </motion.div>
  );
};

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-bg text-text font-sans min-h-screen relative selection:bg-accent selection:text-white">
      <CursorGlow />
      <AnimatePresence>
        <PageLoader key="loader" />
      </AnimatePresence>
      
      <div className="relative z-10">
        <Navbar scrollProgress={scrollProgress} />
        
        <main>
          <div id="hero"><Hero /></div>
          
          {/* Section Divider - diagonal cut or wave? using simple border for now or nothing since bg alternates */}
          <div id="about"><About /></div>
          <div id="skills"><Skills /></div>
          <div id="experience"><Experience /></div>
          <div id="projects"><Projects /></div>
          <div id="education"><Education /></div>
          <div id="contact"><Contact /></div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
