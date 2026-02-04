import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'IT Tuition Management System',
    description:
      'A full-stack Tuition Management System with registration, attendance tracking, and fee management. Secure authentication with encrypted data for admins, teachers, and students.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    liveUrl: 'https://it-tution-management.onrender.com',
    githubUrl: 'https://github.com/laxsavani',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
  {
    title: 'Simple Chat App',
    description:
      'A responsive real-time chat interface with clean UI. Features instant messaging functionality with dynamic content updates using client-side scripting.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Real-time'],
    liveUrl: 'https://laxchatapp.onrender.com',
    githubUrl: 'https://github.com/laxsavani',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
  },
  {
    title: 'Flask To-Do App',
    description:
      'A Flask-based To-Do web application with full CRUD operations. Integrated SQLite database for efficient task management with persistent data handling.',
    technologies: ['Python', 'Flask', 'SQLite', 'Render'],
    liveUrl: '#',
    githubUrl: 'https://github.com/laxsavani',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
  },
  {
    title: 'File Organizer Automation',
    description:
      'Python-based automation script to categorize and move files into structured directories. Features scheduling with cron for automated periodic organization.',
    technologies: ['Python', 'Automation', 'Cron', 'Scripting'],
    liveUrl: '#',
    githubUrl: 'https://github.com/laxsavani',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-accent text-accent-foreground hover:scale-110 transition-transform duration-300"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card text-foreground hover:scale-110 transition-transform duration-300"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Folder className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground font-sans">
            {project.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="section-title text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/laxsavani" target="_blank" rel="noopener noreferrer">
            <Button variant="accentOutline" size="lg">
              <Github className="mr-2" />
              View All Projects on GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
