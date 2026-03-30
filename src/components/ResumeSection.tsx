import { memo, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  },
];

// Variants outside to avoid per-render allocation
const timelineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

// Lightweight CSS tilt — shared across resume items
const TiltCard = memo(({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.18s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  );
});
TiltCard.displayName = 'TiltCard';

const TimelineItem = memo(({
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
      variants={timelineVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={0.1 * (index + 1)}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full badge-3d -translate-x-1/2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_6px_hsl(var(--accent)/0.8)]" />
      </div>

      {/* Content */}
      <TiltCard>
        <div className="p-6 rounded-2xl glass-card border border-border/50 hover:border-accent/50 hover:shadow-[0_0_18px_hsl(var(--accent)/0.15)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/8 transition-colors duration-500 pointer-events-none" />

          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Icon className="w-5 h-5 text-accent flex-shrink-0" />
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
      </TiltCard>
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const ResumeSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
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
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-sans"
            >
              <Briefcase className="w-6 h-6 text-accent" />
              Work Experience
            </motion.h3>
            <div className="relative">
              {experience.map((item, index) => (
                <TimelineItem key={item.title} item={item} index={index} icon={Briefcase} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-sans"
            >
              <GraduationCap className="w-6 h-6 text-accent" />
              Education
            </motion.h3>
            <div className="relative">
              {education.map((item, index) => (
                <TimelineItem key={item.degree} item={item} index={index} icon={GraduationCap} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ResumeSection.displayName = 'ResumeSection';

export default ResumeSection;
