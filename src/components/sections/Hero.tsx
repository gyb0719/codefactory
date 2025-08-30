'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Code2, Sparkles, Zap, Bot, Brain, Cpu, Terminal } from 'lucide-react';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'AI 엔지니어 & 풀스택 연구원';
  const [isMatrixEffect, setIsMatrixEffect] = useState(false);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[var(--ai-dark)] via-purple-900/10 to-[var(--surface-darker)]">
      {/* AI Background Effects */}
      <div className="absolute inset-0">
        {/* Neon Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2260%22%20height%3D%2260%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2060%200%20L%200%200%200%2060%22%20fill%3D%22none%22%20stroke%3D%22%2300FF88%22%20stroke-width%3D%220.5%22%20opacity%3D%220.1%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22%2F%3E%3C%2Fsvg%3E')] opacity-20"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400/30 to-cyan-500/30 rounded-full mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-cyan-500/30 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400/20 to-purple-600/20 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-400/10 to-cyan-500/10 border border-green-400/30 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <Brain className="w-4 h-4 text-green-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">AI 연구소 가동 중</span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <div className="space-y-6">
              <motion.h1 
                className="font-bold leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="block text-2xl lg:text-3xl font-medium text-[var(--text-secondary)] mb-4">안녕하세요,</span>
                <span className="flex items-center flex-wrap gap-4">
                  <span className="text-5xl lg:text-7xl">🤖</span>
                  <div className="flex items-baseline">
                    <span className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                      {profileData.name}
                    </span>
                    <span className="text-5xl lg:text-7xl font-black text-[var(--text-secondary)]">입니다.</span>
                  </div>
                </span>
              </motion.h1>
              
              <motion.div 
                className="flex items-center gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Terminal className="w-5 h-5 text-green-400" />
                <h2 className="text-xl lg:text-2xl font-mono font-medium text-[var(--text-secondary)]">
                  {text}
                  <span className="inline-block w-3 h-5 ml-1 bg-green-400 animate-pulse"></span>
                </h2>
              </motion.div>
            </div>

            {/* Enhanced Description */}
            <motion.p 
              className="text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {profileData.bio}
            </motion.p>

            {/* Enhanced Stats with Better Design */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400/5 to-cyan-500/5 p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                <div className="relative z-10">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">98%</div>
                  <div className="text-sm text-[var(--text-tertiary)] mt-2 font-medium">AI 활용도</div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🧬</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="relative z-10">
                  <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">50%</div>
                  <div className="text-sm text-[var(--text-tertiary)] mt-2 font-medium">개발 속도</div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">⚡</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/5 to-green-400/5 p-6 border border-purple-600/20 hover:border-purple-600/40 transition-all duration-300">
                <div className="relative z-10">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent">300%</div>
                  <div className="text-sm text-[var(--text-tertiary)] mt-2 font-medium">생산성 향상</div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🚀</div>
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <button 
                onClick={scrollToProjects} 
                className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Cpu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  AI 프로젝트 탐색
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                className="group relative px-8 py-4 border border-green-400/30 text-green-400 font-semibold rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  AI 연구소 접속
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Enhanced Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-cyan-400/10 to-purple-600/20 rounded-full blur-3xl scale-125 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-purple-600/10 rounded-full blur-2xl scale-110 animation-delay-2000 animate-pulse"></div>
              
              {/* Enhanced AI Avatar Container */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--surface-glass)] to-[var(--surface-dark)] border border-green-400/20 shadow-2xl shadow-green-400/10 backdrop-blur-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Profile Image with AI Effects */}
                <div className="relative w-full h-full">
                  <Image
                    src="/profile.jpg"
                    alt="AI 엔지니어 프로필"
                    fill
                    className="object-cover rounded-full"
                    priority
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-full">
                          <div class="text-center">
                            <div class="text-6xl mb-4">👨‍💻</div>
                            <p class="text-green-400 text-sm font-mono">AI Engineer</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  {/* AI Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-400/20 via-transparent to-cyan-500/20 mix-blend-overlay rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-600/10 to-transparent mix-blend-soft-light rounded-full"></div>
                </div>
                
                {/* AI Scanning Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-400/50"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-green-400/10 to-cyan-400/10 p-4 rounded-2xl backdrop-blur-md border border-green-400/20 shadow-xl"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="w-6 h-6 text-green-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-600/10 to-cyan-400/10 p-4 rounded-2xl backdrop-blur-md border border-purple-600/20 shadow-xl"
                animate={{ 
                  y: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
              >
                <Cpu className="w-6 h-6 text-purple-400" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 bg-gradient-to-br from-cyan-400/10 to-green-400/10 p-3 rounded-xl backdrop-blur-md border border-cyan-400/20"
                animate={{ 
                  x: [0, 10, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
              >
                <Zap className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-green-400 neon-glow" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;