import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getExpartsCard } from "../../services/api";

import ExpertsCard from "../../components/ExpertsCard";
import WhyChooseCard from "../../components/WhyChooseCard";

import { FaStar, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

import LivingRoom from "../../assets/Livingroom.jpg";


// Counter Component
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

    if (ref.current) observer.observe(ref.current);

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


const About = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const loadExperts = async () => {
      const data = await getExpartsCard();
      setExperts(data);
    };

    loadExperts();
  }, []);

  const features = [
    {
      title: "Excellence",
      description:
        "We deliver premium designs with exceptional attention to detail.",
      icon: <FaStar />,
    },
    {
      title: "Integrity",
      description:
        "Transparency and honesty guide every stage of our projects.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Reliability",
      description:
        "We meet deadlines and maintain consistent high-quality standards.",
      icon: <FaClock />,
    },
    {
      title: "Client-Centric",
      description:
        "Every design decision is tailored to your unique vision.",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="bg-[#f5f3f1] min-h-screen overflow-x-hidden">

      <div className="max-w-7xl mx-auto pt-40 pb-20 px-6">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Our Story
            </h1>

            <div className="text-[#7A7570] space-y-5 text-lg">
              <p>
                Founded in 2016, FactNG began with a vision to redefine
                luxury interior and exterior design in Nigeria.
              </p>

              <p>
                From a small Abuja office to projects across Abuja and Lagos,
                we have transformed hundreds of residential and commercial spaces.
              </p>

              <p className="text-gray-900 font-medium">
                We blend global design trends with African aesthetics to create
                spaces that are elegant, functional, and personal.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={LivingRoom}
              alt="Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>


        {/* MISSION / VISION */}
        <div className="bg-black rounded-3xl p-10 md:p-16 grid md:grid-cols-3 gap-10 mb-32 text-white">
          {[
            {
              title: "Mission",
              text: "To transform every space into a masterpiece."
            },
            {
              title: "Vision",
              text: "To lead African luxury design globally."
            },
            {
              title: "Values",
              text: "Integrity, excellence, and attention to detail."
            }
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>


        {/* STATS */}
        <div className="bg-white rounded-3xl shadow p-12 flex flex-wrap justify-center gap-10 mb-32 text-center">
          {[
            { label: "Projects", value: 150 },
            { label: "Years", value: 8 },
            { label: "Clients", value: 200 },
            { label: "Locations", value: 2 }
          ].map((stat, i) => (
            <div key={i}>
              <h1 className="text-red-600 text-4xl font-bold">
                <Counter value={stat.value} />+
              </h1>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* TEAM */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-10">
            Meet The Experts
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert, index) => (
              <ExpertsCard key={expert._id} {...expert} index={index} />
            ))}
          </div>
        </div>


        {/* WHY CHOOSE US */}
        <div className="bg-white rounded-3xl p-10 md:p-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <WhyChooseCard key={index} {...item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;