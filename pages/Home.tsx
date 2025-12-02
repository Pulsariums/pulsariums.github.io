import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../constants';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = PROJECTS.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 pb-20 max-w-7xl">
      <Hero />
      
      {/* Search Bar - Material Style */}
      <div className="max-w-xl mx-auto mb-20 relative z-20">
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-white transition-colors" strokeWidth={2.5} />
            </div>
            <input
            type="text"
            placeholder="Search Database..."
            className="w-full pl-14 pr-6 py-4 bg-zinc-950/80 backdrop-blur-xl border-2 border-zinc-800 rounded-full text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all font-display font-medium text-lg shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-block px-8 py-6 rounded-2xl border-2 border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
            <p className="text-zinc-500 font-mono font-bold">ERROR 404: SIGNAL NOT FOUND</p>
          </div>
        </motion.div>
      )}

      <footer className="mt-40 border-t-2 border-zinc-900 pt-10 text-center pb-10">
        <p className="text-zinc-600 text-xs font-mono tracking-[0.2em] uppercase font-bold">
          Pulsar Hub // System Operational // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;