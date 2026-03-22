import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-background noise-overlay">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* About Section */}
        <AboutSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Skills Section */}
        <SkillsSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Education Section */}
        <EducationSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Achievements Section */}
        <AchievementsSection />

        {/* Section divider */}
        <div className="section-divider max-w-4xl mx-auto" />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
