export const profileData = {
  name: "AI 코드 연구소",
  company: "AI 코드 연구소",
  title: "AI 엔지니어 & 풀스택 연구원",
  email: "gyb07190@gmail.com",
  phone: "+82 10-3825-5659",
  website: "codefactory.ink",
  
  bio: "🤖 최첨단 AI 기술로 미래를 코딩하는 연구소입니다. ChatGPT, Claude, GitHub Copilot 등 최신 AI 도구를 활용하여 개발 시간을 50% 단축하면서도 더 높은 품질의 솔루션을 제공합니다.",
  
  experience: [
    {
      period: "2020 - Present",
      company: "AI 코드 연구소",
      position: "수석 AI 연구원",
      description: "🔬 AI 기반 자동화 개발 시스템 연구 및 차세대 개발 패러다임 구축"
    },
    {
      period: "2018 - 2020",
      company: "AI 테크 스타트업",
      position: "AI 엔지니어",
      description: "🧬 머신러닝 기반 자동화 시스템 개발 및 AI 워크플로우 설계"
    },
    {
      period: "2016 - 2018",
      company: "AI 연구 센터",
      position: "주니어 연구원",
      description: "🧪 AI 알고리즘 연구 및 프로토타입 개발"
    }
  ],

  skills: {
    frontend: {
      name: "Frontend",
      technologies: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Vue.js/Nuxt.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 80 }
      ]
    },
    backend: {
      name: "Backend",
      technologies: [
        { name: "Node.js/Express", level: 90 },
        { name: "Python/Django", level: 85 },
        { name: "PostgreSQL/MongoDB", level: 85 },
        { name: "Redis/Docker", level: 80 },
        { name: "AWS/Vercel", level: 90 }
      ]
    },
    mobile: {
      name: "Mobile",
      technologies: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 80 },
        { name: "iOS/Swift", level: 75 },
        { name: "Android/Kotlin", level: 70 }
      ]
    },
    ai: {
      name: "AI & ML Technologies",
      technologies: [
        { name: "ChatGPT/Claude", level: 98 },
        { name: "GitHub Copilot", level: 95 },
        { name: "Cursor/v0.dev", level: 93 },
        { name: "Midjourney/DALL-E", level: 88 },
        { name: "LangChain/Vector DB", level: 85 }
      ]
    }
  },

  services: [
    {
      category: "🧬 AI 웹 개발 연구실",
      items: [
        {
          name: "랜딩 페이지",
          price: "300,000원",
          duration: "3-5일",
          features: ["반응형 디자인", "SEO 최적화", "애니메이션", "CMS 연동"]
        },
        {
          name: "비즈니스 웹사이트",
          price: "800,000원",
          duration: "1-2주",
          features: ["관리자 패널", "결제 시스템", "회원 관리", "API 연동"]
        },
        {
          name: "웹 애플리케이션",
          price: "2,000,000원",
          duration: "3-4주",
          features: ["풀스택 개발", "데이터베이스", "실시간 기능", "배포/운영"]
        }
      ]
    },
    {
      category: "🔬 모바일 AI 실험실",
      items: [
        {
          name: "MVP 앱",
          price: "1,500,000원",
          duration: "2-3주",
          features: ["크로스 플랫폼", "기본 기능", "앱스토어 배포"]
        },
        {
          name: "비즈니스 앱",
          price: "3,000,000원",
          duration: "4-6주",
          features: ["네이티브 성능", "백엔드 연동", "푸시 알림", "분석 도구"]
        }
      ]
    }
  ],

  projects: [
    {
      title: "🛍️ 퀵마트 - AI 스와이프 쇼핑",
      description: "TikTok 스타일 스와이프로 30분 내 초고속 배송하는 AI 커머스 플랫폼",
      tech: ["Next.js 15", "TypeScript", "Supabase", "PWA", "Framer Motion"],
      image: "/images/quickmart.jpg",
      liveUrl: "/codefactory/02-mobile-commerce/",
      githubUrl: "https://github.com/gyb0719/codefactory",
      highlights: ["🤖 AI 추천 엔진", "⚡ 30분 배송", "📱 PWA 지원"]
    },
    {
      title: "💘 Aura - AI 프리미엄 데이팅",
      description: "AI 매칭 알고리즘과 실시간 영상 통화를 지원하는 차세대 소개팅 플랫폼",
      tech: ["React", "TypeScript", "WebRTC", "AI Matching", "Real-time Chat"],
      image: "/images/aura.jpg",
      liveUrl: "https://gyb0719.github.io/aura-premium-dating-platform/",
      githubUrl: "https://github.com/gyb0719/aura-premium-dating-platform",
      highlights: ["🧬 AI 매칭", "📹 영상 통화", "💎 프리미엄 UI"]
    },
    {
      title: "🏠 AI 부동산 연구소",
      description: "GPT-4 기반 부동산 가격 예측 및 AI 상담 시스템",
      tech: ["Next.js", "OpenAI API", "LangChain", "Vector DB"],
      image: "/images/realestate-ai.jpg",
      liveUrl: "https://ai-estate.demo",
      githubUrl: "https://github.com/ai-lab/estate-ai",
      highlights: ["🔮 가격 예측", "💬 AI 상담", "📊 빅데이터 분석"]
    }
  ],

  testimonials: [
    {
      name: "김철수",
      company: "스타트업 대표",
      text: "AI 활용으로 개발 기간을 50% 단축하면서도 품질은 더욱 향상되었습니다.",
      rating: 5
    },
    {
      name: "이영희",
      company: "마케팅 에이전시",
      text: "예산 내에서 기대 이상의 결과를 얻었습니다. 소통도 원활했어요.",
      rating: 5
    }
  ],

  aiWorkflow: [
    {
      step: "🧬 AI 요구사항 분석",
      description: "ChatGPT & Claude로 요구사항 자동 분석 및 최적화",
      tools: ["ChatGPT", "Notion", "Figma"]
    },
    {
      step: "🔬 AI 아키텍처 설계",
      description: "AI가 제안하는 최적 시스템 아키텍처 자동 생성",
      tools: ["Claude", "Cursor", "v0.dev"]
    },
    {
      step: "⚡ AI 코드 생성",
      description: "GitHub Copilot & Cursor로 코드 자동 생성 (생산성 300% 향상)",
      tools: ["GitHub Copilot", "Cursor", "Vercel v0"]
    },
    {
      step: "🚀 AI 자동 배포",
      description: "AI 기반 테스트 자동화 및 무중단 배포 시스템",
      tools: ["Jest", "Playwright", "Vercel"]
    }
  ]
};