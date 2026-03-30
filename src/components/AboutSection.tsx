import { memo, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Target, User, Briefcase } from 'lucide-react';

const aboutCards = [
  {
    icon: User,
    title: 'Who I Am',
    description:
      'A Backend Developer with expertise in Python, Node.js, and database management. I love building efficient, scalable systems and automating workflows to solve real-world problems.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description:
      'B.Tech in Computer Engineering from Charotar University of Science and Technology (2023-2026). Diploma in Computer Engineering from Tapi Diploma Engineering College with 8.35 CGPA.',
  },
  {
    icon: Briefcase,
    title: 'Experience',
    description:
      'Python Developer at Infotact Solutions (Bengaluru) and Web Developer at Skyline Infosys (Surat). Experienced in Flask, Express.js, database integration, and deployment on cloud platforms.',
  },
  {
    icon: Target,
    title: 'Career Objective',
    description:
      'To contribute to innovative backend solutions that make a difference. I aim to grow as a full-stack developer while mastering cloud technologies and system architecture.',
  },
];

// Variants defined outside — zero re-allocation per render
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: 'easeOut' },
  }),
};

// Lightweight CSS-based tilt (no library, no mouse-tracking library weight)
const TiltCard = memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.18s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  );
});
TiltCard.displayName = 'TiltCard';

const AboutSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4 shadow-[0_0_10px_hsl(var(--accent)/0.2)]">
            About Me
          </span>
          <h2 className="section-title text-foreground">
            Get to Know <span className="text-gradient drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]">Me</span>
          </h2>
          <p className="section-subtitle">
            I'm a developer who loves creating impactful backend solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aboutCards.map((card, index) => (
            <TiltCard key={card.title} className="h-full">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.1 * (index + 1)}
                className="group p-6 md:p-8 rounded-2xl glass-card border border-border/50 hover:border-accent/50 hover:shadow-[0_0_25px_hsl(var(--accent)/0.15)] transition-[border-color,box-shadow] duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl icon-box-3d flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <card.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3 font-sans group-hover:text-accent transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
