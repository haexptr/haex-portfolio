// ==========================================
// FILE: src/components/Hero.jsx
// ==========================================
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Globe, Instagram } from 'lucide-react';

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
        cursor: 'none', // Force no cursor
      }}
    />
  );
};

// ============ UI COMPONENTS ============
const GlowButton = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-cyan-400',
    secondary: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900',
    ghost: 'bg-transparent text-cyan-400 hover:bg-cyan-400/10',
  };
  
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden
        ${variants[variant]} ${className} group cursor-pointer`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }} // Force pointer cursor on buttons
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  );
};

// ============ HERO COMPONENT ============
const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ cursor: 'default' }} // Force default cursor for section
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
            className="text-lg md:text-xl text-cyan-400 mb-4 font-tech tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello World, I'm
          </motion.div>

          {/* Main Name - Fixed Font & Color */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
            style={{
              fontFamily: "'Poppins', 'Arial', 'Helvetica', sans-serif",
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
            className="text-2xl md:text-4xl text-gray-300 mb-6 h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-purple-400">
              <TypewriterText />
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Passionate about combining programming and design to create innovative and effective solutions. 
            Currently a 4th semester student with a strong drive to learn and develop skills in information technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <GlowButton variant="primary" className="group">
              View My Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
            
            <GlowButton variant="secondary" className="group">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Social Links - FIXED with Instagram */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {[
            { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
            { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
            { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
            { icon: Globe, href: '#', label: 'Website', color: 'hover:text-green-400' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                rounded-full flex items-center justify-center text-gray-400 transition-all duration-300
                ${social.color} hover:border-cyan-400/50`}
              style={{ cursor: 'pointer' }} // Force pointer cursor
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;