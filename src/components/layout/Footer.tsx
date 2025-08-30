'use client';

import { motion } from 'framer-motion';
import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter, Bot, Brain, Cpu, Sparkles } from 'lucide-react';
import { profileData } from '@/data/profile';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/gyb0719', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: '홈', href: '#home' },
    { name: '프로젝트', href: '#projects' },
    { name: '서비스', href: '#services' },
    { name: '소개', href: '#about' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden border-t border-green-400/20">
      {/* AI Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/5 via-cyan-500/5 to-purple-600/5"></div>
        <div className="matrix-bg opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-green-400/50 shadow-lg shadow-green-400/20">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent neon-glow">{profileData.company}</h3>
                <p className="text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Development Laboratory
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              🤖 최첨단 AI 기술로 미래를 코딩하는 연구소입니다.
              ChatGPT, Claude, GitHub Copilot을 활용하여 개발 시간 50% 단축,
              생산성 300% 향상을 실현합니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-green-400 neon-glow" />
                <a href={`mailto:${profileData.email}`} className="hover:text-white transition-colors">
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-green-400 neon-glow" />
                <a href={`tel:${profileData.phone}`} className="hover:text-white transition-colors">
                  {profileData.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-green-400 neon-glow" />
                <span>Seoul, South Korea</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  className="block text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => {
                    const element = document.querySelector(link.href === '#home' ? '.hero-section' : link.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold">AI 연구 분야</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-green-400" />
                <span>AI 웹 개발 연구실</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>모바일 AI 실험실</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>머신러닝 통합 센터</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>자동화 솔루션 랩</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 border border-green-400/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300 neon-border"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center">
            <p>&copy; {currentYear} {profileData.company}. All rights reserved.</p>
            <p className="text-xs mt-1">🤖 Powered by AI Technologies</p>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span>Back to Top</span>
            <Bot className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;