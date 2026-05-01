import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, slideLeft, slideRight } from '../animations/variants';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send directly to email using FormSubmit AJAX
      const response = await fetch(`https://formsubmit.co/ajax/${resumeData.contact.email}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Portfolio Message: ${formData.subject}`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      console.error("Form submission failed, falling back to mailto", err);
      // Fallback
      const mailtoLink = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { label: 'Email', value: resumeData.contact.email, link: `mailto:${resumeData.contact.email}`, icon: <FiMail /> },
    { label: 'LinkedIn', value: 'linkedin.com/in/lax-savani', link: resumeData.contact.linkedin, icon: <FiLinkedin /> },
    { label: 'GitHub', value: 'github.com/laxsavani', link: resumeData.contact.github, icon: <FiGithub /> },
  ];

  if (resumeData.contact.phone) {
    contactLinks.push({ label: 'Phone', value: resumeData.contact.phone, link: `tel:${resumeData.contact.phone}`, icon: <FiPhone /> });
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Heading Pattern */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 flex flex-col items-center md:items-start"
        >
          <span className="text-[0.75rem] uppercase text-accent tracking-[0.3em] font-sans font-bold bg-accent/10 px-4 py-2 rounded-full mb-4">Connect</span>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold text-text mt-2">Let's Build Something</h2>
          <div className="w-[80px] h-[4px] bg-gradient-to-r from-accent to-accent2 rounded-full mt-6"></div>
          <p className="text-muted font-sans mt-6 max-w-lg text-center md:text-left text-lg leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Contact Form */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-surface/80 backdrop-blur-xl border border-border rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text ml-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-bg/50 border ${errors.name ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-text font-sans focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted/50`}
                />
                {errors.name && <span className="text-red-500 text-xs ml-1">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text ml-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-bg/50 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-text font-sans focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted/50`}
                />
                {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full bg-bg/50 border ${errors.subject ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-text font-sans focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted/50`}
                />
                {errors.subject && <span className="text-red-500 text-xs ml-1">{errors.subject}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Hello, I'd like to talk about..."
                  className={`w-full bg-bg/50 border ${errors.message ? 'border-red-500' : 'border-border'} rounded-xl px-5 py-4 text-text font-sans focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder-muted/50 resize-none`}
                />
                {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message}</span>}
              </div>

              <motion.button
                whileHover={{ y: -2, boxShadow: '0 10px 30px -10px var(--accent)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent to-accent2 text-white font-bold font-sans py-4 rounded-xl mt-4 transition-all opacity-90 hover:opacity-100 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-green-500 font-bold bg-green-500/10 py-3 rounded-lg border border-green-500/20 mt-2"
                  >
                    <FiCheckCircle className="text-xl" />
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 pt-4 lg:pt-0">
            {contactLinks.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                target="_blank"
                rel="noreferrer"
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface/80 backdrop-blur-md border border-border rounded-[1.5rem] p-6 flex items-center gap-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,212,255,0.15)] hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-bg border border-border text-accent flex items-center justify-center text-2xl group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent2 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-muted text-sm font-sans mb-1 uppercase tracking-widest font-bold">{info.label}</h4>
                  <span className="text-text font-sans font-medium text-lg hover:text-accent transition-colors">
                    {info.value}
                  </span>
                </div>
              </motion.a>
            ))}

            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: contactLinks.length * 0.1 }}
              className="mt-8 flex items-center gap-4 bg-surface/50 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse relative">
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </div>
              </div>
              <span className="text-text font-sans font-bold text-lg">Available for full-time & freelance</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
