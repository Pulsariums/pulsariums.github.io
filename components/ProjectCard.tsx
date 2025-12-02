import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Terminal, Cpu, Globe, Database, Zap, Layout, Box } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const icons = {
  Code,
  Terminal,
  Cpu,
  Globe,
  Database,
  Zap,
  Layout,
  Box
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const IconComponent = icons[project.iconName] || Code;

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block p-8 h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:border-zinc-500/50 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]"
    >
      {/* Dynamic Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Featured Indicator */}
      {project.featured && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-zinc-800/50 backdrop-blur-md z-20">
           <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-display group-hover:text-white transition-colors">Core</span>
           <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full mt-2">
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/50">
          <IconComponent size={28} strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl font-display font-bold text-zinc-100 mb-3 group-hover:translate-x-1 transition-transform duration-300">
          {project.name}
        </h3>
        
        <p className="text-zinc-500 text-sm mb-8 flex-grow leading-relaxed font-medium group-hover:text-zinc-400 transition-colors">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-800/50 group-hover:border-zinc-700/50 transition-colors">
          <span className="text-xs font-bold font-mono text-zinc-600 group-hover:text-zinc-300 transition-colors tracking-widest">LAUNCH</span>
          <div className="bg-zinc-950 rounded-full p-2 group-hover:bg-white group-hover:text-black transition-colors duration-300 border border-zinc-800 group-hover:border-white">
             <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-black transition-colors duration-300" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;