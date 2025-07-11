import React, { useState, useEffect } from 'react';

const ParticleField = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: ['#00f5ff', '#bf00ff', '#39ff14'][Math.floor(Math.random() * 3)],
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let animationId;
    
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Wrap around screen edges
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup animation frame
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 particle-container"
      style={{ 
        cursor: 'none',
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-40 pointer-events-none particle-dot"
          style={{
            left: particle.x + 'px',
            top: particle.y + 'px',
            width: particle.size + 'px',
            height: particle.size + 'px',
            background: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
            cursor: 'none',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;