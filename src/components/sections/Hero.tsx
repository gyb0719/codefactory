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
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 matrix-bg">
      {/* AI Background Effects */}
      <div className="absolute inset-0">
        {/* Neon Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="%2300FF88" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-20"></div>
        
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
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/20 to-cyan-500/20 border border-green-400/50 rounded-full text-sm font-medium neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Brain className="w-4 h-4 text-green-400 pulse-ai" />
              <span className="text-green-400 neon-glow">AI 연구소 가동 중</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-gray-300">안녕하세요,</span>
                <br />
                <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent neon-glow">
                  {profileData.name}
                </span>
                <br />
                <span className="text-gray-300 text-3xl lg:text-4xl">입니다 🤖</span>
              </motion.h1>
              
              <div className="h-16 flex items-center">
                <motion.h2 
                  className="text-2xl lg:text-3xl font-semibold text-green-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Terminal className="inline w-6 h-6 mr-2" />
                  {text}
                  <span className="animate-pulse text-green-400 neon-glow">_</span>
                </motion.h2>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {profileData.bio}
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 py-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="text-center bg-gradient-to-r from-green-400/10 to-cyan-500/10 p-4 rounded-xl border border-green-400/30">
                <div className="text-3xl font-bold text-green-400 neon-glow">98%</div>
                <div className="text-sm text-gray-400 mt-1">🧬 AI 활용도</div>
              </div>
              <div className="text-center bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-4 rounded-xl border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-400 neon-glow">50%</div>
                <div className="text-sm text-gray-400 mt-1">⚡ 개발 속도</div>
              </div>
              <div className="text-center bg-gradient-to-r from-purple-600/10 to-green-400/10 p-4 rounded-xl border border-purple-600/30">
                <div className="text-3xl font-bold text-purple-400 neon-glow">300%</div>
                <div className="text-sm text-gray-400 mt-1">🚀 생산성</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects} 
                className="group bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0 text-black font-bold shadow-lg shadow-green-400/25"
              >
                <Cpu className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                AI 프로젝트 탐색
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-green-400/50 text-green-400 hover:bg-green-400/10 neon-border"
              >
                <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform pulse-ai" />
                AI 연구소 접속
              </Button>
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
              {/* Background Gradient Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-20 scale-110"></div>
              
              {/* AI Avatar Container */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400/20 via-cyan-500/20 to-purple-600/20 border-2 border-green-400/50 shadow-2xl shadow-green-400/20 neon-border"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-[200px] select-none">🤖</div>
                
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

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400/20 to-cyan-500/20 p-3 rounded-2xl shadow-lg border border-green-400/50 neon-border"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-green-400 neon-glow" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 p-3 rounded-2xl shadow-lg border border-purple-600/50 neon-border"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Cpu className="w-6 h-6 text-purple-400 neon-glow" />
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