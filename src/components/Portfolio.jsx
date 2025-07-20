import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Layers, ExternalLink, Github, ArrowRight } from 'lucide-react';
import GlowButton from './GlowButton';

// ============ PROJECT CARD COMPONENT - NO RATING ============
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
        hover:border-cyan-400/50 transition-all duration-500 group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        rotateX: 5, 
        rotateY: 10, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 245, 255, 0.1)'
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Project Image/Preview Area */}
      <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-600/20 relative overflow-hidden">
        {/* Project Preview Image */}
        {project.image ? (
          <img 
            src={`/assets/images/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback with Icon */}
        <div className={`absolute inset-0 flex items-center justify-center ${project.image ? 'hidden' : 'flex'}`}>
          <div className="text-6xl text-cyan-400/30">{project.icon}</div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>
        
        {/* Hover Overlay with Action Buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent 
                flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Demo Link */}
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlowButton variant="secondary" className="text-sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </GlowButton>
              </motion.a>
              
              {/* Code Link */}
              <motion.a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GlowButton variant="ghost" className="text-sm">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </GlowButton>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full 
                border border-cyan-400/20"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Date Only - Clean */}
        <div className="text-right">
          <span className="text-gray-500 text-sm">{project.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ============ PORTFOLIO COMPONENT - NO RATING ============
const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  
  // UPDATED: Projects without rating
  const projects = [
    {
      id: 1,
      title: 'Travel Agency Website UI/UX',
      description: 'Complete UI/UX design for travel agency website including homepage, destination listings, booking system, and user dashboard. Applied modern UI design principles: consistency, spacing, hierarchy, and responsiveness.',
      category: 'design',
      tags: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping', 'Auto Layout'],
      date: 'January 2025',
      icon: '✈️',
      image: 'travel-agency.png',
      demoUrl: 'https://www.figma.com/proto/RJhgacjoXyfYKjCu4ZLgIL/Travel-Agentcy',
      codeUrl: 'https://github.com/haexptr'
    },
    {
      id: 2,
      title: 'School Admission Website',
      description: 'Responsive WordPress website for KBTK Aba Wage 25 Sidoarjo school admission system. Ensuring optimal accessibility across devices and implementing SEO optimization for better search engine visibility.',
      category: 'development',
      tags: ['WordPress', 'Responsive Design', 'SEO Optimization'],
      date: 'July - October 2024',
      icon: '🏫',
      image: 'school-website.png',
      demoUrl: 'https://kbtkabawage.sch.id/',
      codeUrl: 'https://github.com/haexptr'
    },
    {
      id: 3,
      title: 'KajianGenggam - Islamic Landing Page',
      description: 'Interactive Islamic-themed landing page with modern design and responsive layout. Built with focus on information delivery and user engagement across desktop and mobile devices.',
      category: 'development',
      tags: ['Frontend Development', 'Responsive Design', 'Interactive UI', 'Islamic Theme'],
      date: 'May 2025',
      icon: '🕌',
      image: 'kajian-genggam.png',
      demoUrl: 'https://kajian-genggam.vercel.app/',
      codeUrl: 'https://github.com/haexptr'
    },
    {
      id: 4,
      title: 'Academic System Backend',
      description: 'Developed modular architecture academic system using Object-Oriented Programming approach. Built interactive user interface with Vaadin and integrated backend with Spring Boot framework.',
      category: 'development',
      tags: ['Spring Boot', 'Vaadin', 'OOP', 'Backend Development', 'Java'],
      date: 'June - July 2025',
      icon: '🎓',
      image: 'academic-system.png',
      demoUrl: 'https://figma.com',
      codeUrl: 'https://github.com/haexptr'
    },
    {
      id: 5,
      title: 'Mobile App UX Design',
      description: 'Mobile application UX design project using CES Framework analysis and Functional/Non-Functional Analysis. Created innovative application concept and designed user interface prototypes.',
      category: 'design',
      tags: ['Mobile UX', 'User Research', 'Wireframing', 'Figma', 'CES Framework'],
      date: 'January - July 2023',
      icon: '📱',
      image: 'mobile-app-ux.png',
      demoUrl: 'https://www.figma.com/proto/gM7WSfiN17W6aOgIw4o3LG/CanteenOrder',
      codeUrl: 'https://github.com/haexptr'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'design', label: 'UI/UX Design', icon: Palette },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // WhatsApp Integration Function
  const handleStartProject = () => {
    const phoneNumber = '6281233116616'; // Your WhatsApp number
    const message = encodeURIComponent('Hello! I am interested in starting a project with you. Can we discuss further?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

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
            My <span className="text-cyan-400">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent projects in UI/UX design and web development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                filter === category.id
                  ? 'bg-cyan-400 text-gray-900 border-cyan-400'
                  : 'bg-gray-800/50 text-gray-300 border-gray-700/50 hover:border-cyan-400/50 hover:text-cyan-400'
              }`}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
            Interested in working together? Let's create something amazing!
          </p>
          <motion.button
            onClick={handleStartProject}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 
              text-gray-900 font-semibold rounded-lg transition-all duration-300 
              hover:from-cyan-300 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-400/25
              active:scale-95 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;