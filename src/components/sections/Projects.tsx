'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

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
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-full text-sm font-medium mb-6">
            <Code2 className="w-4 h-4 text-purple-600" />
            포트폴리오
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            프로젝트 
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              쇼케이스
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI 기술과 최신 개발 스택을 활용한 실제 프로젝트들을 소개합니다.
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
              <Card variant="elevated" hover className="overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-cyan-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for project image */}
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-purple-600/50" />
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-cyan-50 to-purple-50 text-purple-700 rounded-full border border-purple-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">주요 특징</span>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1 ml-6">
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
          <p className="text-lg text-gray-600 mb-6">
            더 많은 프로젝트와 상세한 사례를 보고 싶으신가요?
          </p>
          <Button size="lg">
            <Github className="w-5 h-5 mr-2" />
            전체 포트폴리오 보기
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;