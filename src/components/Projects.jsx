import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, cardHover } from '../animations/variants';

const tiltOptions = {
  reverse: false,
  max: 10,
  perspective: 1000,
  scale: 1.02,
  speed: 400,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(resumeData.projects.map(p => p.category))];

  const filteredProjects = filter === 'All'
    ? resumeData.projects
    : resumeData.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-bg">
      <div className="container mx-auto max-w-6xl">

        {/* Section Heading Pattern */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 flex flex-col items-center md:items-start"
        >
          <span className="text-[0.8rem] uppercase text-accent tracking-[0.2em] font-sans font-semibold">Portfolio</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text mt-2">Featured Work</h2>
          <div className="w-[60px] h-[3px] bg-accent rounded-sm mt-4"></div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded font-sans text-sm tracking-wide transition-all duration-300 border ${filter === cat
                  ? 'bg-accent border-accent text-white font-semibold'
                  : 'bg-transparent border-border text-muted hover:border-accent hover:text-text'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Tilt options={tiltOptions}>
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="h-full bg-card border border-border rounded-[14px] p-6 flex flex-col relative overflow-hidden group"
                  >
                    {/* Accent Line Top */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-accent2" />

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-accent/15 text-accent rounded text-[0.7rem] uppercase tracking-widest font-semibold mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-syne text-xl font-bold text-text mb-2">{project.name}</h3>
                      <p className="font-sans text-muted text-[0.95rem] leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto mb-6">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-sans px-2.5 py-1 border border-border rounded-md text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-muted hover:text-accent transition-colors group/link"
                        >
                          <FiGithub className="text-lg group-hover/link:scale-110 transition-transform" />
                          <span className="text-sm font-sans font-medium">Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-muted hover:text-accent transition-colors group/link ml-auto"
                        >
                          <span className="text-sm font-sans font-medium">Live Demo</span>
                          <FiExternalLink className="text-lg group-hover/link:scale-110 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
