import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold font-futuristic mb-4">
              <span className="text-white">TRI</span>
              <span className="text-cyan-400">.</span>
              <span className="text-white">DEV</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating innovative digital solutions through the perfect blend of design and technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Globe, href: '#', label: 'Behance' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center 
                    text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Portfolio', 'Contact'].map((link, index) => (
                <motion.a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>📍 Sidoarjo, Indonesia</p>
              <p>✉️ Haexputra@gmail.com</p>
              <p>📞 +62 812 3311 6616</p>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">3.60</div>
                <div className="text-gray-400 text-xs">GPA</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">50+</div>
                <div className="text-gray-400 text-xs">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Tri Wahyudi Ha Ex Saputra. All rights reserved. Made with{' '}
            <span className="text-red-400">❤️</span> and{' '}
            <span className="text-cyan-400">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;