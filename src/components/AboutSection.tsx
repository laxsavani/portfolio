import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="section-title text-foreground">
            Get to Know <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            I'm a developer who loves creating impactful backend solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl accent-gradient flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-sans">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
