import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  MdWork, 
  MdCheckCircle, 
  MdEmail, 
  MdTrendingUp,
  MdAdd,
  MdMessage,
  MdRefresh
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    unreadMessages: 0,
    totalContacts: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, projectsData, messagesData] = await Promise.all([
        api.getDashboardStats(),
        api.getRecentProjects(),
        api.getRecentMessages()
      ]);
      setStats(statsData);
      setRecentProjects(projectsData);
      setRecentMessages(messagesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const chartData = [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 3 },
    { month: 'Mar', count: 5 },
    { month: 'Apr', count: 4 },
    { month: 'May', count: 10 },
    { month: 'Jun', count: 7 },
    { month: 'Jul', count: 8 },
    { month: 'Aug', count: 13 },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <MdRefresh className="animate-spin text-4xl text-[#C41E24]" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">Welcome back, Admin</h1>
          <p className="text-sm md:text-base text-[#7A7570] mt-1">Here's what's happening with FactNG today.</p>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/messages')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm text-sm"
          >
            <MdMessage className="text-lg md:text-xl" />
            Messages
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/projects')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#C41E24] text-white rounded-xl font-bold hover:scale-105 transition shadow-lg shadow-red-500/30 text-sm"
          >
            <MdAdd className="text-xl md:text-2xl" />
            Add Project
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Projects" 
          value={stats.totalProjects} 
          icon={<MdWork />} 
          iconColor="text-blue-600" 
          bgColor="bg-blue-50" 
          delay={0}
        />
        <StatCard 
          title="Published" 
          value={stats.publishedProjects} 
          icon={<MdCheckCircle />} 
          iconColor="text-emerald-600" 
          bgColor="bg-emerald-50" 
          delay={0.1}
        />
        <StatCard 
          title="Unread" 
          value={stats.unreadMessages} 
          icon={<MdEmail />} 
          iconColor="text-red-600" 
          bgColor="bg-red-50" 
          delay={0.2}
        />
        <StatCard 
          title="Contacts" 
          value={stats.totalContacts} 
          icon={<MdTrendingUp />} 
          iconColor="text-amber-600" 
          bgColor="bg-amber-50" 
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
            <h2 className="text-lg md:text-xl font-black text-[#1A1A1A]">Projects Overview</h2>
            <select className="bg-[#f5f3f1] border-none rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold focus:ring-0 w-full sm:w-auto">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#7A7570', fontSize: 10, fontWeight: 500}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#7A7570', fontSize: 10, fontWeight: 500}} 
                />
                <Tooltip 
                  cursor={{fill: '#fcfbf9'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '12px'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 768 ? 20 : 40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#C41E24' : '#e5e1dc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div variants={itemVariants} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-black text-[#1A1A1A]">Recent Projects</h2>
            <button 
              onClick={() => navigate('/admin/projects')}
              className="text-[#C41E24] text-xs md:text-sm font-bold hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-5 md:space-y-6">
            {recentProjects.length === 0 ? (
              <p className="text-center py-10 text-gray-400 italic text-sm">No projects yet.</p>
            ) : (
              recentProjects.map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  key={project._id} 
                  className="group relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-bold text-[#1A1A1A] group-hover:text-[#C41E24] transition-colors text-sm truncate">
                        {project.name}
                      </h4>
                      <p className="text-xs text-[#7A7570] font-medium truncate">{project.client || project.location}</p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black uppercase tracking-wider shrink-0 ml-2 ${
                      project.isPublished ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                    }`}>
                      {project.isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  {project._id !== recentProjects[recentProjects.length - 1]._id && (
                    <div className="mt-5 md:mt-6 border-b border-gray-50"></div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Messages Section */}
      <motion.div variants={itemVariants} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-black text-[#1A1A1A]">Recent Messages</h2>
            {stats.unreadMessages > 0 && (
              <span className="bg-red-100 text-[#C41E24] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {stats.unreadMessages} New
              </span>
            )}
          </div>
          <button 
            onClick={() => navigate('/admin/messages')}
            className="text-[#C41E24] text-xs md:text-sm font-bold hover:underline"
          >
            Go to Inbox →
          </button>
        </div>
        
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-[9px] font-black uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4 px-2">Sender</th>
                <th className="pb-4 px-2">Service / Subject</th>
                <th className="pb-4 px-2">Date</th>
                <th className="pb-4 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentMessages.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400 italic text-sm">No messages yet.</td>
                </tr>
              ) : (
                recentMessages.map((msg, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + (idx * 0.05) }}
                    key={msg._id} 
                    className="group hover:bg-[#fcfbf9] transition-colors"
                  >
                    <td className="py-4 px-2 font-bold text-[#1A1A1A] text-xs md:text-sm">{msg.fullname}</td>
                    <td className="py-4 px-2 text-xs md:text-sm text-[#7A7570] font-medium">{msg.serviceInterested}</td>
                    <td className="py-4 px-2 text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={`text-[9px] px-2 py-1 rounded-xl font-black uppercase tracking-widest ${
                        msg.status === 'unread' ? 'bg-red-100 text-[#C41E24]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, iconColor, bgColor, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-4 md:p-8 rounded-xl md:rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#C41E24]/20 transition-all duration-300"
  >
    <div className="space-y-0.5 md:space-y-2 overflow-hidden">
      <p className="text-[#7A7570] text-[9px] md:text-sm font-bold uppercase tracking-wider truncate">{title}</p>
      <h3 className="text-xl md:text-4xl font-black text-[#1A1A1A] truncate">
        {value}
      </h3>
    </div>
    <motion.div 
      whileHover={{ rotate: [0, -10, 10, 0] }}
      className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl ${bgColor} flex items-center justify-center text-xl md:text-3xl ${iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0 ml-2`}
    >
      {icon}
    </motion.div>
  </motion.div>
);

export default Dashboard;
