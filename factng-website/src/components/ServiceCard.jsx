import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ icon, title, description }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate("/contact")}
      whileHover="hover"
      variants={{
        hover: { y: -10, scale: 1.02 }
      }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full cursor-pointer group"
    >
      
      {/* Top Content */}
      <div>
        <motion.div 
          variants={{
            hover: { scale: 1.2, rotate: 5 }
          }}
          className="text-red-600 text-3xl mb-6 bg-red-50 w-fit p-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300"
        >
          {icon}
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {title}
        </h3>

        <p className="text-[#7A7570] text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Link */}
      <div className="mt-8 text-sm font-bold text-gray-900 flex items-center gap-2">
        <span className="group-hover:text-red-600 transition-colors">Get Started</span>
        <motion.span 
          variants={{
            hover: { x: 5 }
          }}
          className="text-red-600"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ServiceCard;