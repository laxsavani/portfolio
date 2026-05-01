import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, staggerContainer, scaleIn } from '../animations/variants';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [firstName, lastName] = resumeData.name.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 md:px-12 bg-bg overflow-hidden">

      {/* Animated Background Elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />

      <div
        className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 animate-[drift_12s_infinite_alternate]"
        style={{
          background: 'radial-gradient(circle, var(--accent), transparent 70%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 animate-[drift_15s_infinite_alternate-reverse]"
        style={{
          background: 'radial-gradient(circle, var(--accent2), transparent 70%)',
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="text-[0.65rem] md:text-xs uppercase tracking-widest text-accent border border-accent/30 rounded-full px-4 py-2 bg-surface">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-syne font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-tight mb-4 text-text">
            <span>{firstName} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent2">
              {lastName}
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="text-xl md:text-2xl text-muted font-medium mb-6 h-8">
            <TypeAnimation
              sequence={[
                'Backend Developer', 2000,
                'API Architect', 2000,
                'System Designer', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-muted text-base max-w-lg mb-10 leading-relaxed font-sans">
            I build robust, scalable systems that never break when it matters most. Focus on creating efficient APIs and seamless data management solutions.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="projects" smooth={true} duration={500}>
              <motion.button
                whileHover={{ y: -3, boxShadow: '0 10px 30px -10px var(--accent)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-accent text-white font-semibold px-8 py-3 rounded-lg tracking-wide transition-all shadow-md"
              >
                View My Work
              </motion.button>
            </Link>
            <motion.a
              href="/Resume.pdf"
              download
              whileHover={{ y: -3, boxShadow: '0 10px 30px -10px var(--accent)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-surface border border-border text-text font-semibold px-8 py-3 rounded-lg tracking-wide transition-all shadow-sm hover:border-accent hover:text-accent"
            >
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-6">
            {[
              { icon: <FiGithub />, link: resumeData.contact.github },
              { icon: <FiLinkedin />, link: resumeData.contact.linkedin },
              { icon: <FiMail />, link: `mailto:${resumeData.contact.email}` }
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted text-xl hover:text-accent hover:border-accent transition-all hover:shadow-md"
              >
                {item.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Photo */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
            {/* Decorative background circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-accent2/20 rounded-full blur-2xl animate-pulse"></div>

            <div className="relative z-10 w-full h-full rounded-full border-[6px] border-surface shadow-2xl overflow-hidden bg-surface">
              <div className="w-full h-full rounded-full overflow-hidden bg-bg relative">
                <img
                  src="/hero-image.jpeg"
                  alt={resumeData.name}
                  className="w-full h-full object-cover"
                />
                {/* Subtle inner shadow overlay */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-full pointer-events-none"></div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-2 sm:-left-6 md:-left-10 bg-surface px-6 py-4 rounded-2xl border border-border shadow-xl hidden sm:flex flex-col items-center justify-center z-20"
            >
              <span className="font-syne font-extrabold text-accent text-3xl mb-1">6+</span>
              <span className="text-[0.65rem] text-muted uppercase tracking-widest font-bold">Projects</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -right-2 sm:-right-6 md:-right-10 bg-surface px-6 py-4 rounded-2xl border border-border shadow-xl hidden sm:flex flex-col items-center justify-center z-20"
            >
              <span className="font-syne font-extrabold text-accent2 text-2xl mb-1">Backend</span>
              <span className="text-[0.65rem] text-muted uppercase tracking-widest font-bold">Developer</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
