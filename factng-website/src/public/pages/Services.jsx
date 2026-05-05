import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../../components/ServiceCard";
import HowWeWork from "../../components/HowWeWork";

import servicebg from "../../assets/servicebg.svg"
import {
  FaCouch,
  FaHome,
  FaHammer,
  FaRulerCombined,
  FaChair,
  FaBriefcase,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Interior Design",
      description:
        "Transforming living rooms, bedrooms, and kitchens into luxurious, functional spaces tailored to your lifestyle.",
      icon: <FaCouch />,
    },
    {
      title: "Exterior Design",
      description:
        "Elevating facades, landscaping, and outdoor living areas to create stunning first impressions.",
      icon: <FaHome />,
    },
    {
      title: "Renovation & Remodeling",
      description:
        "Breathing new life into existing structures with modern updates and structural improvements.",
      icon: <FaHammer />,
    },
    {
      title: "Space Planning",
      description:
        "Optimizing layouts for maximum efficiency, flow, and aesthetic appeal in residential and commercial spaces.",
      icon: <FaRulerCombined />,
    },
    {
      title: "Furniture Sourcing",
      description:
        "Curating and procuring bespoke furniture and decor pieces that perfectly complement your design.",
      icon: <FaChair />,
    },
    {
      title: "Project Management",
      description:
        "Overseeing every detail from concept to completion, ensuring quality, timeline, and budget adherence.",
      icon: <FaBriefcase />,
    },
  ];

  return (
    <div style={{ fontFamily: " inter " }} className="bg-[#f5f3f1] min-h-screen overflow-x-hidden">
      
      {/* Header Section */}
      <motion.div 
        style={{ backgroundImage: `url(${servicebg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center text-center bg-center bg-cover pt-20"
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="relative z-20 px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="text-5xl md:text-[100px] font-bold text-white mb-8 leading-none"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[#D1D5DB] text-xl md:text-[28px] font-light leading-relaxed max-w-3xl mx-auto"
          >
            Comprehensive design and execution solutions for residential and commercial spaces.
          </motion.p>
        </div>
      </motion.div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-12"
      >
        <HowWeWork />
      </motion.div>

    </div>
  );
};

export default Services;