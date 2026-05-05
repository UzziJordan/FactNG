import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaPaperPlane, FaChevronDown } from "react-icons/fa";

const Contact = () => {
  const services = [
    "Interior Design",
    "Exterior Design",
    "Renovation & Remodeling",
    "Space Planning",
    "Furniture Sourcing",
    "Project Management"
  ];

  return (
    <div style={{ fontFamily: " inter " }} className="bg-[#f5f3f1] min-h-screen pt-40 pb-24 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">Let's Create Your <br /> <span className="text-[#C41E24]">Dream Space.</span></h1>
          <p className="text-[#7A7570] text-xl max-w-2xl leading-relaxed">
            Whether you're looking to transform a single room or an entire building, our team of experts is ready to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-50"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-[#f9f9f9] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition-all text-gray-900"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+234 ..."
                    className="w-full bg-[#f9f9f9] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition-all text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-[#f9f9f9] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition-all text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Service Interest</label>
                <div className="relative">
                  <select className="w-full bg-[#f9f9f9] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition-all text-gray-900 appearance-none cursor-pointer">
                    <option value="" disabled selected>Select our services</option>
                    {services.map((service, i) => (
                      <option key={i} value={service}>{service}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Your Message</label>
                <textarea 
                  rows="5"
                  placeholder="Tell us about your project vision..."
                  className="w-full bg-[#f9f9f9] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition-all text-gray-900 resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#C41E24] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-red-200 transition-all"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Assistance & Info */}
          <div className="space-y-8">
            
            {/* Assistance Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#111] rounded-[40px] p-10 text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Our support team is available for real-time chat via WhatsApp. We usually respond within 15 minutes.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg mb-12 shadow-lg shadow-green-900/20 transition-all"
              >
                <FaWhatsapp className="text-2xl" />
                Chat on WhatsApp
              </motion.button>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl text-[#C41E24]">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Abuja Office</h4>
                    <p className="text-gray-400 leading-relaxed">Suite 302, Grand Square Building, <br /> Wuse 2, Federal Capital Territory.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl text-[#C41E24]">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Lagos Office</h4>
                    <p className="text-gray-400 leading-relaxed">Plot 12, Admiralty Way, <br /> Victoria Island, Lagos State.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-[40px] p-10 shadow-xl shadow-gray-200/50 border border-gray-50 grid gap-8"
            >
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="bg-[#f9f9f9] p-4 rounded-2xl text-[#C41E24] group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us Anywhere</p>
                  <p className="text-xl font-bold text-gray-900">+234 (0) 800 FACT NG</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="bg-[#f9f9f9] p-4 rounded-2xl text-[#C41E24] group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-xl font-bold text-gray-900">hello@factng.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[#f9f9f9] p-4 rounded-2xl text-[#C41E24]">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                  <p className="text-xl font-bold text-gray-900">Mon - Fri: 8am - 6pm</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;