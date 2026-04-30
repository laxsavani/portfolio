import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, slideRight } from '../animations/variants';

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-surface">
      <div className="container mx-auto max-w-4xl">
        
        {/* Section Heading Pattern */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 flex flex-col items-center md:items-start"
        >
          <span className="text-[0.8rem] uppercase text-accent tracking-[0.2em] font-sans font-semibold">Career</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text mt-2">Work Experience</h2>
          <div className="w-[60px] h-[3px] bg-accent rounded-sm mt-4"></div>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[2px] bg-surface rounded-full hidden md:block" />
          <motion.div 
            className="absolute left-0 md:left-4 top-0 w-[2px] rounded-full hidden md:block origin-top"
            style={{ 
              height: lineHeight,
              background: 'linear-gradient(to bottom, var(--accent), var(--accent2))' 
            }}
          />

          <style>{`
            @keyframes pulseDot {
              0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4); }
              70% { box-shadow: 0 0 0 10px rgba(0, 212, 255, 0); }
              100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
            }
          `}</style>

          <div className="flex flex-col gap-12">
            {resumeData.workExperience.map((job, index) => (
              <motion.div 
                key={index}
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative pl-0 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[9px] top-6 w-[14px] h-[14px] rounded-full bg-accent border-[3px] border-bg hidden md:block animate-[pulseDot_2s_infinite]" />

                {/* Experience Card */}
                <div className="relative group cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent2 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-surface/80 backdrop-blur-xl border border-border rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-syne text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 font-sans text-sm">
                        <span className="text-accent font-medium">{job.company}</span>
                        <span className="text-muted hidden md:inline">•</span>
                        <div className="flex items-center gap-1 text-muted">
                          <FiMapPin className="text-xs" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="inline-block px-3 py-1 border border-accent/30 rounded-full text-xs text-muted whitespace-nowrap bg-surface self-start">
                      {job.duration}
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-border my-5"></div>

                  <ul className="space-y-3 mb-6">
                    {job.responsibilities.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted font-sans text-[0.95rem] leading-relaxed">
                        <span className="text-accent font-bold mt-0.5">→</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[0.75rem] font-sans px-3 py-1 border border-accent/20 rounded-full text-muted bg-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
