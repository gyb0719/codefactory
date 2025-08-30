'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, Bot, Brain, Cpu, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';
import AILabIcon from '@/components/icons/AILabIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', href: '#home' },
    { name: '프로젝트', href: '#projects' },
    { name: '서비스', href: '#services' },
    { name: '소개', href: '#about' },
    { name: '연락처', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href === '#home' ? '.hero-section' : href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('#home')}
              whileHover={{ scale: 1.05 }}
            >
              <AILabIcon size={48} animated={false} />
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                  AI 코드 연구소
                </div>
                <div className="text-xs text-gray-500 -mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  차세대 AI 개발 솔루션
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors relative group"
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="sm" className="group bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0">
                  <Bot className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  AI 상담
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={false}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <AILabIcon size={40} animated={false} />
                <div>
                  <div className="font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">AI 코드 연구소</div>
                  <div className="text-xs text-gray-500">AI Development Lab</div>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className="w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-purple-600 font-medium transition-colors border-b border-gray-50 last:border-b-0"
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0">
                  <Bot className="w-4 h-4 mr-2" />
                  AI 상담 받기
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Header;