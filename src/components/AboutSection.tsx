import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Target, User, Briefcase } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

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
    <section id="about" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4 shadow-[0_0_10px_hsl(var(--accent)/0.2)]">
            About Me
          </span>
          <h2 className="section-title text-foreground">
            Get to Know <span className="text-gradient drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]">Me</span>
          </h2>
          <p className="section-subtitle">
            I'm a developer who loves creating impactful backend solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aboutCards.map((card, index) => (
            <Tilt key={card.title} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} gyroscope={true} className="h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1), type: 'spring' }}
                className="group p-6 md:p-8 rounded-2xl glass-card border border-border/50 hover:border-accent/50 hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl icon-box-3d flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3 font-sans group-hover:text-accent transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
