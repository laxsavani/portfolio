import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Tilt } from 'react-tilt';
import { useInView } from 'react-intersection-observer';
import { resumeData } from '../data/resumeData';
import { fadeUp, slideLeft, slideRight } from '../animations/variants';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const yearsOfExperience = 3;
  const totalProjects = resumeData.projects.length;
  const totalSkills = Object.values(resumeData.skills).flat().length;

  const initials = resumeData.name.split(' ').map(n => n[0]).join('');

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-surface relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent2/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Heading Pattern */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 flex flex-col items-center"
        >
          <span className="text-[0.75rem] uppercase text-accent tracking-[0.3em] font-sans font-bold bg-accent/10 px-4 py-2 rounded-full mb-4">Discover</span>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-text text-center">Behind the Code</h2>
          <div className="w-[80px] h-[4px] bg-gradient-to-r from-accent to-accent2 rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Column - Enhanced Visual */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex flex-col items-center justify-center h-full w-full min-h-[400px]"
          >
            {/* Abstract Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-accent/20 to-accent2/20 rounded-full blur-3xl animate-[pulse_6s_infinite_alternate]"></div>
            
            {/* Main Glass Card */}
            <Tilt options={{ max: 10, scale: 1.02, speed: 400 }}>
              <div className="relative z-10 w-[280px] sm:w-[350px] bg-surface/80 backdrop-blur-2xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 flex flex-col gap-8 transition-shadow hover:shadow-[0_20px_50px_rgba(0,212,255,0.1)]">
                
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center shadow-lg text-white font-syne text-3xl font-bold">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-syne text-xl font-bold text-text">Backend</h3>
                    <p className="text-accent text-sm font-bold uppercase tracking-wider">Architecture</p>
                  </div>
                </div>

                <p className="text-muted text-sm font-sans leading-relaxed italic">
                  "Building scalable server-side systems and highly optimized databases that power modern web applications."
                </p>
                
                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express', 'MySQL', 'MongoDB'].map((tech, idx) => (
                    <span key={tech} className={`px-3 py-1.5 bg-bg border border-border rounded-lg text-xs font-bold text-text shadow-sm transition-transform hover:-translate-y-1`} style={{ transitionDelay: `${idx * 50}ms` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>

            {/* Floating badges around the card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 sm:-right-8 lg:-right-12 z-20"
            >
              <div className="flex items-center gap-3 bg-surface border border-border shadow-xl rounded-2xl px-5 py-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-sm text-text font-bold tracking-wide">Available to Work</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 sm:-left-8 lg:-left-12 z-20"
            >
              <div className="flex items-center gap-3 bg-surface border border-border shadow-xl rounded-2xl px-5 py-4">
                <span className="text-xl">📍</span>
                <span className="text-sm text-text font-bold tracking-wide">{resumeData.contact.location}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-syne text-3xl font-bold text-text mb-6">
              Engineering with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">Precision</span>
            </h3>
            
            <div className="text-muted text-[1.05rem] font-sans leading-relaxed space-y-6 mb-12">
              <p>
                I'm a backend-focused developer who enjoys architecting APIs and optimizing databases.
                My focus isn't just on writing code, but on building reliable systems that scale and
                solve real business problems.
              </p>
              <p>
                Whether it's designing RESTful architectures, managing complex state, or ensuring
                seamless data flow between the server and the client, I take pride in delivering
                clean and maintainable solutions. I adapt quickly to new tech stacks and thrive
                in environments where performance and reliability are critical.
              </p>
            </div>

            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Months Experience', value: yearsOfExperience },
                { label: 'Projects Built', value: totalProjects },
                { label: 'Technologies', value: totalSkills }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative bg-surface border border-border p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:border-accent hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,212,255,0.15)] overflow-hidden"
                >
                  {/* Hover gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 font-syne text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent2 mb-3">
                    {inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}
                    <span className="text-accent2 text-3xl align-top ml-1">+</span>
                  </div>
                  <span className="relative z-10 text-xs text-text uppercase tracking-[0.2em] font-bold text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
