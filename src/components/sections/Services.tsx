'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Code2, Clock, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const icons = {
    '웹 개발': Monitor,
    '모바일 앱': Smartphone
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
    <section id="services" className="py-20 bg-white">
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
            <Zap className="w-4 h-4 text-purple-600" />
            서비스 & 가격
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              투명한 가격
            </span>
            , 확실한 품질
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI 기술을 활용해 개발 비용은 30% 절약하고, 품질은 더욱 향상시킵니다.
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
          <div className="flex bg-gray-100 rounded-2xl p-1">
            {profileData.services.map((service, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === index
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
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
              <Card variant="elevated" hover className="h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-xl flex items-center justify-center">
                      {(() => {
                        const IconComponent = icons[profileData.services[selectedCategory].category as keyof typeof icons] || Code2;
                        return <IconComponent className="w-6 h-6 text-purple-600" />;
                      })()}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-3 text-gray-600"
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
                        className="w-full group" 
                        variant={index === 1 ? 'primary' : 'outline'}
                      >
                        <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        상담 받기
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
          <Card variant="glass" className="max-w-4xl mx-auto p-8 border-2 border-gradient-to-r from-cyan-200 to-purple-200">
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  AI 기반 개발의 장점
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">50%</div>
                  <div className="text-sm text-gray-600">개발 시간 단축</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">30%</div>
                  <div className="text-sm text-gray-600">비용 절감</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">99%</div>
                  <div className="text-sm text-gray-600">코드 품질</div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                ChatGPT, Claude, GitHub Copilot 등 최신 AI 도구를 활용하여 
                더 빠르고 정확한 개발이 가능합니다.
              </p>
              
              <Button size="lg" className="mt-4">
                <Code2 className="w-5 h-5 mr-2" />
                무료 견적 받기
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;