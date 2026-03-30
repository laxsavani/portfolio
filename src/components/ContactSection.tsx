import { useState, useRef, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'laxsavani4259@gmail.com',
    href: 'mailto:laxsavani4259@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9825702369',
    href: 'tel:+919825702369',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Surat, Gujarat, India',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github,   href: 'https://github.com/laxsavani',    label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/laxsavani', label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/laxsavani',    label: 'Twitter' },
  { icon: Mail,     href: 'mailto:laxsavani4259@gmail.com',   label: 'Email' },
];

const INITIAL_FORM = { name: '', email: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lightweight info card with CSS tilt
const InfoCard = memo(({ item }: { item: typeof contactInfo[0] }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <a
      ref={ref}
      href={item.href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="flex items-center gap-4 p-5 rounded-2xl glass-card border border-border/50 hover:border-accent/50 hover:shadow-[0_0_18px_hsl(var(--accent)/0.15)] transition-[border-color,box-shadow] duration-250 group"
      style={{ transition: 'transform 0.18s ease-out, border-color 0.25s, box-shadow 0.25s', willChange: 'transform' }}
    >
      <div className="w-14 h-14 rounded-xl icon-box-3d flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <item.icon className="w-6 h-6 text-accent" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{item.label}</p>
        <p className="text-foreground font-bold">{item.value}</p>
      </div>
    </a>
  );
});
InfoCard.displayName = 'InfoCard';

const ContactSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [formData, setFormData]   = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'; isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'; isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'; isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'; isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'; isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'; isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_axpca6w',
        'template_k6l5d2h',
        { name: formData.name, email: formData.email, message: formData.message },
        'xsO-mWlDz0QJCNner'
      );
      toast({ title: 'Message sent!', description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData(INITIAL_FORM);
    } catch {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, toast]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev[name as keyof typeof prev] ? { ...prev, [name]: '' } : prev);
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4 shadow-[0_0_10px_hsl(var(--accent)/0.2)]">
            Get In Touch
          </span>
          <h2 className="section-title text-foreground">
            Let's <span className="text-gradient drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]">Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 font-sans">
              Contact Information
            </h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out through any of the following channels. I'm always open to discussing
              new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <InfoCard key={item.label} item={item} />
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4 font-sans">Follow Me</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl icon-box-3d text-muted-foreground hover:text-accent-foreground transition-[color,transform] duration-200 hover:-translate-y-1 hover:scale-110"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`h-12 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
