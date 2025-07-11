import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-cyan-400',
    secondary: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900',
    ghost: 'bg-transparent text-cyan-400 hover:bg-cyan-400/10',
  };
  
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden
        ${variants[variant]} ${className} group`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  );
};

export default GlowButton;