# 🏭 코드팩토리 포트폴리오

> AI 기술을 활용한 1인 풀스택 개발자의 혁신적인 포트폴리오 사이트

## 🌟 프로젝트 개요

**코드팩토리**는 AI 도구를 적극 활용하여 개발 효율성을 극대화하고, 시중 대비 30% 저렴한 가격으로 고품질 웹/앱 개발 서비스를 제공하는 1인 개발 회사입니다.

### 🎯 핵심 특징
- ⚡ **AI 기반 개발**: ChatGPT, Claude 등을 활용한 효율적 개발
- 🎨 **Apple/Toss 스타일**: 직관적이고 세련된 사용자 경험
- 📱 **풀스택 역량**: 웹부터 모바일까지 전 영역 커버
- 💰 **투명한 가격**: 30만원~300만원의 명확한 가격 정책

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Authentication**: NextAuth.js
- **File Storage**: Supabase Storage

### AI & APIs
- **AI**: OpenAI GPT-4 API, Claude API
- **Maps**: Kakao Map API
- **Payment**: 토스페이먼츠 API
- **Charts**: Recharts, D3.js

### Development & Deployment
- **Version Control**: Git + GitHub
- **Deployment**: Vercel
- **Domain**: codefactory.ink
- **Package Manager**: npm

## 🎨 디자인 시스템

### 브랜드 컬러
- **Primary**: 청록-보라 그라데이션 (#00D4FF → #8B5CF6)
- **Secondary**: 그레이스케일 (#F8FAFC → #1E293B)
- **Accent**: 상황별 컬러 (성공, 경고, 오류)

### UI 컴포넌트
- **Button**: 4가지 변형 (Primary, Secondary, Outline, Ghost)
- **Card**: 호버 효과와 그림자를 활용한 카드 시스템
- **애니메이션**: 60fps 부드러운 마이크로 인터랙션

## 🏗️ 프로젝트 구조

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, Projects, Services
│   └── ui/              # Button, Card 등 재사용 컴포넌트
├── data/
│   └── profile.ts       # 프로필 및 프로젝트 데이터
├── lib/
│   └── utils.ts         # 유틸리티 함수
└── app/
    ├── layout.tsx       # 루트 레이아웃
    └── page.tsx         # 메인 페이지
```

## 🚀 실제 구현 프로젝트

### 1. 🏠 AI 부동산 플랫폼 "집닥터"
- **AI 상담봇**: ChatGPT 기반 부동산 상담
- **지도 검색**: Kakao Map 연동 매물 시각화
- **실시간 채팅**: 공인중개사와 직접 상담

### 2. 🛍️ 모바일 커머스 "퀵마트"
- **PWA**: 앱스토어 없이 설치 가능
- **스와이프 쇼핑**: TikTok 스타일 상품 탐색
- **즉시 결제**: 토스페이먼츠 원터치 결제

### 3. 📊 SaaS 대시보드 "DataFlow"
- **실시간 차트**: WebSocket 기반 라이브 데이터
- **드래그앤드롭**: 커스터마이징 가능한 위젯
- **팀 협업**: 댓글, 멘션, 공유 기능

## 📈 성능 최적화

### Core Web Vitals
- **LCP**: 1.2초 이하 (목표)
- **FID**: 100ms 이하
- **CLS**: 0.1 이하
- **Lighthouse**: 95점+ 달성

### 최적화 기법
- Next.js Image 컴포넌트로 이미지 최적화
- Dynamic Import를 통한 코드 스플리팅
- Framer Motion LazyMotion으로 번들 크기 최적화
- Supabase Edge Functions 활용

## 🎯 차별화 포인트

### 1. **실제 작동하는 데모**
단순 스크린샷이 아닌, 실제로 사용 가능한 웹사이트와 앱

### 2. **AI 네이티브 개발**
AI 도구를 활용한 개발 과정과 결과물을 투명하게 공개

### 3. **오픈소스 정신**
모든 코드를 GitHub에 공개하여 기술적 투명성 확보

### 4. **비용 효율성**
AI 활용으로 개발 시간 50% 단축, 비용 30% 절감 실현

## 🔧 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/gyb0719/codefactory.git
cd codefactory

# 의존성 설치
npm install

# 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key

# 개발 서버 실행
npm run dev
```

## 📞 연락처

**권용범** - 코드팩토리 대표  
📧 **이메일**: gyb07190@gmail.com  
📱 **전화**: +82 10-3825-5659  
🌐 **웹사이트**: codefactory.ink  
💼 **GitHub**: https://github.com/gyb0719

---

## 📄 라이센스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🤖 Generated with AI assistance from ChatGPT and Claude**  
*AI 기술을 활용한 효율적인 개발의 실제 사례입니다.*
