import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { FiGithub, FiLinkedin, FiMail, FiArrowLeft } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

/* ─── Cursor Glow ─── */
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
        background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

/*
  NAV_ITEMS for the Certifications page navbar.
  Section links go to /#hash so the browser navigates to
  the home page and scrolls to the correct section anchor.
  '/certifications' is the only real separate route.
*/
const NAV_ITEMS = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact', href: '/#contact' },
];

/* ─── Shared Navbar (used on Certifications page) ─── */
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

const PageNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, lastName] = resumeData.name.split(' ');

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      {/* Scroll progress bar (Isolated) */}
      <ScrollProgressBar />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-5 md:py-6'
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand → back to home */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="font-syne font-extrabold text-[1.4rem] cursor-pointer"
          >
            <span className="text-text">{firstName} </span>
            <span className="text-accent">{lastName}</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              /* Use <a> with href so browser navigates to home + scrolls to hash */
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[0.78rem] uppercase tracking-[0.1em] text-muted cursor-pointer relative group transition-colors hover:text-text"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            {/* Certifications — active page */}
            <span className="font-sans text-[0.78rem] uppercase tracking-[0.1em] text-accent cursor-default relative">
              Certifications
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent" />
            </span>
            <a
              href="/Lax_Savani_Resume.pdf"
              download
              className="border border-accent text-accent px-5 py-2 rounded font-sans text-sm tracking-wide transition-all hover:bg-accent hover:text-white"
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center text-2xl text-text p-2 rounded-md hover:bg-border/50 transition-colors z-[999]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-bg/95 backdrop-blur-[20px] flex flex-col justify-start pt-28 pb-10 overflow-y-auto items-center gap-7"
          >
            {/* Home */}
            <motion.button
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => { setIsOpen(false); navigate('/'); }}
              className="font-syne text-3xl text-muted uppercase tracking-wider hover:text-accent transition-colors"
            >
              Home
            </motion.button>

            {/* Section links via <a href> */}
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (i + 1) * 0.06 }}
                onClick={() => setIsOpen(false)}
                className="font-syne text-3xl text-muted uppercase tracking-wider hover:text-accent transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            {/* Certifications — current page */}
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (NAV_ITEMS.length + 1) * 0.06 }}
              className="font-syne text-3xl text-accent uppercase tracking-wider"
            >
              Certifications
            </motion.span>

            <motion.a
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (NAV_ITEMS.length + 2) * 0.06 }}
              href="/Lax_Savani_Resume.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="border border-accent text-accent px-8 py-3 rounded font-sans text-lg tracking-wide hover:bg-accent hover:text-white transition-all"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Shared Footer ─── */
const PageFooter = () => {
  const navigate = useNavigate();
  const [firstName, lastName] = resumeData.name.split(' ');

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Education', href: '/#education' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Certifications', href: '/certifications' },
  ];

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Col 1 – Brand */}
          <div className="flex flex-col items-start">
            <button onClick={() => navigate('/')} className="cursor-pointer mb-4">
              <span className="font-syne font-extrabold text-2xl text-text">{firstName} </span>
              <span className="font-syne font-extrabold text-2xl text-accent">{lastName}</span>
            </button>
            <p className="text-muted font-sans text-sm leading-relaxed max-w-xs">
              Building robust, scalable systems that never break when it matters most.
            </p>
          </div>

          {/* Col 2 – Quick links */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="font-syne font-bold text-text mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted font-sans text-sm hover:text-accent transition-colors capitalize text-left"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 – Socials */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-syne font-bold text-text mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex gap-4">
              {[
                { href: resumeData.contact.github, icon: <FiGithub /> },
                { href: resumeData.contact.linkedin, icon: <FiLinkedin /> },
                { href: `mailto:${resumeData.contact.email}`, icon: <FiMail /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:scale-110 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted font-sans text-sm">© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
          <p className="text-muted font-sans text-sm">Designed & Developed with <span className="text-red-500">♥</span></p>
        </div>
      </div>
    </footer>
  );
};

/* ─── Page Layout Wrapper ─── */
const PageLayout = ({ children, title, subtitle, tag, backLabel }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bg text-text font-sans min-h-screen relative selection:bg-accent selection:text-white">
      <CursorGlow />
      <PageNavbar />

      <main className="relative pt-32 pb-16">
        {title && (
          <div className="px-6 md:px-12 pb-12">
            <div className="container mx-auto max-w-6xl">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-muted hover:text-accent transition-colors font-sans text-sm mb-8 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                {backLabel || 'Back to Home'}
              </motion.button>

              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                {tag && (
                  <span className="text-[0.75rem] uppercase text-accent tracking-[0.3em] font-sans font-bold bg-accent/10 px-4 py-2 rounded-full inline-block mb-4">
                    {tag}
                  </span>
                )}
                <h1 className="font-syne text-4xl md:text-5xl font-extrabold text-text mt-2">{title}</h1>
                <div className="w-[60px] h-[3px] bg-gradient-to-r from-accent to-accent2 rounded-sm mt-4" />
                {subtitle && <p className="font-sans text-muted text-base mt-5 max-w-2xl leading-relaxed">{subtitle}</p>}
              </motion.div>
            </div>
          </div>
        )}
        {children}
      </main>

      <PageFooter />
    </div>
  );
};

export default PageLayout;
export { PageNavbar, PageFooter, CursorGlow };
