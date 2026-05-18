import React, { useState, useEffect } from 'react';
import { MdSearch, MdDelete, MdEmail, MdMoreVert, MdSchedule, MdCalendarToday, MdReply, MdRefresh, MdChevronLeft } from 'react-icons/md';
import * as api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminMessages({ search: searchTerm });
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = async (msg) => {
    try {
      const fullMsg = await api.getMessageById(msg._id);
      setSelectedMessage(fullMsg);
      if (msg.status === 'unread') {
        setMessages(messages.map(m => m._id === msg._id ? { ...m, status: 'read' } : m));
      }
    } catch (error) {
      console.error('Error selecting message:', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.deleteMessage(id);
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        alert('Failed to delete message');
      }
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.serviceInterested.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] flex flex-col gap-4 md:gap-6"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex-1 flex overflow-hidden relative">
        
        {/* Left Pane: Message List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 md:p-6 border-b border-gray-50">
            <div className="relative">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-[#fcfbf9] border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C41E24]/10 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-2xl text-[#C41E24]" /></div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center p-10 text-gray-400 italic text-sm">No messages found.</div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredMessages.map((msg) => (
                  <motion.div 
                    variants={itemVariants}
                    key={msg._id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`px-4 md:px-6 py-4 md:py-5 border-b border-gray-50 cursor-pointer transition-all relative ${
                      selectedMessage?._id === msg._id ? 'bg-[#fcfbf9]' : 'hover:bg-[#fcfbf9]/50'
                    }`}
                  >
                    {selectedMessage?._id === msg._id && (
                      <motion.div 
                        layoutId="active-msg"
                        className="absolute left-0 top-0 w-1 h-full bg-[#C41E24] hidden md:block"
                      ></motion.div>
                    )}
                    
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <h4 className={`text-sm md:text-[15px] truncate ${msg.status === 'unread' ? 'font-black text-[#1A1A1A]' : 'font-bold text-gray-500'}`}>
                          {msg.fullname}
                        </h4>
                        {msg.status === 'unread' && <span className="w-2 h-2 bg-[#C41E24] rounded-full shrink-0"></span>}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className={`text-xs md:text-sm mb-1 truncate ${msg.status === 'unread' ? 'font-bold text-[#1A1A1A]' : 'text-gray-500'}`}>
                      {msg.serviceInterested}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1 md:line-clamp-2 leading-relaxed">{msg.message}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Pane: Message Content */}
        <div className={`flex-1 flex flex-col bg-[#fcfbf9]/30 ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div 
                key={selectedMessage._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full bg-white md:bg-transparent"
              >
                {/* Header */}
                <div className="p-4 md:p-8 border-b border-gray-100 bg-white">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedMessage(null)}
                        className="md:hidden p-2 -ml-2 text-gray-400 hover:text-[#C41E24]"
                      >
                        <MdChevronLeft className="text-2xl" />
                      </motion.button>
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-lg md:text-xl font-black text-[#C41E24] shadow-sm shrink-0"
                      >
                        {selectedMessage.fullname[0]}
                      </motion.div>
                      <div className="overflow-hidden">
                        <h2 className="text-base md:text-xl font-black text-[#1A1A1A] truncate">{selectedMessage.serviceInterested}</h2>
                        <p className="text-xs md:text-sm font-bold text-gray-500 mt-0.5 truncate">
                          {selectedMessage.fullname} <span className="text-gray-300 font-normal hidden sm:inline">&lt;{selectedMessage.email}&gt;</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-4 text-gray-400 shrink-0">
                      <motion.button 
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteMessage(selectedMessage._id)}
                        className="p-2 transition-colors"
                      >
                        <MdDelete className="text-xl" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MdCalendarToday className="text-sm md:text-base" /> {new Date(selectedMessage.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><MdSchedule className="text-sm md:text-base" /> {new Date(selectedMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                  <div className="max-w-4xl">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#1A1A1A] text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium"
                    >
                      {selectedMessage.message}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 pt-8 border-t border-gray-100 space-y-2"
                    >
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Sender Information</p>
                      <p className="text-sm font-bold text-[#1A1A1A]">Email: <span className="text-gray-500 font-medium">{selectedMessage.email}</span></p>
                      <p className="text-sm font-bold text-[#1A1A1A]">Phone: <span className="text-gray-500 font-medium">{selectedMessage.phone}</span></p>
                    </motion.div>
                  </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 md:p-8 border-t border-gray-100 bg-white">
                  <div className="max-w-5xl mx-auto relative">
                    <textarea 
                      placeholder="Type your reply here..." 
                      className="w-full bg-[#fcfbf9] border border-gray-100 rounded-2xl p-4 md:p-6 min-h-[120px] md:min-h-[140px] outline-none focus:ring-2 focus:ring-[#C41E24]/10 transition font-medium text-sm md:text-base"
                    ></textarea>
                    <div className="flex justify-end mt-4 md:absolute md:bottom-4 md:right-4 md:mt-0">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => alert('Reply feature not implemented yet - send via email manually for now.')}
                        className="w-full md:w-auto bg-[#C41E24] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all text-[10px] md:text-xs uppercase tracking-widest"
                      >
                        <MdReply className="text-lg md:text-xl" /> Send Reply
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-6 p-10 text-center"
              >
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-sm border border-gray-50"
                >
                  <MdEmail className="opacity-20" />
                </motion.div>
                <p className="font-bold text-sm md:text-base">Select a message from the list to read its content</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Messages;
