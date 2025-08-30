export const profileData = {
  name: "AI 코드 연구소",
  company: "AI 코드 연구소",
  title: "AI 엔지니어 & 풀스택 연구원",
  email: "gyb07190@gmail.com",
  phone: "+82 10-3825-5659",
  website: "codefactory.ink",
  
  bio: "🤖 국내 상위 1% AI 풀스택 개발 연구소입니다. ChatGPT-4, Claude Opus, GitHub Copilot을 마스터하여 개발 속도 50% 단축, 품질 200% 향상, 비용 30% 절감을 실현합니다. 500+ 프로젝트 성공 경험으로 당신의 비즈니스를 혁신합니다.",
  
  experience: [
    {
      period: "2020 - Present",
      company: "AI 코드 연구소",
      position: "Chief AI Architect",
      description: "🚀 500+ 프로젝트 성공 | 누적 매출 50억+ | AI 개발 방법론 특허 출원"
    },
    {
      period: "2018 - 2020",
      company: "글로벌 AI 테크 유니콘",
      position: "Senior AI Engineer",
      description: "💎 MAU 1000만+ 서비스 개발 | AWS/GCP 비용 70% 절감 | 팀 생산성 300% 향상"
    },
    {
      period: "2016 - 2018",
      company: "실리콘밸리 AI 스타트업",
      position: "Full Stack Developer",
      description: "🌟 시리즈 B 투자 유치 기여 | 핵심 알고리즘 개발 | 글로벌 서비스 런칭"
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
          name: "프리미엄 랜딩 페이지",
          price: "900,000원",
          duration: "5-7일",
          features: ["🎨 커스텀 AI 디자인", "⚡ Core Web Vitals 최적화", "🎭 마이크로 인터랙션", "📊 A/B 테스팅 설정", "🔍 고급 SEO 최적화"]
        },
        {
          name: "엔터프라이즈 웹사이트",
          price: "2,400,000원",
          duration: "2-3주",
          features: ["🏢 다국어 지원", "💳 PG 통합 결제", "🔐 2FA 보안 인증", "📈 실시간 대시보드", "🤖 AI 챗봇 통합"]
        },
        {
          name: "SaaS 웹 애플리케이션",
          price: "6,000,000원",
          duration: "4-6주",
          features: ["☁️ 클라우드 아키텍처", "🔄 CI/CD 파이프라인", "📊 빅데이터 처리", "🛡️ 보안 감사", "🚀 자동 스케일링"]
        }
      ]
    },
    {
      category: "🔬 모바일 AI 실험실",
      items: [
        {
          name: "AI 기반 MVP 앱",
          price: "4,500,000원",
          duration: "3-4주",
          features: ["🤖 AI 기능 탑재", "📱 iOS/Android 동시 출시", "🎯 사용자 행동 분석", "💾 오프라인 모드", "🔔 스마트 알림"]
        },
        {
          name: "엔터프라이즈 모바일 솔루션",
          price: "9,000,000원",
          duration: "6-8주",
          features: ["🏆 네이티브 최적화", "🔗 ERP 시스템 연동", "📡 실시간 동기화", "🛡️ 엔드투엔드 암호화", "📊 BI 대시보드"]
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
      name: "김민준",
      company: "유니콘 스타트업 CTO",
      text: "기존 개발팀 대비 3배 빠른 속도, 절반의 비용으로 MVP를 완성했습니다. AI 활용 능력이 정말 탁월합니다.",
      rating: 5
    },
    {
      name: "박서연",
      company: "글로벌 IT 기업 PM",
      text: "600만원 프로젝트가 매출 50억을 만들어냈습니다. 최고의 투자였습니다.",
      rating: 5
    },
    {
      name: "최준호",
      company: "시리즈 B 스타트업 대표",
      text: "타 업체 견적 1.5억이었던 프로젝트를 9천만원에 더 높은 품질로 완성. 강력 추천합니다!",
      rating: 5
    }
  ],

  aiWorkflow: [
    {
      step: "🧬 AI 요구사항 분석 (2시간)",
      description: "GPT-4 & Claude Opus로 비즈니스 요구사항을 기술 명세로 자동 변환",
      tools: ["ChatGPT-4", "Claude Opus", "Notion AI", "Figma AI"]
    },
    {
      step: "🔬 AI 아키텍처 설계 (4시간)",
      description: "최적 기술 스택 자동 선정 및 확장 가능한 시스템 아키텍처 설계",
      tools: ["Claude 3.5 Sonnet", "Cursor IDE", "v0.dev", "Excalidraw"]
    },
    {
      step: "⚡ AI 하이퍼 코딩 (1-3일)",
      description: "멀티 AI 에이전트 협업으로 일 1만줄+ 코드 생성 (정확도 99%)",
      tools: ["GitHub Copilot X", "Cursor AI", "Codeium", "Tabnine"]
    },
    {
      step: "🚀 AI 품질 보증 & 배포 (4시간)",
      description: "자동 테스트 커버리지 95%+ 달성 및 제로 다운타임 배포",
      tools: ["Playwright AI", "Jest", "Docker", "Vercel/AWS"]
    }
  ]
};