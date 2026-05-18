import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MdDashboard, 
  MdWork, 
  MdMessage, 
  MdSettings, 
  MdBusinessCenter,
  MdLogout,
  MdClose
} from 'react-icons/md';
import Logo from '../../assets/Fact NG Logo.png';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
    if (onClose) onClose();
  };

  const menuItems = [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
    { name: 'Projects', icon: <MdWork />, path: '/admin/projects' },
    { name: 'Messages', icon: <MdMessage />, path: '/admin/messages' },
    { name: 'CEO Settings', icon: <MdBusinessCenter />, path: '/admin/ceo-settings' },
    { name: 'Settings', icon: <MdSettings />, path: '/admin/settings' },
  ];

  return (
    <div className="h-full w-64 bg-white border-r border-gray-100 flex flex-col relative z-50">
      <div className="p-6 md:p-8 flex justify-between items-center">
        <motion.img 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          src={Logo} 
          alt="FactNG Logo" 
          className="h-8 md:h-10 lg:h-12" 
        />
        <button className="lg:hidden text-2xl text-gray-400 hover:text-red-600 transition-colors" onClick={onClose}>
          <MdClose />
        </button>
      </div>
      
      <nav className="flex-1 px-4 mt-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 mb-2 group ${
                  isActive 
                    ? 'bg-[#C41E24] text-white shadow-lg shadow-red-500/20' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]'
                }`
              }
            >
              <motion.span 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-xl shrink-0"
              >
                {item.icon}
              </motion.span>
              <span className="font-bold text-[15px]">{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <motion.button 
          whileHover={{ x: 5 }}
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-[#C41E24] transition-all duration-300"
        >
          <MdLogout className="text-xl" />
          <span className="font-bold text-[15px]">Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;