// ==========================================
// FILE: src/components/About.jsx - FIXED VERSION
// ==========================================
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Mail, Phone, Code, GraduationCap, Zap,
  FileCode, Database, Palette, Globe, Layers, Monitor,
  Smartphone, GitBranch, Settings, Box
} from 'lucide-react';

// ============ TECH CARD COMPONENT - HORIZONTAL LAYOUT FINAL ============
const TechCard = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 
        hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 8px 25px rgba(0, 245, 255, 0.1)'
      }}
    >
      {/* FINAL: Horizontal Layout - Logo Left, Text Right */}
      <div className="flex items-center space-x-3">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
            {/* Actual Logo Image */}
            <img 
              src={`/assets/images/${tech.icon}`} 
              alt={tech.name}
              className="w-7 h-7 object-contain relative z-10"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Icon */}
            <div 
              className={`w-7 h-7 rounded hidden items-center justify-center ${tech.bgColor} absolute inset-0`}
              style={{ display: 'none' }}
            >
              <tech.fallbackIcon className={`w-5 h-5 ${tech.iconColor}`} />
            </div>
            {/* Background Glow */}
            <div className={`absolute inset-0 ${tech.bgColor} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity`} />
          </div>
        </div>

        {/* Text Content - Right Side */}
        <div className="flex-1 min-w-0">
          {/* Tech Name - Always Visible */}
          <h3 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors leading-tight truncate">
            {tech.name}
          </h3>
          
          {/* Level Badge - Show on Hover Only */}
          <motion.div
            initial={{ opacity: 0, y: 3, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 3,
              height: isHovered ? 'auto' : 0
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden mt-1"
          >
            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${tech.levelColor} 
              inline-block transition-all duration-200`}>
              {tech.level}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============ ABOUT COMPONENT - FIXED ============
const About = () => {
  const techStackData = [
    {
      name: 'HTML',
      icon: 'html.png',
      fallbackIcon: FileCode,
      bgColor: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
      level: 'Advanced',
      levelColor: 'bg-green-500/20 text-green-400'
    },
    {
      name: 'CSS',
      icon: 'css.png',
      fallbackIcon: Palette,
      bgColor: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      level: 'Advanced',
      levelColor: 'bg-green-500/20 text-green-400'
    },
    {
      name: 'PHP',
      icon: 'php.png',
      fallbackIcon: Code,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
      level: 'Beginner',
      levelColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'JavaScript',
      icon: 'javascript.png',
      fallbackIcon: Box,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
      level: 'Beginner',
      levelColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'React',
      icon: 'react.png',
      fallbackIcon: Globe,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
      level: 'Beginner',
      levelColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'Vite',
      icon: 'vite.png',
      fallbackIcon: Database,
      bgColor: 'bg-red-500/20',
      iconColor: 'text-red-400',
      level: 'Beginner',
      levelColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'Figma',
      icon: 'figma.png',
      fallbackIcon: Smartphone,
      bgColor: 'bg-pink-500/20',
      iconColor: 'text-pink-400',
      level: 'Advanced',
      levelColor: 'bg-green-500/20 text-green-400'
    },
    {
      name: 'Tailwind',
      icon: 'tailwind.png',
      fallbackIcon: Layers,
      bgColor: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      level: 'Intermediate',
      levelColor: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      name: 'Bootstrap',
      icon: 'bootstrap.png',
      fallbackIcon: Monitor,
      bgColor: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400',
      level: 'Intermediate',
      levelColor: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      name: 'VSCode',
      icon: 'vscode.png',
      fallbackIcon: Settings,
      bgColor: 'bg-pink-500/20',
      iconColor: 'text-pink-400',
      level: 'Advanced',
      levelColor: 'bg-green-500/20 text-green-400'
    },
    {
      name: 'Git',
      icon: 'git.png',
      fallbackIcon: GitBranch,
      bgColor: 'bg-orange-600/20',
      iconColor: 'text-orange-300',
      level: 'Intermediate',
      levelColor: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      name: 'WordPress',
      icon: 'wordpress.png',
      fallbackIcon: Globe,
      bgColor: 'bg-blue-600/20',
      iconColor: 'text-blue-300',
      level: 'Advanced',
      levelColor: 'bg-green-500/20 text-green-400'
    }
  ];

  const experiences = [
    {
      title: 'UI/UX Designer - Travel Agency Website',
      company: 'University Project',
      period: 'January 2025',
      description: 'Designed travel agency website using Figma for various layouts (homepage, destination list, details, etc.)',
      achievements: [
        'Applied modern UI design principles: consistency, spacing, hierarchy, and responsiveness',
        'Collaborated and prototyped using auto layout & component variants in Figma',
        'Created comprehensive design system'
      ]
    },
    {
      title: 'WordPress Developer',
      company: 'School Project',
      period: 'July - October 2024',
      description: 'Developed responsive website for KBTK Aba Wage 25 Sidoarjo school admission system',
      achievements: [
        'Built responsive website ensuring optimal accessibility across devices',
        'Implemented SEO optimization for better search engine visibility',
        'Customized WordPress theme and functionality'
      ]
    },
    {
      title: 'UX Mobile Designer',
      company: 'Final Course Project',
      period: 'January - July 2023',
      description: 'Analyzed and designed mobile application using CES Framework and Functional/Non-Functional Analysis',
      achievements: [
        'Created innovative application name and concept',
        'Conducted thorough project analysis using CES Framework',
        'Designed user interface prototypes using Figma'
      ]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold font-futuristic text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </motion.div>

        {/* Profile & Education Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Profile Section - LEFT */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* FIXED: Profile Photo - Cyan Neon Effect (Sesuai Tema) */}
                <motion.div 
                  className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-cyan-400
                    shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.3),0_0_60px_rgba(34,211,238,0.1)]
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.7),0_0_60px_rgba(34,211,238,0.4),0_0_90px_rgba(34,211,238,0.2)]
                    transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { rotate: { duration: 0.5 } }
                  }}
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.3)',
                      '0 0 25px rgba(34,211,238,0.6), 0 0 50px rgba(34,211,238,0.4)',
                      '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.3)'
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Cyan neon border overlay */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-70 animate-pulse" />
                  
                  <img 
                    src="/assets/images/Haex.jpeg" 
                    alt="Haex Putra Profile"
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      // Fallback ke placeholder jika gambar tidak ditemukan
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder with cyan theme */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-cyan-500 to-cyan-700 
                      flex items-center justify-center text-white text-6xl font-bold absolute inset-0 z-10"
                    style={{ display: 'none' }}
                  >
                    H
                  </div>
                  
                  {/* Additional cyan glow effect */}
                  <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-10 animate-pulse" />
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Haex Putra</h3>
                  <p className="text-cyan-400 text-lg mb-4">Junior UI/UX Designer & Frontend Developer</p>
                  
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center justify-center md:justify-start">
                      <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                      <span>Sidoarjo, Indonesia</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                      <span>Haexputra@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Phone className="w-4 h-4 mr-2 text-cyan-400" />
                      <span>+6281233116616</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-gray-300 leading-relaxed">
                  I am a 4th semester Informatics student at Universitas Muhammadiyah Sidoarjo with a passion for 
                  learning and developing skills in information technology and design. I'm interested in combining 
                  programming and design to create innovative and effective solutions.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {['Creative Problem Solver', 'Team Collaboration', 'Quick Learner', 'Detail Oriented'].map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full border border-cyan-400/20"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Section - RIGHT */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-cyan-400" />
                Education
              </h4>
              
              <div className="space-y-6">
                <div className="border-l-2 border-cyan-400/30 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-2 top-2" />
                  <h5 className="text-white font-semibold">Universitas Muhammadiyah Sidoarjo</h5>
                  <p className="text-cyan-400">Informatics Engineering</p>
                  <p className="text-gray-400 text-sm">September 2023 - Present</p>
                  <p className="text-gray-300 text-sm mt-2">Current GPA: 3.60/4.00 (Semester 4)</p>
                </div>
                
                <div className="border-l-2 border-gray-600 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-2 top-2" />
                  <h5 className="text-white font-semibold">SMA Bhayangkari 3 Porong</h5>
                  <p className="text-purple-400">Mathematics and Natural Sciences</p>
                  <p className="text-gray-400 text-sm">June 2016 - March 2019</p>
                  <p className="text-gray-300 text-sm mt-2">Final Score: 45.00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section - FIXED */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-white mb-4">
              Tech <span className="text-cyan-400">Stack</span>
            </h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
          
          {/* FIXED: Tech Stack Grid - Better Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {techStackData.map((tech, index) => (
              <TechCard key={index} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;