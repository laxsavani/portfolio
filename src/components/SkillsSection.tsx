import { memo, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: [
      { name: 'C/C++', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 60 },
      { name: 'PHP', level: 30 },
      { name: 'Python', level: 60 },
    ],
  },
  {
    icon: Server,
    title: 'Backend & Frameworks',
    skills: [
      { name: 'Node.js / Express.js', level: 88 },
      { name: 'Flask', level: 60 },
      { name: 'REST APIs', level: 90 },
      { name: 'Web Scraping', level: 82 },
      { name: 'Automation Scripts', level: 85 },
    ],
  },
  {
    icon: Database,
    title: 'Databases',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'JSON', level: 90 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Others',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'VS Code / Cursor / Antigravity', level: 95 },
      { name: 'Render', level: 85 },
      { name: 'Networking', level: 60 },
      { name: 'Virtual Box', level: 60 },
    ],
  },
];

// Extracted outside — no allocation on every render
const barVariants = {
  hidden: { width: 0 },
  visible: (params: { level: number; delay: number }) => ({
    width: `${params.level}%`,
    transition: { duration: 0.9, delay: params.delay, ease: 'easeOut' },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: 'easeOut' },
  }),
};

// Lightweight CSS tilt card — no library, no recurring mouse handler cost
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

// SkillBar as a memoized component with individual InView prevents cascade re-renders
const SkillBar = memo(({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium text-sm">{name}</span>
        <span className="text-accent font-semibold text-sm">{level}%</span>
      </div>
      <div className="skill-bar h-2 bg-muted/30">
        <motion.div
          variants={barVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={{ level, delay }}
          className="skill-bar-fill h-full shadow-[0_0_8px_hsl(var(--accent)/0.4)]"
        />
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

const SkillsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4">
            My Skills
          </span>
          <h2 className="section-title text-foreground">
            Technical <span className="text-gradient drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <TiltCard key={category.title}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.1 * (categoryIndex + 1)}
                className="p-6 md:p-8 rounded-2xl glass-card hover:border-accent/50 hover:shadow-[0_0_25px_hsl(var(--accent)/0.15)] transition-[border-color,box-shadow] duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl icon-box-3d flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-sans">
                    {category.title}
                  </h3>
                </div>

                <div>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.1 * (categoryIndex + 1) + 0.08 * skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
