import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Herobg from "../../assets/herobg.png";

import { useEffect, useState, useRef } from "react";
import { getFeaturedProjects } from "../../services/api";
import ProjectCard from "../../components/ProjectCard";
import TestimonialCard from "../../components/TestimonialCard";
import { useNavigate } from "react-router-dom";

const Counter = ({ value, duration = 3 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

useEffect(() => {
  const loadProjects = async () => {
    const data = await getFeaturedProjects();
    setProjects(data);
  };

  loadProjects();
}, []);

  return (
    
    <div style={{ fontFamily: " inter " }} className="relative bg-[#f5f3f1] overflow-x-hidden">
      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${Herobg})` }}
        className="z-0 relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-center px-4"
      >
        {/*Background Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60 z-10"></div>

        {/* Top Badge */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-[10vh] md:mt-12 bg-white/10 z-20 backdrop-blur-sm text-white border border-white text-[12px] md:text-[14px] font-medium rounded-4xl px-4 md:px-8 py-2"
        >
          Nigeria's Premier Decor Company
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white z-20 text-[40px] md:text-[96px] font-bold mt-6 leading-15 md:leading-24"
        >
          Transform Your Space <br />
          <span className="text-[#F4A3A6] italic">Into A Masterpiece</span>
        </motion.div>

        {/* Paragraph */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#D9D5D0] z-20 text-[18px] md:text-[20px] font-light mt-6 leading-7"
        >
          Elevating interiors and exteriors across Abuja and Lagos with unparalleled
          <br />
          luxury, functionality, and sophisticated design.
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex z-20 gap-4 mt-10 flex-wrap justify-center"
        >
          <button onClick={() => navigate('/portfolio')} className="bg-[#C41E24] px-8 py-2 text-white rounded-4xl text-[16px] font-medium hover:scale-105 transition">
            View Our Work →
          </button>

          <button onClick={() => navigate('/contact')} className="bg-transparent backdrop-blur-sm px-6 py-2 text-white rounded-4xl border border-white text-[16px] font-medium hover:scale-105 transition">
            Get Free Consultation →
          </button>
        </motion.div>
      </div>

      {/* Featured Projects */}
      <div className="bg-[#f5f3f1] py-24 px-6 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute top-10 -right-20 text-[200px] font-black text-gray-200/20 select-none pointer-events-none rotate-12 hidden lg:block">
          FACTNG
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[32px] md:text-[64px] font-bold text-gray-900 leading-tight"
          >
            The <span className="text-[#C41E24]">FactNG</span> Signature
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#7A7570] text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Explore our curated selection of high-end residential and commercial transformations across Nigeria.
          </motion.p>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} index={index} {...project} />
            ))}
          </div>

          {/* Bottom Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <button onClick={() => navigate('/portfolio')} className="text-red-500 font-semibold hover:underline">
              Explore All Projects →
            </button>
          </motion.div>

        </div>
      </div>

      {/* Stat Section */ }
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[#1A1A1A] flex flex-wrap justify-center gap-10 md:gap-30 p-8 items-center text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-[#C41E24] text-[36px] md:text-[48px] font-bold "><Counter value={150} />+</h1>
          <p className="text-[#7A7570] text-[14px] font-medium ">Projects Completed</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-[#C41E24] text-[36px] md:text-[48px] font-bold "><Counter value={8} />+</h1>
          <p className="text-[#7A7570] text-[14px] font-medium ">Years Experience</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-[#C41E24] text-[36px] md:text-[48px] font-bold "><Counter value={200} />+</h1>
          <p className="text-[#7A7570] text-[14px] font-medium ">Happy clients</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-[#C41E24] text-[36px] md:text-[48px] font-bold "><Counter value={2} /></h1>
          <p className="text-[#7A7570] text-[14px] font-medium ">Official Locations</p>
        </motion.div>
      </motion.div>

      {/*Cloents Story */}
      <div className=" items-center text-center mt-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[#1A1A1A] text-[32px] md:text-[48px] font-bold">Client Stories</h1>
          <p className="text-[14px] md:text-[16px] text-[#7A7570] mt-2">Hear what our clients have to say about their experience working with FactNG.</p>
        </motion.div>
        
        {/* Testimoial Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <TestimonialCard />
        </motion.div>
      </div>

      {/* Tranform Your Space */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[#C41E24] py-20 text-center mt-24 px-6"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[32px] md:text-[40px] text-white font-bold "
        >
          Ready to Transform Your Space?
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#F4A3A6] text-[14px] md:text-[16px] max-w-2xl md:max-w-[40vw] mx-auto mt-4"
        >
          Let's discuss your vision. Our team of experts is ready to bring your dream space to life.
        </motion.p>
        
        <motion.button 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/contact')}  
          className="text-[#C41E24] cursor-pointer mt-10 mx-auto bg-white py-4 px-8 rounded-4xl text-[16px] font-bold shadow-lg"
        >
          Chat with Us Now
        </motion.button>
      </motion.div>
      
    </div>
  );
};

export default Home;