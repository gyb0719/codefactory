'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Code2, Clock, CheckCircle, Zap, Brain, Bot, Cpu, Sparkles, Terminal, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const icons = {
    '🧬 AI 웹 개발 연구실': Brain,
    '🔬 모바일 AI 실험실': Bot
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/20 to-cyan-500/20 border border-green-400/50 rounded-full text-sm font-medium mb-6 neon-border">
            <Cpu className="w-4 h-4 text-green-400 pulse-ai" />
            <span className="text-green-400 neon-glow">AI 연구 분야</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            AI 기술로 
            <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent neon-glow">
              미래를 코딩
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            🤖 최첨단 AI 도구로 개발 시간 50% 단축, 생산성 300% 향상
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex bg-gradient-to-r from-slate-800/50 to-purple-900/20 rounded-2xl p-1 border border-green-400/20">
            {profileData.services.map((service, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === index
                    ? 'bg-gradient-to-r from-green-400 to-cyan-500 text-black shadow-lg shadow-green-400/25'
                    : 'text-gray-400 hover:text-green-400'
                }`}
                onClick={() => setSelectedCategory(index)}
              >
                {service.category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          key={selectedCategory}
        >
          {profileData.services[selectedCategory].items.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative"
            >
              <Card variant="elevated" hover className="h-full relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-purple-900/20 border border-green-400/20 hover:border-green-400/50 transition-all duration-300">
                {/* Background Gradient */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
                      {(() => {
                        const IconComponent = icons[profileData.services[selectedCategory].category as keyof typeof icons] || Terminal;
                        return <IconComponent className="w-6 h-6 text-green-400 neon-glow" />;
                      })()}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400 neon-glow">{service.price}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-3 text-gray-400"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        className="w-full group bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0 text-black font-bold shadow-lg shadow-green-400/25" 
                      >
                        <Bot className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        AI 상담 시작
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Advantage Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-slate-800/50 to-purple-900/20 border border-green-400/50 neon-border">
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-green-400/50">
                  <Brain className="w-6 h-6 text-green-400 neon-glow pulse-ai" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent neon-glow">
                  AI 연구소 핵심 성과
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2 bg-gradient-to-r from-green-400/10 to-cyan-500/10 p-4 rounded-xl border border-green-400/30">
                  <div className="text-3xl font-bold text-green-400 neon-glow">98%</div>
                  <div className="text-sm text-gray-400">🧬 AI 활용도</div>
                </div>
                <div className="space-y-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-4 rounded-xl border border-cyan-500/30">
                  <div className="text-3xl font-bold text-cyan-400 neon-glow">50%</div>
                  <div className="text-sm text-gray-400">⚡ 개발 속도</div>
                </div>
                <div className="space-y-2 bg-gradient-to-r from-purple-600/10 to-green-400/10 p-4 rounded-xl border border-purple-600/30">
                  <div className="text-3xl font-bold text-purple-400 neon-glow">300%</div>
                  <div className="text-sm text-gray-400">🚀 생산성</div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                🤖 ChatGPT, Claude, GitHub Copilot, Cursor IDE 등 최첨단 AI 도구를 활용하여
                차세대 개발 패러다임을 선도합니다.
              </p>
              
              <Button size="lg" className="mt-4 bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0 text-black font-bold shadow-lg shadow-green-400/25">
                <Terminal className="w-5 h-5 mr-2" />
                AI 연구소 접속
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;