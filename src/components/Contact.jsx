import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Globe } from 'lucide-react';
import GlowButton from './GlowButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // FIXED: Send Message to Real Email
  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\n` +
      `Sent from Haex Putra Portfolio Website`
    );
    
    const mailtoLink = `mailto:haexputra@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Haexputra@gmail.com',
      href: 'mailto:Haexputra@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 812 3311 6616',
      href: 'tel:+6281233116616'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sidoarjo, Indonesia',
      href: '#'
    }
  ];

  // FIXED: Social Links with Instagram Added & Real Links
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/haexptr',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://id.linkedin.com/in/haexputra',
      color: 'hover:text-blue-400'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/xeahz/',
      color: 'hover:text-pink-400'
    },
    {
      icon: Globe,
      label: 'Website',
      href: 'https://haex-portfolio.vercel.app/',
      color: 'hover:text-green-400'
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
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 text-gray-300 hover:text-cyan-400 
                      transition-colors duration-300 group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center 
                      group-hover:bg-cyan-400/20 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FIXED: Social Links with Instagram */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center 
                      text-gray-400 transition-all duration-300 ${social.color}`}
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
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Quick Facts</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
                  <div className="text-gray-400 text-sm">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">Fast</div>
                  <div className="text-gray-400 text-sm">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
                  <div className="text-gray-400 text-sm">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">2+</div>
                  <div className="text-gray-400 text-sm">Years Exp</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg 
                      text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 
                      focus:ring-cyan-400/50 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg 
                      text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 
                      focus:ring-cyan-400/50 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg 
                    text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 
                    focus:ring-cyan-400/50 transition-all duration-300"
                  placeholder="Project inquiry"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg 
                    text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-1 
                    focus:ring-cyan-400/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              {/* FIXED: Send Message Button - Clean & Consistent */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 
                  text-gray-900 font-semibold rounded-lg transition-all duration-300 
                  hover:from-cyan-300 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-400/25
                  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="text-green-400 text-center text-sm bg-green-400/10 border border-green-400/20 
                    rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  className="text-red-400 text-center text-sm bg-red-400/10 border border-red-400/20 
                    rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ⚠ Please fill in all fields before sending.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;