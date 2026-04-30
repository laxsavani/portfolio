import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { resumeData } from '../data/resumeData';
import { fadeUp, staggerContainer, scaleIn } from '../animations/variants';

const tiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 300,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const getIconUrl = (skill) => {
  const lower = skill.toLowerCase();
  
  // SkillIcons map gives beautifully colored unified icons
  const skillIconsMap = {
    'c': 'c',
    'c++': 'cpp',
    'java': 'java',
    'javascript': 'js',
    'php': 'php',
    'python': 'python',
    'node.js': 'nodejs',
    'express.js': 'express',
    'bootstrap 5': 'bootstrap',
    'wordpress': 'wordpress',
    'flask': 'flask',
    'mysql': 'mysql',
    'mongodb': 'mongodb',
    'sqlite': 'sqlite',
    'git': 'git',
    'github': 'github',
    'vercel': 'vercel',
    'visual studio code': 'vscode',
    'eclipse': 'eclipse'
  };

  if (skillIconsMap[lower]) {
    // using theme=light gives nice distinct colorful backgrounds for monochrome logos
    return `https://skillicons.dev/icons?i=${skillIconsMap[lower]}&theme=light`;
  }

  // Custom specific logos for AI tools and others not in skillicons
  const customLogos = {
    'render': 'https://www.google.com/s2/favicons?domain=render.com&sz=128',
    'cursor': 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128',
    'trae': 'https://www.google.com/s2/favicons?domain=trae.ai&sz=128',
    'antigravity': 'https://www.google.com/s2/favicons?domain=deepmind.google&sz=128'
  };

  if (customLogos[lower]) {
    return customLogos[lower];
  }

  const deviconName = lower.replace(/[^a-z0-9]/g, '');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`;
};

const Skills = () => {
  const categories = Object.keys(resumeData.skills);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-bg">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Heading Pattern */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 flex flex-col items-center md:items-start"
        >
          <span className="text-[0.8rem] uppercase text-accent tracking-[0.2em] font-sans font-semibold">Capabilities</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text mt-2">Technical Skills</h2>
          <div className="w-[60px] h-[3px] bg-accent rounded-sm mt-4"></div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap gap-2 md:gap-4 mb-12 justify-center md:justify-start"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`capitalize px-5 py-2 font-sans text-sm tracking-wider transition-all duration-300 rounded-lg ${
                activeTab === category 
                  ? 'bg-accent text-white font-semibold' 
                  : 'bg-transparent text-muted hover:text-text border border-transparent hover:border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            >
              {resumeData.skills[activeTab].map((skill, index) => {
                const iconUrl = getIconUrl(skill);

                return (
                  <motion.div key={skill} variants={scaleIn}>
                    <Tilt options={tiltOptions}>
                      <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] group h-[140px]">
                        <img 
                          src={iconUrl} 
                          alt={skill} 
                          className="w-12 h-12 object-contain transition-all duration-300 rounded group-hover:grayscale group-hover:opacity-50"
                          onError={(e) => {
                            // Fallback if devicon/favicon doesn't load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent text-2xl font-bold font-syne border border-accent/30 shadow-sm">
                          {skill.charAt(0)}
                        </div>
                        <span className="font-sans text-sm text-muted group-hover:text-text transition-colors text-center font-medium">
                          {skill}
                        </span>
                      </div>
                    </Tilt>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
