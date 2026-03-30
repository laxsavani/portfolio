import { lazy, Suspense, memo } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

// Lazy-load all below-the-fold sections → smaller initial bundle
const AboutSection    = lazy(() => import('@/components/AboutSection'));
const SkillsSection   = lazy(() => import('@/components/SkillsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ResumeSection   = lazy(() => import('@/components/ResumeSection'));
const ContactSection  = lazy(() => import('@/components/ContactSection'));
const Footer          = lazy(() => import('@/components/Footer'));
const Background3D    = lazy(() => import('@/components/Background3D'));

const SectionFallback = () => (
  <div className="py-20 md:py-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const Index = memo(() => {
  return (
    <div className="min-h-screen relative">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <div className="relative z-10 w-full overflow-hidden">
        <Navbar />
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ResumeSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
