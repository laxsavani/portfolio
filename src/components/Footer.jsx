import React from 'react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navLinks = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

  const [firstName, lastName] = resumeData.name.split(' ');

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col items-start">
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer mb-4">
              <span className="font-syne font-extrabold text-2xl text-text">{firstName} </span>
              <span className="font-syne font-extrabold text-2xl text-accent">{lastName}</span>
            </Link>
            <p className="text-muted font-sans text-sm leading-relaxed max-w-xs">
              Building the robust, scalable systems that never break when it matters most.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="font-syne font-bold text-text mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link 
                  key={link}
                  to={link}
                  smooth={true}
                  duration={500}
                  className="text-muted font-sans text-sm hover:text-accent transition-colors capitalize cursor-pointer"
                >
                  {link === 'hero' ? 'Home' : link}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-syne font-bold text-text mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href={resumeData.contact.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:scale-110 transition-all">
                <FiGithub />
              </a>
              <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:scale-110 transition-all">
                <FiLinkedin />
              </a>
              <a href={`mailto:${resumeData.contact.email}`} className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:scale-110 transition-all">
                <FiMail />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted font-sans text-sm">
            © {currentYear} {resumeData.name}. All rights reserved.
          </p>
          <p className="text-muted font-sans text-sm">
            Designed & Developed with <span className="text-red-500">♥</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
