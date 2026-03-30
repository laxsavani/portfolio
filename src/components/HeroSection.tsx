import { memo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.jpg';
import { scrollToSection } from '@/hooks/use-smooth-scroll';

// Shared animation variants — defined outside component to avoid recreation on render
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
};

// CSS-based 3D tilt on profile image — no JS mouse tracking, zero layout recalc
const PhotoCard = memo(() => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    // Use will-change hint only while animating
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="photo-tilt-card flex-shrink-0"
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      <div className="relative">
        {/* Glow ring — CSS animation, no Framer infinite loop */}
        <div
          className="absolute inset-0 rounded-full accent-gradient blur-3xl opacity-30 animate-pulse pointer-events-none"
          style={{ willChange: 'opacity' }}
        />
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[5px] border-accent/40 shadow-[0_0_40px_hsl(var(--accent)/0.4)]">
          <img
            src={profilePhoto}
            alt="Lax Savani - Backend Developer"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard';

const HeroSection = memo(() => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-gradient">Lax Savani</span>
            </motion.h1>

            <motion.h2
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/80 font-medium mb-6"
            >
              Backend Developer
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-base sm:text-lg text-primary-foreground/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Backend developer passionate about problem-solving and backend logic. Growing skills through
              hands-on practice and real projects. Passionate about clean architecture and efficient systems.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Button variant="hero" size="xl" onClick={() => scrollToSection('projects')}>
                View Projects
              </Button>
              <Button variant="heroOutline" size="xl" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://github.com/laxsavani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/laxsavani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:laxsavani4259@gmail.com"
                className="p-3 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>

          {/* Profile Image — custom CSS tilt (no library) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
          >
            <PhotoCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator — pure CSS bounce, no Framer infinite loop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="cursor-pointer p-2 rounded-full bg-primary-foreground/10 text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-colors duration-200 animate-bounce focus:outline-none"
          aria-label="Scroll to About"
        >
          <ArrowDown size={24} />
        </button>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
