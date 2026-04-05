import { motion } from 'motion/react';

export const Confetti = () => {
  const particles = Array.from({ length: 40 });
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: '50vw', 
            y: '50vh', 
            scale: 0,
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`, 
            scale: Math.random() * 1.5 + 0.5,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: Math.random() * 0.2
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ 
            backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#facc15', '#ec4899'][Math.floor(Math.random() * 5)] 
          }}
        />
      ))}
    </div>
  );
};
