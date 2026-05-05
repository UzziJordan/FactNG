import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProjects } from "../../services/api";
import ProjectCard from "../../components/ProjectCard";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Interior", "Exterior", "Commercial", "Renovation"];

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // ✅ Compute filtered projects (no extra state needed)
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="pt-24 pb-20 px-6 bg-[#f5f3f1] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mt-10 font-bold text-gray-900 mb-4">
            Our Portfolio
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of high-end interior, exterior, and renovation projects across Nigeria.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer active:scale-95 ${
                activeFilter === filter
                  ? "bg-[#C41E24] text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>

            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-red-500 underline"
            >
              Show all projects
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;