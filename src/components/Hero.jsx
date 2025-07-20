// ==========================================
// FILE: src/components/Hero.jsx - FONT STYLE UPDATED
// ==========================================
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Globe, Instagram } from 'lucide-react';

// Tech Font Styles
const techStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = techStyles;
  document.head.appendChild(styleSheet);
}

// ============ TYPEWRITER COMPONENT ============
const TypewriterText = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const roles = [
    'Frontend Developer',
    'UI/UX Designer'
  ];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
          setIsPaused(true);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, isPaused, roles]);

  return (
    <span className="relative">
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-8 bg-cyan-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
};

// ============ 3D COMPONENTS ============
const FloatingCube = ({ position, size = 1, color = '#00f5ff', rotationSpeed = 1 }) => {
  const meshRef = useRef();
  
  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.style.transform = 
          `translate3d(${Math.sin(Date.now() * 0.001 * rotationSpeed) * 20}px, 
                      ${Math.cos(Date.now() * 0.001 * rotationSpeed) * 15}px, 0) 
           rotateX(${Date.now() * 0.001 * rotationSpeed}rad) 
           rotateY(${Date.now() * 0.001 * rotationSpeed * 0.7}rad)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [rotationSpeed]);

  return (
    <div
      ref={meshRef}
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: size * 30,
        height: size * 30,
        background: `linear-gradient(45deg, ${color}, ${color}80)`,
        borderRadius: '8px',
        boxShadow: `0 0 30px ${color}40`,
        border: `1px solid ${color}60`,
        backdropFilter: 'blur(10px)',
        cursor: 'none',
      }}
    />
  );
};

// ============ UI COMPONENTS - FIXED ============
const GlowButton = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-cyan-400',
    secondary: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900',
    ghost: 'bg-transparent text-cyan-400 hover:bg-cyan-400/10',
  };
  
  return (
    <motion.button
      className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden
        flex items-center justify-center gap-2 min-w-[180px]
        ${variants[variant]} ${className} group cursor-pointer`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  );
};


// ============ HERO COMPONENT ============
const Hero = ({ scrollToSection }) => {  // Tambahkan scrollToSection sebagai prop

  // CV Download Function
const handleDownloadCV = () => {
  try {
    // Path langsung sesuai struktur folder Anda
    const link = document.createElement('a');
    link.href = '/assets/documents/cv.pdf';
    link.download = 'Haex_Putra_CV.pdf';
    link.target = '_blank';
    
    // Tambahkan ke DOM, klik, lalu hapus
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: buka di tab baru
    window.open('/assets/documents/cv.pdf', '_blank');
  }
};

  // Function to scroll to portfolio section - UPDATE INI
  const handleViewWork = () => {
    if (scrollToSection) {
      scrollToSection('portfolio');
    } else {
      // Fallback jika scrollToSection tidak tersedia
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ cursor: 'default' }}
    >
      {/* 3D Floating Elements */}
      <FloatingCube position={{ x: '10%', y: '20%' }} size={1} color="#00f5ff" rotationSpeed={0.5} />
      <FloatingCube position={{ x: '80%', y: '30%' }} size={0.7} color="#bf00ff" rotationSpeed={0.8} />
      <FloatingCube position={{ x: '15%', y: '70%' }} size={0.9} color="#39ff14" rotationSpeed={0.6} />
      <FloatingCube position={{ x: '85%', y: '80%' }} size={0.6} color="#ff6b35" rotationSpeed={1.2} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hello World Introduction */}
          <motion.div
            className="text-xl md:text-2xl text-cyan-400 mb-6 font-tech tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello World, I'm
          </motion.div>

          {/* UPDATED: Main Name - Tech Font Only */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
            style={{
              fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', 'Courier New', monospace",
              background: 'linear-gradient(45deg, #00f5ff, #bf00ff, #39ff14)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: '900',
              letterSpacing: '-0.01em',
              lineHeight: '0.9',
              animation: 'gradient 6s ease infinite',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            HAEX PUTRA
          </motion.h1>
          
          {/* Typewriter Role */}
          <motion.div
            className="text-xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-purple-400">
              <TypewriterText />
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Passionate about combining programming and design to create innovative and effective solutions. 
            Currently a 4th semester student with a strong drive to learn and develop skills in information technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <GlowButton variant="primary" onClick={handleViewWork} className="group">
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
            
            <GlowButton variant="secondary" onClick={handleDownloadCV} className="group">
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Social Links - UPDATED WITH REAL LINKS */}
        <motion.div
          className="flex justify-center space-x-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {[
            { icon: Github, href: 'https://github.com/haexptr', label: 'GitHub', color: 'hover:text-gray-300' },
            { icon: Linkedin, href: 'https://id.linkedin.com/in/haexputra', label: 'LinkedIn', color: 'hover:text-blue-400' },
            { icon: Instagram, href: 'https://www.instagram.com/xeahz/', label: 'Instagram', color: 'hover:text-pink-400' },
            { icon: Globe, href: 'https://haex-portfolio.vercel.app/', label: 'Website', color: 'hover:text-green-400' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                rounded-full flex items-center justify-center text-gray-400 transition-all duration-300
                ${social.color} hover:border-cyan-400/50`}
              style={{ cursor: 'pointer' }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                y: -5 
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;