'use client';

import { motion } from 'framer-motion';
import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { profileData } from '@/data/profile';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
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
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-600/10"></div>
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
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{profileData.company}</h3>
                <p className="text-gray-400">by {profileData.name}</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              AI 기술을 활용한 효율적이고 혁신적인 개발 솔루션을 제공합니다. 
              웹과 모바일 앱 개발 전 영역에서 최고 품질의 서비스를 경험해보세요.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-cyan-400" />
                <a href={`mailto:${profileData.email}`} className="hover:text-white transition-colors">
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-cyan-400" />
                <a href={`tel:${profileData.phone}`} className="hover:text-white transition-colors">
                  {profileData.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-cyan-400" />
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
            <h4 className="text-xl font-semibold">Services</h4>
            <div className="space-y-3 text-gray-300">
              <div>웹 개발</div>
              <div>모바일 앱 개발</div>
              <div>AI 솔루션</div>
              <div>컨설팅</div>
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
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500 hover:to-purple-600 transition-all duration-300"
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
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span>Back to Top</span>
            <Code2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;