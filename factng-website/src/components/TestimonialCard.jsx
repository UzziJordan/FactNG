import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import qoute from "../assets/qoute.svg"

const TestimonialCard = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      text: "FactNG completely transformed our living space. Their attention to detail and understanding of modern African aesthetics is unmatched.",
      name: "Amina Bello",
      role: "Homeowner",
    },
    {
      text: "Working with FactNG on our commercial properties has been a game-changer. They deliver luxury on time and within budget.",
      name: "Chukwudi Okafor",
      role: "Real Estate Developer",
    },
    {
      text: "The interior design for my store exceeded all expectations. It perfectly captures the essence of my brand.",
      name: "Folake Adeyemi",
      role: "Boutique Owner",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-[#f5f5f5] relative shadow-xl rounded-2xl p-6 md:p-12 text-center max-w-4xl mx-auto overflow-hidden">
      
      {/* Quote */}
      <div className="absolute top-6 left-6 opacity-20 md:opacity-100"> 
        <img src={ qoute } alt="" className="w-10 md:w-16" /> 
      </div>

      {/* Stars */}
      <div className="flex justify-center mt-6 mb-5 text-[24px] md:text-[30px] gap-1 text-yellow-500">
        {Array(5).fill().map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Text with Animation */}
      <div className="min-h-37.5 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <p className="text-lg md:text-[24px] font-medium text-gray-800 mb-6 italic leading-relaxed">
              "{testimonials[index].text}"
            </p>

            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-semibold text-lg md:text-xl"
            >
              {testimonials[index].name}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm md:text-base"
            >
              {testimonials[index].role}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative h-3 focus:outline-none cursor-pointer"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            {/* Background Dot */}
            <div className="absolute inset-0 w-3 h-3 bg-gray-300 rounded-full" />
            
            {/* Active Dot with Width Animation */}
            <motion.div
              initial={false}
              animate={{
                width: i === index ? 32 : 12,
                backgroundColor: i === index ? "#C41E24" : "#D1D5DB",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-3 rounded-full relative z-10"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;