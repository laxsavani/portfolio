import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Tilt from 'react-parallax-tilt';

const experience = [
  {
    title: 'Backend Developer',
    company: 'White Orange Software',
    location: 'Surat, Gujarat',
    period: '01 Jan 2026 - On Going',
    description:
      'Backend developer with a strong foundation in server-side programming, databases, and API development. Passionate about learning, building scalable applications, and contributing to real-world projects.',
  },
  {
    title: 'Python Developer',
    company: 'Infotact Solutions',
    location: 'Bengaluru, Karnataka',
    period: 'April 2025 - June 2025',
    description:
      'Developed Flask web applications with CRUD functionality, automated Python scripts with cron scheduling, implemented web scraping solutions, and deployed projects on Render.',
  },
  {
    title: 'Web Developer',
    company: 'Skyline Infosys',
    location: 'Surat, Gujarat',
    period: 'May 2024 - June 2024',
    description:
      'Built responsive chat interfaces with real-time messaging, implemented client-side validation, optimized frontend performance, and performed cross-browser testing.',
  },
];

const education = [
  {
    degree: 'B.Tech in Computer Engineering',
    institution: 'Charotar University of Science and Technology',
    location: 'Anand, Gujarat',
    period: 'Nov 2023 - May 2026',
    description:
      'CGPA: 6.5 | Coursework: Data Structures & Algorithms, Machine Learning, Cloud Computing, Blockchain, Advanced Web Technology, Cryptography & Network Security.',
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Tapi Diploma Engineering College',
    location: 'Surat, Gujarat',
    period: 'Jun 2021 - Aug 2023',
    description:
      'CGPA: 8.35 | Coursework: Java Programming, Database Management, Computer Networks, Android Development, Dynamic Web Development.',
  },
  {
    degree: '10th Standard',
    institution: 'P.P. Savani Vidhybhavan',
    location: 'Surat, Gujarat',
    period: 'April 2020 - May 2021',
    description:
      'Completed 10th Standard with 69.33%, demonstrating a solid academic foundation and consistent learning performance across core subjects.',
  }
];

const TimelineItem = ({
  item,
  index,
  icon: Icon,
}: {
  item: typeof experience[0] | typeof education[0];
  index: number;
  icon: typeof Briefcase;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent/20" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full badge-3d -translate-x-1/2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow shadow-[0_0_10px_hsl(var(--accent)/0.8)]" />
      </div>

      {/* Content */}
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1000} gyroscope={true}>
        <div className="p-6 rounded-2xl glass-card border border-border/50 hover:border-accent/50 hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)] transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500"></div>
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Icon className="w-5 h-5 text-accent" />
            <span className="text-sm text-accent font-bold flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {item.period}
            </span>
          </div>
          
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 font-sans relative z-10">
            {'title' in item ? item.title : 'degree' in item ? item.degree : ''}
          </h3>
          
          <p className="text-muted-foreground/90 font-medium text-sm mb-1 relative z-10">
            {'company' in item ? item.company : 'institution' in item ? item.institution : ''}
          </p>
          
          <p className="text-muted-foreground/60 text-xs mb-4 relative z-10">
            {'location' in item ? item.location : ''}
          </p>
          
          <p className="text-muted-foreground text-sm relative z-10">
            {item.description}
          </p>
        </div>
      </Tilt>
    </motion.div>
  );
};

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            My Resume
          </span>
          <h2 className="section-title text-foreground">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="section-subtitle mb-8">
            My professional journey and academic background
          </p>
          
          <a href="/Lax_Savani_Resume.pdf" download="Lax_Savani_Resume.pdf">
            <Button variant="accent" size="lg">
              <Download className="mr-2" />
              Download Resume (PDF)
            </Button>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-sans"
            >
              <Briefcase className="w-6 h-6 text-accent" />
              Work Experience
            </motion.h3>
            <div className="relative">
              {experience.map((item, index) => (
                <TimelineItem
                  key={item.title}
                  item={item}
                  index={index}
                  icon={Briefcase}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-sans"
            >
              <GraduationCap className="w-6 h-6 text-accent" />
              Education
            </motion.h3>
            <div className="relative">
              {education.map((item, index) => (
                <TimelineItem
                  key={item.degree}
                  item={item}
                  index={index}
                  icon={GraduationCap}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
