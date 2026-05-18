import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getOffices, getSocialLinks, getCompanyInfo } from "../services/api";

import logo from '../assets/Fact NG Logo.png'

const Footer = () => {
  const [offices, setOffices] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({
    phone: '+234 800 FACT NG',
    email: 'hello@factng.com'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officesData, socialData, infoData] = await Promise.all([
          getOffices(),
          getSocialLinks(),
          getCompanyInfo()
        ]);
        setOffices(officesData);
        setSocialLinks(socialData);
        if (infoData) setCompanyInfo(infoData);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchData();
  }, []);

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <FaInstagram />;
      case 'facebook': return <FaFacebookF />;
      case 'twitter':
      case 'x': return <FaTwitter />;
      case 'whatsapp': return <FaWhatsapp />;
      case 'tiktok': return <FaTiktok />;
      default: return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-[#0f1115] text-gray-400 pt-20 pb-10 px-6 md:px-16 overflow-hidden">
      
      {/* Top Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
      >

        {/* Logo + Description */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/5 w-fit p-3 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
            <img src={ logo } alt="FactNG" className="h-10 object-contain" />
          </div>

          <p className="text-sm leading-relaxed mb-8 max-w-xs">
            Transforming spaces into masterpieces. Nigeria's premier interior and exterior decor company, delivering luxury and functionality since 2016.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, backgroundColor: "#C41E24", color: "#fff" }}
                className="bg-white/5 p-3 rounded-full transition-colors duration-300 border border-white/5"
              >
                {getSocialIcon(social.platform)}
              </motion.a>
            ))}
            {socialLinks.length === 0 && (
              <>
                <div className="bg-white/5 p-3 rounded-full border border-white/5"><FaInstagram /></div>
                <div className="bg-white/5 p-3 rounded-full border border-white/5"><FaFacebookF /></div>
                <div className="bg-white/5 p-3 rounded-full border border-white/5"><FaTwitter /></div>
              </>
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#C41E24]"></span>
            Quick Links
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            {["Home", "Services", "Portfolio", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#C41E24]"></span>
            Our Services
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            {[
              "Interior Design",
              "Exterior Design",
              "Renovation",
              "Space Planning",
              "Consultation"
            ].map((service) => (
              <li key={service} className="hover:text-white transition-colors duration-300 cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#C41E24]"></span>
            Contact Us
          </h3>

          <div className="space-y-6 text-sm font-medium">
            {offices.map((office, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer">
                <div className="bg-white/5 p-3 rounded-xl text-[#C41E24] h-fit group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                  <FiMapPin />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">{office.name}</p>
                  {office.addresses.map((addr, i) => (
                    <p key={i} className="text-xs text-gray-500">{addr.address}</p>
                  ))}
                </div>
              </div>
            ))}

            {offices.length === 0 && (
              <div className="flex gap-4 group cursor-pointer">
                <div className="bg-white/5 p-3 rounded-xl text-[#C41E24] h-fit group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                  <FiMapPin />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Abuja HQ</p>
                  <p className="text-xs text-gray-500">Wuse 2, Abuja, Nigeria</p>
                </div>
              </div>
            )}

            <div className="flex gap-4 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl text-[#C41E24] h-fit group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                <FiPhone />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Call Us</p>
                <p className="text-xs text-gray-500">{companyInfo.phone}</p>
              </div>
            </div>

            <div className="flex gap-4 group cursor-pointer">
              <div className="bg-white/5 p-3 rounded-xl text-[#C41E24] h-fit group-hover:bg-[#C41E24] group-hover:text-white transition-all duration-300">
                <FiMail />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Email</p>
                <p className="text-xs text-gray-500">{companyInfo.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/5 p-3 rounded-xl text-[#C41E24] h-fit">
                <MdRefresh />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Working Hours</p>
                <p className="text-xs text-gray-500">{companyInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-wider uppercase"
      >
        <p className="text-gray-500 mb-4 md:mb-0">© 2026 FactNG Interior & Exterior Decor. All rights reserved.</p>

        <div className="flex gap-8 text-gray-500">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </motion.div>

    </footer>
  );
};

export default Footer;