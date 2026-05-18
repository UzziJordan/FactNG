import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { MdNotifications, MdAccountCircle, MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#fcfbf9] min-h-screen overflow-x-hidden">
      {/* Sidebar - Drawer for mobile, static for desktop */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 transform lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button 
              className="text-2xl text-gray-900 lg:hidden shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MdMenu />
            </button>
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#1A1A1A] truncate">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 lg:gap-6">
            <button className="text-xl md:text-2xl text-gray-400 hover:text-[#C41E24] transition relative shrink-0">
              <MdNotifications />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 lg:gap-3 border-l pl-2 md:pl-4 lg:pl-6 border-gray-100 overflow-hidden">
              <div className="text-right hidden sm:block shrink-0">
                <p className="text-xs md:text-sm font-bold text-[#1A1A1A]">Admin User</p>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">CEO</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#f5f3f1] rounded-full flex items-center justify-center text-xl md:text-2xl text-gray-400 shrink-0">
                <MdAccountCircle />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-10 min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;