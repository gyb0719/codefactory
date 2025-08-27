export const profileData = {
  name: "권용범",
  company: "코드 팩토리",
  title: "풀스택 개발자 & AI 전문가",
  email: "gyb07190@gmail.com",
  phone: "+82 10-3825-5659",
  website: "codefactory.ink",
  
  bio: "AI와 최신 기술을 활용해 효율적이고 혁신적인 솔루션을 제공하는 1인 풀스택 개발자입니다. 웹과 모바일 앱 개발 전 영역에서 시중 대비 30% 저렴한 가격으로 고품질 서비스를 제공합니다.",
  
  experience: [
    {
      period: "2020 - Present",
      company: "코드 팩토리",
      position: "대표 / 풀스택 개발자",
      description: "AI 기반 개발 솔루션으로 빠르고 효율적인 웹/앱 개발 서비스 제공"
    },
    {
      period: "2018 - 2020",
      company: "테크 스타트업",
      position: "시니어 개발자",
      description: "React/Node.js 기반 B2B SaaS 플랫폼 개발 및 팀 리딩"
    },
    {
      period: "2016 - 2018",
      company: "IT 솔루션 회사",
      position: "프론트엔드 개발자",
      description: "대규모 엔터프라이즈 웹 애플리케이션 개발"
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
      name: "AI & Productivity",
      technologies: [
        { name: "ChatGPT/Claude", level: 95 },
        { name: "GitHub Copilot", level: 90 },
        { name: "Cursor IDE", level: 90 },
        { name: "AI Workflow", level: 95 }
      ]
    }
  },

  services: [
    {
      category: "웹 개발",
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
      category: "모바일 앱",
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
      title: "AI 기반 부동산 플랫폼",
      description: "ChatGPT API를 활용한 부동산 추천 및 상담 서비스",
      tech: ["Next.js", "TypeScript", "OpenAI API", "Supabase"],
      image: "/images/project1.jpg",
      liveUrl: "https://realestate-ai.demo",
      githubUrl: "https://github.com/codefactory/realestate-ai",
      highlights: ["AI 추천 시스템", "실시간 상담", "30% 성능 향상"]
    },
    {
      title: "모바일 커머스 앱",
      description: "React Native로 개발한 크로스플랫폼 쇼핑몰 앱",
      tech: ["React Native", "Redux", "Node.js", "MongoDB"],
      image: "/images/project2.jpg",
      liveUrl: "https://commerce-app.demo",
      githubUrl: "https://github.com/codefactory/commerce-app",
      highlights: ["크로스플랫폼", "결제 연동", "푸시 알림"]
    },
    {
      title: "SaaS 대시보드",
      description: "기업용 데이터 분석 및 시각화 대시보드",
      tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      image: "/images/project3.jpg",
      liveUrl: "https://saas-dashboard.demo",
      githubUrl: "https://github.com/codefactory/saas-dashboard",
      highlights: ["실시간 데이터", "커스텀 차트", "다중 사용자"]
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
      step: "요구사항 분석",
      description: "ChatGPT와 함께 프로젝트 요구사항을 정확히 파악",
      tools: ["ChatGPT", "Notion", "Figma"]
    },
    {
      step: "설계 및 기획",
      description: "AI 도구로 최적의 아키텍처와 UI/UX 설계",
      tools: ["Claude", "Cursor", "v0.dev"]
    },
    {
      step: "개발 및 구현",
      description: "AI 코드 생성으로 빠르고 정확한 개발",
      tools: ["GitHub Copilot", "Cursor", "Vercel v0"]
    },
    {
      step: "테스트 및 배포",
      description: "자동화된 테스트와 원클릭 배포",
      tools: ["Jest", "Playwright", "Vercel"]
    }
  ]
};