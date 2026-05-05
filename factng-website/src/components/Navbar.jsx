import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../assets/Fact NG Logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar appearance
  // If not on homepage, ALWAYS show background and black text
  const showWhiteNav = !isHomePage || scrolled;
  const navBackground = showWhiteNav ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent";
  const textColor = showWhiteNav ? "text-gray-900" : "text-white";
  const hamburgerColor = showWhiteNav ? "text-gray-900" : "text-white";

  return (
    <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBackground}`}
        >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 md:py-5">
        
        {/* Logo & Brand Name */}
        <Link 
          to="/"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={Logo}
            alt="FactNG Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-300 ${textColor}`}>
            FACT<span className="text-[#C41E24]">NG</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-bold relative">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#C41E24]"
                    : `${textColor} hover:text-[#C41E24] transition-colors duration-300`
                }
              >
                {item.name}
              </NavLink>

              {/* Animated underline */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#C41E24]"
                />
              )}
            </li>
          ))}
        </ul>

        {/* WhatsApp Button */}
        <div className="hidden md:block">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/234XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C41E24] text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-200 transition-all inline-block"
          >
            WhatsApp Us
          </motion.a>
        </div>

        {/* Hamburger */}
        <div
          className={`md:hidden text-3xl cursor-pointer transition-colors duration-300 ${hamburgerColor}`}
          onClick={() => setIsOpen(true)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] bg-white z-70 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-2">
                     <img src={Logo} alt="FactNG" className="h-10 object-contain" />
                     <span className="text-xl font-black text-gray-900 tracking-tighter">FACT<span className="text-[#C41E24]">NG</span></span>
                   </div>
                   <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-900">×</button>
                </div>

                <motion.ul 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="flex flex-col gap-6"
                >
                  {navItems.map((item) => (
                    <motion.li 
                      key={item.path}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => 
                          `text-2xl font-bold transition-colors ${isActive ? "text-[#C41E24]" : "text-gray-900"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-auto mb-6">
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/234XXXXXXXXXX"
                    className="bg-[#C41E24] text-white py-4 rounded-2xl block text-center font-bold text-lg shadow-lg shadow-red-100"
                  >
                    Get a Quote
                  </motion.a>
                  <p className="text-center text-gray-400 text-sm mt-6 font-medium">© 2026 FactNG Decor</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;