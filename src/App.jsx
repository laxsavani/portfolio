import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Certifications from './pages/Certifications';

/* ── Cursor Glow ── */
const CursorGlow = () => {
  const glowRef = React.useRef(null);
  
  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

/* ── Page Loader ── */
const PageLoader = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: '-100%' }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    className="fixed inset-0 z-[999] bg-bg flex items-center justify-center"
  >
    <div className="w-16 h-16 border-4 border-surface border-t-accent rounded-full animate-spin" />
  </motion.div>
);

/* ── Main single-page portfolio ── */
const PortfolioHome = () => {
  /* Scroll to hash section when navigating from another page (e.g. /#contact) */
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400); // wait for page to render
    }
  }, []);

  return (
    <div className="bg-bg text-text font-sans min-h-screen w-full relative selection:bg-accent selection:text-white overflow-x-hidden">
      <CursorGlow />
      <AnimatePresence>
        <PageLoader key="loader" />
      </AnimatePresence>

      <div className="relative z-10">
        <Navbar />
        <main>
          <div id="hero"><Hero /></div>
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
};

/* ── Routes ── */
function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/certifications" element={<Certifications />} />
    </Routes>
  );
}

export default App;
