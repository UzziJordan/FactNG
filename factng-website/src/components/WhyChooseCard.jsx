import React from "react";
import { motion } from "framer-motion";

const WhyChooseCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover="hover"
      variants={{
        hover: { y: -10, scale: 1.05 }
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-4xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 text-center border border-gray-50 group"
    >
      
      {/* Icon */}
      <motion.div 
        variants={{
          hover: { scale: 1.2, rotate: 10 }
        }}
        className="text-red-600 text-4xl mb-6 flex justify-center group-hover:text-red-500 transition-colors"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default WhyChooseCard;