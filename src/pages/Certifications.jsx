import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import {
  FiExternalLink, FiAward, FiCalendar, FiHash,
  FiX, FiCheckCircle, FiMaximize2
} from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { fadeUp, staggerContainer, scaleIn, cardHover } from '../animations/variants';
import PageLayout from '../components/PageLayout';

/* ─── tilt options ─── */
const tiltOptions = {
  reverse: false, max: 8, perspective: 1000, scale: 1.02, speed: 400,
  transition: true, axis: null, reset: true,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
};

/* ─── category colours ─── */
const categoryColors = {
  Backend:  { bg: 'bg-blue-50',    text: 'text-blue-600',   border: 'border-blue-200',   grad: 'from-blue-500 to-indigo-600' },
  Python:   { bg: 'bg-yellow-50',  text: 'text-yellow-700', border: 'border-yellow-200', grad: 'from-yellow-500 to-orange-500' },
  Internship: { bg: 'bg-green-50',   text: 'text-green-700',  border: 'border-green-200',  grad: 'from-green-500 to-teal-600' },
  Development: { bg: 'bg-sky-50',     text: 'text-sky-600',    border: 'border-sky-200',    grad: 'from-sky-500 to-cyan-600' },
  Internships:   { bg: 'bg-pink-50',  text: 'text-pink-600', border: 'border-pink-200', grad: 'from-pink-500 to-pink-600' },
  Frontend: { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200', grad: 'from-violet-500 to-purple-600' },
};
const cat = (c) => categoryColors[c] ?? {
  bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', grad: 'from-gray-500 to-gray-600'
};

/* ══════════════════════════════════════════════
   FULL-SCREEN CERTIFICATE MODAL
══════════════════════════════════════════════ */
const CertModal = ({ cert, onClose }) => {
  const style = cat(cert.category);

  /* close on Escape */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ backdropFilter: 'blur(12px)', background: 'rgba(15,23,42,0.65)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* ── Header (sticky — always visible) ── */}
        <div className={`relative flex-shrink-0 bg-gradient-to-br ${style.grad} px-5 sm:px-8 py-6 sm:py-8 overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-8  w-32 h-32 rounded-full bg-white/10" />
          {/* Close button — always reachable */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center text-white transition-colors z-20"
            aria-label="Close certificate"
          >
            <FiX className="text-base" />
          </button>
          <div className="relative z-10 pr-10">
            <span className="inline-block text-white/80 text-[0.6rem] uppercase tracking-[0.2em] font-bold mb-2">
              {cert.category} · Certificate of Completion
            </span>
            <h2 className="font-syne text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {cert.title}
            </h2>
          </div>
        </div>
        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1">
        <div className="px-5 sm:px-8 py-5 sm:py-7 space-y-5">

          {/* Issuer + Date — stack on mobile */}
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-3">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted font-bold font-sans">Issued By</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${style.grad} flex items-center justify-center text-white flex-shrink-0`}>
                  <FiAward className="text-xs" />
                </div>
                <span className="font-syne text-sm sm:text-base font-bold text-text leading-snug">{cert.issuer}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted font-bold font-sans">Issue Date</span>
              <div className="flex items-center gap-2 mt-1">
                <FiCalendar className="text-accent text-sm flex-shrink-0" />
                <span className="font-sans text-sm sm:text-base font-semibold text-text">{cert.date}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Skills */}
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-bold font-sans block mb-3">
              Skills Covered
            </span>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold font-sans border ${style.bg} ${style.text} ${style.border}`}
                >
                  <FiCheckCircle className="text-xs flex-shrink-0" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential ID — only show when not empty */}
          {cert.credentialId && (
            <div className="flex items-center gap-3 bg-bg border border-border rounded-xl px-4 py-3">
              <FiHash className="text-accent text-base flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[0.65rem] uppercase tracking-widest text-muted font-bold font-sans block mb-0.5">
                  Credential ID
                </span>
                <span className="font-mono text-xs sm:text-sm text-text font-semibold break-all">{cert.credentialId}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold font-sans text-sm bg-gradient-to-r ${style.grad} text-white shadow-md hover:opacity-90 transition-opacity`}
              >
                <FiExternalLink />
                Verify Credential
              </a>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold font-sans text-sm bg-bg border border-border text-muted cursor-not-allowed">
                Internal Certificate
              </div>
            )}
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-3 rounded-xl font-bold font-sans text-sm border border-border text-muted hover:text-text hover:border-accent transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   CERTIFICATE CARD
══════════════════════════════════════════════ */
const CertCard = React.forwardRef(({ cert, index, onClick }, ref) => {
  const style = cat(cert.category);
  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <Tilt options={tiltOptions}>
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          onClick={onClick}
          className="h-full bg-card border border-border rounded-[14px] p-6 flex flex-col relative overflow-hidden group cursor-pointer"
        >
          {/* Accent top line */}
          <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${style.grad}`} />

          {/* Expand hint */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FiMaximize2 className="text-xs" />
            </div>
          </div>

          {/* Category badge + icon */}
          <div className="flex items-start justify-between mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[0.7rem] uppercase tracking-widest font-semibold border ${style.bg} ${style.text} ${style.border}`}>
              <FiAward className="text-xs" />{cert.category}
            </span>
            <span className="text-2xl select-none">{cert.icon}</span>
          </div>

          {/* Title */}
          <h3 className="font-syne text-base font-bold text-text leading-snug mb-1 group-hover:text-accent transition-colors pr-6">
            {cert.title}
          </h3>

          {/* Issuer + date */}
          <div className="flex flex-col gap-1 mb-4">
            <p className="font-sans text-accent font-semibold text-sm">{cert.issuer}</p>
            <div className="flex items-center gap-1.5 text-muted text-xs font-sans">
              <FiCalendar className="text-xs" /><span>{cert.date}</span>
            </div>
          </div>

          {/* Skill chips (max 3 visible) */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
            {cert.skills.slice(0, 3).map((s, i) => (
              <span key={i} className="text-xs font-sans px-2.5 py-1 border border-border rounded-md text-muted bg-surface">
                {s}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-xs font-sans px-2.5 py-1 border border-border rounded-md text-muted bg-surface">
                +{cert.skills.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-muted text-xs font-sans min-w-0">
              <FiHash className="shrink-0" />
              <span className="truncate">{cert.credentialId}</span>
            </div>
            <span className="text-accent text-xs font-sans font-semibold shrink-0 group-hover:underline">
              View Full
            </span>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
});

/* ══════════════════════════════════════════════
   PAGE CONTENT
══════════════════════════════════════════════ */
const CertificationsContent = () => {
  const [filter, setFilter]         = useState('All');
  const [selectedCert, setSelected] = useState(null);
  const { certifications }          = resumeData;

  const categories = ['All', ...new Set(certifications.map(c => c.category))];
  const filtered   = filter === 'All' ? certifications : certifications.filter(c => c.category === filter);

  const issuers    = [...new Set(certifications.map(c => c.issuer))].length;
  const domains    = [...new Set(certifications.map(c => c.category))].length;
  const stats      = [
    { label: 'Certificates', value: certifications.length },
    { label: 'Issuers',      value: issuers },
    { label: 'Domains',      value: domains },
  ];

  /* block body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  return (
    <div className="px-6 md:px-12 pb-12">
      <div className="container mx-auto max-w-6xl">

        {/* Stats */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="flex gap-10 mb-10 justify-center md:justify-start">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <span className="font-syne text-3xl font-bold text-accent">{s.value}+</span>
              <span className="font-sans text-muted text-xs uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter bar */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded font-sans text-sm tracking-wide transition-all duration-300 border ${
                filter === c
                  ? 'bg-accent border-accent text-white font-semibold'
                  : 'bg-transparent border-border text-muted hover:border-accent hover:text-text'
              }`}>
              {c}
              {c === 'All' && <span className="ml-2 text-xs opacity-70">({certifications.length})</span>}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, index) => (
              <CertCard
                key={`${cert.credentialId || cert.title}-${index}`}
                cert={cert}
                index={index}
                onClick={() => setSelected(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-muted">
            <FiAward className="text-5xl mb-4 opacity-30" />
            <p className="font-sans text-lg">No certifications in this category.</p>
          </motion.div>
        )}
      </div>

      {/* ── Full Certificate Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════ */
const Certifications = () => (
  <PageLayout
    tag="Achievements"
    title="My Certifications"
    subtitle="Click any certificate to view it in full detail — including skills covered, issuer, and credential verification."
    backLabel="Back to Home"
  >
    <CertificationsContent />
  </PageLayout>
);

export default Certifications;
