import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';

// ============ MAIN APP ============
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-cyan-400 text-lg font-futuristic"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-gray-900 text-white font-tech overflow-x-hidden">
        {/* Background Effects */}
        <ParticleField />
        
        {/* Navigation */}
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          scrollToSection={scrollToSection}
        />
        
        {/* Main Content */}
        <main>
          <section id="home">
            <Hero scrollToSection={scrollToSection} />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="portfolio">
            <Portfolio />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;