import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { GLOBAL_LINKS } from '../constants'; // Linkleri buradan çekiyoruz

const Hero: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 lg:py-40 text-center px-4 overflow-hidden perspective-1000">
      
      {/* Pulsar Core Graphic - Gyroscopic Design */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
        className="relative mb-20 w-64 h-64 flex items-center justify-center"
      >
        {/* Floating Container to give weightlessness */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-full h-full will-change-transform"
        >
            {/* Outer Ring - Slow, elliptical */}
            <motion.div 
                className="absolute w-64 h-64 border-[1px] border-zinc-800 rounded-full opacity-40 will-change-transform"
                style={{ rotateX: 60 }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle Ring - Off-axis rotation */}
            <motion.div 
                className="absolute w-48 h-48 border-[1px] border-zinc-600/60 rounded-full will-change-transform"
                animate={{ rotateZ: -360, rotateX: [45, -45, 45], rotateY: [10, -10, 10] }}
                transition={{ 
                    rotateZ: { duration: 15, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Inner Ring - Fast, opposing rotation */}
            <motion.div 
                className="absolute w-36 h-36 border-2 border-dashed border-white/20 rounded-full will-change-transform"
                animate={{ rotateZ: 360, rotateY: 180 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* The Core Star */}
            <div className="relative z-10 flex items-center justify-center">
                {/* Massive Soft Glow - Enhanced Size & Blend Mode for Dark Mode Safety */}
                <motion.div 
                    className="absolute bg-white blur-[60px] rounded-full mix-blend-screen will-change-transform"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      // @ts-ignore - Explicitly force browser to not invert this color
                      forcedColorAdjust: 'none',
                    }}
                    animate={{ 
                      opacity: [0.2, 0.7, 0.2], 
                      scale: [0.8, 2.5, 0.8] // Increased scale for larger outward pulse
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Sharp Core - Force White via style to override extensions */}
                <motion.div 
                    className="w-12 h-12 !bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)] relative z-20 mix-blend-plus-lighter will-change-transform"
                    style={{ 
                      backgroundColor: '#ffffff',
                      // @ts-ignore
                      forcedColorAdjust: 'none', 
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Vertical Energy Beams */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-64 bg-gradient-to-b from-transparent via-white to-transparent opacity-50 blur-[1px] mix-blend-screen will-change-transform"
                    animate={{ opacity: [0.3, 0.8, 0.3], height: ["100%", "160%", "100%"] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }} // Super fast flicker
                />
            </div>
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-7xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-tighter mb-6 drop-shadow-2xl"
      >
        PULSAR
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
        className="h-1 rounded-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent mb-8"
      />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-3 text-sm font-mono text-zinc-500 border border-zinc-800/80 rounded-full px-5 py-2 bg-zinc-950/50 backdrop-blur-md shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          SYSTEM OPERATIONAL
        </div>

        <p className="max-w-xl text-zinc-400 text-lg md:text-xl leading-relaxed font-medium tracking-wide">
          Central command for distributed repositories.
          <br/>
          <span className="text-zinc-600 text-sm">v2.4.0 // STABLE BUILD</span>
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12"
      >
        <a 
          href={GLOBAL_LINKS.HERO_BUTTON} // Güncellendi: Artık constants.ts'den alıyor
          target="_blank" 
          rel="noreferrer"
          className="group relative px-8 py-4 overflow-hidden rounded-full bg-zinc-950 border border-zinc-800 text-white font-bold transition-all hover:border-zinc-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 inline-flex items-center gap-2"
        >
            <Github size={20} className="group-hover:text-white transition-colors" />
            <span className="relative z-10">ACCESS GITHUB</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;