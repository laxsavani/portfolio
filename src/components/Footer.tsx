import { Link } from 'react-scroll';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/laxsavani', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/laxsavani', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/laxsavani', label: 'Twitter' },
    { icon: Mail, href: 'mailto:laxsavani4259@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Resume', to: 'resume' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <footer className="glass-card border-b-0 border-l-0 border-r-0 text-foreground py-12 relative z-10 overflow-hidden mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Lax<span className="text-accent">Savani</span>
            </h3>
            <p className="text-foreground/70 mb-4">
              Backend Developer passionate about building robust, scalable solutions with Python, Node.js, and modern databases.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl icon-box-3d text-foreground/70 hover:text-accent-foreground transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-sans">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-foreground/70 hover:text-accent cursor-pointer transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-sans">Contact</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>laxsavani4259@gmail.com</li>
              <li>+91 9825702369</li>
              <li>Surat, Gujarat, India</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/60 text-sm flex items-center gap-1">
              © {currentYear} Lax Savani. Made with{' '}
              <Heart className="w-4 h-4 text-accent fill-accent" /> All rights reserved.
            </p>

            {/* Back to Top */}
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl btn-3d bg-accent/20 border-accent/40 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <ArrowUp size={16} />
              Back to Top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
