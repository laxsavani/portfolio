import React from 'react';
import { motion } from 'framer-motion';
import { PiGraduationCap } from 'react-icons/pi';
import { FiCalendar } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, scaleIn, staggerContainer } from '../animations/variants';

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-surface">
      <div className="container mx-auto max-w-5xl">
        
        {/* Section Heading Pattern */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 flex flex-col items-center md:items-start"
        >
          <span className="text-[0.8rem] uppercase text-accent tracking-[0.2em] font-sans font-semibold">Learning</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text mt-2">Education</h2>
          <div className="w-[60px] h-[3px] bg-accent rounded-sm mt-4"></div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {resumeData.education.map((edu, index) => (
            <motion.div 
              key={index}
              variants={scaleIn}
              className="relative overflow-hidden bg-card border border-border rounded-[14px] p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1.5 group"
            >
              {/* Large faded icon */}
              <div className="absolute -top-6 -right-6 text-[8rem] text-accent opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <PiGraduationCap />
              </div>

              <div className="relative z-10">
                <h3 className="font-syne text-xl font-bold text-text mb-2">{edu.degree}</h3>
                <h4 className="font-sans text-accent font-medium mb-4">{edu.institution}</h4>
                
                <div className="flex items-center gap-2 text-muted font-sans text-sm mb-6">
                  <FiCalendar />
                  <span>{edu.duration}</span>
                </div>

                <div className="inline-block px-4 py-1.5 border border-accent rounded-full text-accent text-sm font-semibold font-sans mb-4">
                  {edu.cgpa}
                </div>

                {edu.details && edu.details.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted font-sans text-[0.9rem]">
                        <span className="text-accent mt-1 text-[0.6rem]">●</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
