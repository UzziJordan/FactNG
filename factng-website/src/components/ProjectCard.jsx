import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ image, category, name, location, index = 0 }) => {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover="hover"
      variants={{
        hover: { scale: 1.02 }
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >

      {/* Image Container */}
      <div className="overflow-hidden h-64">
        <motion.img
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.4 }}
          src={typeof image === 'object' ? image.url : image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="p-5 text-start">
        <p className="text-red-500 text-[16px] font-semibold mb-1">{category}</p>

        <h3 className="text-[22px] font-bold text-gray-900">
          {name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {location}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;