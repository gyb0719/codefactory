'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Sparkles, Brain, Cpu, Bot, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';
import Link from 'next/link';

const Projects = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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
            <Brain className="w-4 h-4 text-green-400 pulse-ai" />
            <span className="text-green-400 neon-glow">AI 연구 성과</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            AI 연구소 
            <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent neon-glow">
              프로젝트
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            🤖 최첨단 AI 기술로 구현한 혁신적인 프로젝트들을 탐험해보세요.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {profileData.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Card variant="elevated" hover className="overflow-hidden h-full bg-gradient-to-br from-slate-800/50 to-purple-900/20 border border-green-400/20 hover:border-green-400/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-green-400/10 via-cyan-500/10 to-purple-600/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* AI Project Visual */}
                    <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl">{project.title.includes('퀵마트') ? '🛍️' : project.title.includes('Aura') ? '💘' : '🏠'}</div>
                      {/* Matrix Effect Overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="matrix-bg" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={project.liveUrl} target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}>
                      <Button size="sm" className="bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 text-black font-bold">
                        <Zap className="w-4 h-4 mr-2" />
                        실행
                      </Button>
                    </Link>
                    <Link href={project.githubUrl} target="_blank">
                      <Button size="sm" variant="outline" className="border-green-400/50 text-green-400 hover:bg-green-400/10 neon-border">
                        <Github className="w-4 h-4 mr-2" />
                        코드
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-400/10 to-cyan-500/10 text-green-400 rounded-full border border-green-400/30 hover:border-green-400/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Cpu className="w-4 h-4 text-cyan-400 neon-glow" />
                        <span className="font-medium">AI 기능</span>
                      </div>
                      <ul className="text-xs text-gray-500 space-y-1 ml-6">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="list-disc">{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg text-gray-400 mb-6">
            🚀 더 많은 AI 프로젝트와 연구 결과를 탐험해보세요
          </p>
          <Link href="https://github.com/gyb0719" target="_blank">
            <Button size="lg" className="bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 border-0 text-black font-bold shadow-lg shadow-green-400/25">
              <Bot className="w-5 h-5 mr-2" />
              AI 연구소 GitHub 방문
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;