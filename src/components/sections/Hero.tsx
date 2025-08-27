'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Code2, Sparkles, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = '풀스택 개발자 & AI 전문가';
  
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
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI 기반 솔루션 제공
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                안녕하세요,
                <br />
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  {profileData.name}
                </span>
                입니다
              </motion.h1>
              
              <div className="h-16 flex items-center">
                <motion.h2 
                  className="text-2xl lg:text-3xl font-semibold text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {text}
                  <span className="animate-pulse text-purple-600">|</span>
                </motion.h2>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
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
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-gray-600 mt-1">프로젝트 완성</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">30%</div>
                <div className="text-sm text-gray-600 mt-1">비용 절약</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">5년+</div>
                <div className="text-sm text-gray-600 mt-1">개발 경력</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button size="lg" onClick={scrollToProjects} className="group">
                <Code2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                프로젝트 보기
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                무료 상담하기
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
              
              {/* Profile Image Container */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt={profileData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code2 className="w-6 h-6 text-purple-600" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-lg border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="w-6 h-6 text-cyan-500" />
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
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;