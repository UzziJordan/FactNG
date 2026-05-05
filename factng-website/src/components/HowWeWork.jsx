import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    desc: "We discuss your vision, budget, and timeline to understand your unique needs.",
  },
  {
    number: "02",
    title: "Design Concept",
    desc: "Our team creates detailed 3D renderings and mood boards for your approval.",
  },
  {
    number: "03",
    title: "Execution",
    desc: "Skilled artisans and contractors bring the design to life under our strict supervision.",
  },
  {
    number: "04",
    title: "Final Delivery",
    desc: "A thorough walkthrough ensures every detail meets our luxury standards before handover.",
  },
];

const HowWeWork = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-16 text-center overflow-hidden relative">
      {/* Subtle Watermark */}
      <div className="absolute -bottom-10 -left-10 text-[150px] font-black text-gray-100/50 select-none pointer-events-none -rotate-12 hidden lg:block">
        FACTNG
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-6xl font-black text-gray-900 mb-6 relative z-10"
      >
        The <span className="text-[#C41E24]">FactNG</span> Process
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[#7A7570] max-w-2xl mx-auto mb-20 text-lg"
      >
        A seamless, transparent process designed to deliver exceptional results without the stress.
      </motion.p>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto">
        
        {/* Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200 origin-left"
        ></motion.div>

        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3 + (index * 0.2) 
            }}
            className="relative z-10 text-center flex-1"
          >
            
            {/* Circle */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-xl border border-gray-50 flex items-center justify-center text-[#C41E24] text-xl font-bold"
            >
              {step.number}
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {step.title}
            </h3>

            {/* Desc */}
            <p className="text-[#7A7570] leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;