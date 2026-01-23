import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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
      <div className="skill-bar h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
          className="skill-bar-fill h-full"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="section-title text-foreground">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (categoryIndex + 1) }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center shadow-glow">
                  <category.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground font-sans">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
