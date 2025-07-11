import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Layers, Star, ExternalLink, Github, ArrowRight } from 'lucide-react';
import GlowButton from './GlowButton';

// ============ PROJECT CARD COMPONENT ============
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
      <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-cyan-400/30">{project.icon}</div>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent 
                flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlowButton variant="secondary" className="text-sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </GlowButton>
              <GlowButton variant="ghost" className="text-sm">
                <Github className="w-4 h-4 mr-2" />
                Code
              </GlowButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
        
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
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{project.date}</span>
          <div className="flex space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============ PORTFOLIO COMPONENT ============
const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Travel Agency Website UI/UX',
      description: 'Complete UI/UX design for travel agency website including homepage, destination listings, booking system, and user dashboard.',
      category: 'design',
      tags: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping'],
      date: 'January 2025',
      rating: 5,
      icon: '✈️',
    },
    {
      id: 2,
      title: 'School Admission Website',
      description: 'Responsive WordPress website for KBTK Aba Wage 25 Sidoarjo school admission system.',
      category: 'development',
      tags: ['WordPress', 'PHP', 'Responsive Design', 'SEO'],
      date: 'July - October 2024',
      rating: 4,
      icon: '🏫',
    },
    {
      id: 3,
      title: 'Mobile App UX Design',
      description: 'Mobile application UX design project using CES Framework analysis.',
      category: 'design',
      tags: ['Mobile UX', 'User Research', 'Wireframing', 'Figma'],
      date: 'January - July 2023',
      rating: 4,
      icon: '📱',
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
          <p className="text-gray-400 mb-6">
            Interested in working together? Let's create something amazing!
          </p>
          <GlowButton variant="primary">
            Start a Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;