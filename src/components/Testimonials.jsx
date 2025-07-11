import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// ============ TESTIMONIAL CARD COMPONENT ============
const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 
        ${isActive ? 'border-cyan-400/50 scale-105' : ''} transition-all duration-500`}
      animate={{
        scale: isActive ? 1.05 : 1,
        opacity: isActive ? 1 : 0.7,
      }}
    >
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full 
          flex items-center justify-center text-white font-bold text-xl">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-bold">{testimonial.name}</h4>
          <p className="text-cyan-400">{testimonial.role}</p>
          <p className="text-gray-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
      
      <p className="text-gray-300 italic mb-4">"{testimonial.content}"</p>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-500 text-sm">{testimonial.date}</span>
      </div>
    </motion.div>
  );
};

// ============ TESTIMONIALS COMPONENT ============
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TechCorp Solutions',
      content: 'Tri delivered exceptional UI/UX designs that exceeded our expectations. His attention to detail and understanding of user experience principles made our project a huge success.',
      rating: 5,
      date: 'February 2024'
    },
    {
      name: 'Muhammad Rizki',
      role: 'Lead Developer',
      company: 'Digital Agency',
      content: 'Working with Tri on the WordPress project was a pleasure. His code quality and responsiveness to feedback made the development process smooth and efficient.',
      rating: 5,
      date: 'October 2024'
    },
    {
      name: 'Dr. Siti Aminah',
      role: 'Principal',
      company: 'KBTK Aba Wage 25',
      content: 'The school website Tri developed for us has significantly improved our admission process. Parents love the user-friendly interface and online registration system.',
      rating: 4,
      date: 'September 2024'
    },
    {
      name: 'Alex Chen',
      role: 'Startup Founder',
      company: 'InnovateTech',
      content: 'Tri\'s design thinking and technical skills helped us create a brand identity that truly represents our vision. His creative approach and professional execution made all the difference.',
      rating: 5,
      date: 'March 2024'
    }
  ];

  // Fix: Use useCallback to memoize the function
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Fix: Include nextTestimonial in dependency array
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

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
            Client <span className="text-cyan-400">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What clients and collaborators say about working with me. These testimonials reflect 
            my commitment to delivering exceptional results.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 
                hover:border-cyan-400/50 transition-all duration-300"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 
                hover:border-cyan-400/50 transition-all duration-300"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Counter */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              {currentIndex + 1} of {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;