import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

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
      { name: 'VS Code / Cursor / Aitigravity', level: 95 },
      { name: 'Render', level: 85 },
      { name: 'Networking', level: 60 },
      { name: 'Virtual Box', level: 60 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-accent font-semibold">{level}%</span>
      </div>
      <div className="skill-bar h-2 bg-muted/30">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
          className="skill-bar-fill h-full shadow-[0_0_10px_hsl(var(--accent)/0.5)]"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4">
            My Skills
          </span>
          <h2 className="section-title text-foreground">
            Technical <span className="text-gradient drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Tilt key={category.title} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} gyroscope={true}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (categoryIndex + 1), type: 'spring' }}
                className="p-6 md:p-8 rounded-2xl glass-card hover:border-accent/50 hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] transition-all duration-300 h-full"
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
                      delay={0.1 * (categoryIndex + 1) + 0.1 * skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
