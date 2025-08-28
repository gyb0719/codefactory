# 🌐 GitHub Pages 커스텀 도메인 설정 가이드

## 📋 설정 단계

### 1️⃣ DNS 설정 (도메인 제공업체에서 설정)

#### A. **루트 도메인** 사용시 (예: codefactory.ink)
DNS 관리 페이지에서 다음 A 레코드를 추가:

```
Type: A
Name: @ (또는 공백)
Value: 185.199.108.153
TTL: 3600 (또는 기본값)

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### B. **서브도메인** 사용시 (예: www.codefactory.ink)
```
Type: CNAME
Name: www
Value: gyb0719.github.io
TTL: 3600
```

### 2️⃣ GitHub 저장소 설정

1. **Settings > Pages** 이동
2. **Custom domain** 섹션에서:
   - 도메인 입력: `codefactory.ink`
   - Save 클릭
3. **Enforce HTTPS** 체크 (DNS 전파 후 활성화됨)

### 3️⃣ 파일 설정 (✅ 완료됨)

- `public/CNAME` 파일: `codefactory.ink`
- `next.config.ts`: 커스텀 도메인 지원 설정 추가

### 4️⃣ GitHub Actions 수정

`.github/workflows/deploy.yml`에 환경변수 추가:

```yaml
      - name: Build with Next.js
        env:
          CUSTOM_DOMAIN: true  # 커스텀 도메인 사용시
        run: npm run build
```

## 🔍 DNS 전파 확인

### 명령어로 확인:
```bash
# Windows
nslookup codefactory.ink

# Mac/Linux
dig codefactory.ink
```

### 온라인 도구:
- https://www.whatsmydns.net
- https://dnschecker.org

## ⏱️ 예상 소요 시간

- **DNS 전파**: 10분 ~ 48시간 (보통 1-2시간)
- **GitHub Pages 연결**: DNS 전파 후 즉시
- **HTTPS 인증서**: 자동 발급 (최대 24시간)

## 🚨 주의사항

1. **www와 루트 도메인 모두 사용하려면:**
   - 루트 도메인: A 레코드 설정
   - www 서브도메인: CNAME 레코드 설정
   - GitHub Pages가 자동으로 리다이렉트 처리

2. **기존 도메인 사용 중이라면:**
   - 현재 서비스 중단 방지를 위해 점진적 전환
   - TTL을 낮춰서 빠른 전환 가능

3. **SSL/HTTPS:**
   - GitHub Pages가 Let's Encrypt로 자동 발급
   - DNS 설정 완료 후 최대 24시간 소요

## 📞 도메인 제공업체별 설정 위치

### 가비아
관리콘솔 > DNS 관리 > DNS 설정

### 후이즈
도메인 관리 > DNS 정보 변경

### Cloudflare
DNS > Records > Add record

### GoDaddy
DNS > Manage DNS > Add

### Namecheap
Domain List > Manage > Advanced DNS

## ✅ 설정 완료 후 확인

1. https://codefactory.ink 접속 테스트
2. https://www.codefactory.ink 리다이렉트 확인
3. HTTPS 인증서 확인 (브라우저 주소창 자물쇠 아이콘)

---

**문의사항이 있으시면 언제든 알려주세요!**