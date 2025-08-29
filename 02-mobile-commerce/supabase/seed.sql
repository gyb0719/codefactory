-- 샘플 데이터 삽입
-- 주의: 기존 데이터를 모두 삭제하고 새로 삽입합니다

-- 카테고리 삽입
INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
('신선식품', 'fresh', '신선한 과일, 채소, 육류 등', 1, true),
('가공식품', 'processed', '통조림, 인스턴트 식품 등', 2, true),
('생활용품', 'household', '세제, 화장지 등 생활필수품', 3, true),
('음료/주류', 'beverages', '음료수, 커피, 주류 등', 4, true),
('간식/디저트', 'snacks', '과자, 초콜릿, 아이스크림 등', 5, true);

-- 상품 데이터 삽입
INSERT INTO products (
    name, description, price, original_price, discount_percentage, 
    category, image_url, thumbnail_url, rating, reviews_count, 
    stock_quantity, is_available, is_featured, tags, delivery_time, brand
) VALUES
-- 신선식품
('프리미엄 한우 등심 200g', '최상급 1++등급 한우 등심', 35000, 42000, 17, 
 '신선식품', 'https://picsum.photos/400/400?random=1', 'https://picsum.photos/200/200?random=1', 
 4.8, 342, 50, true, true, ARRAY['한우', '프리미엄', '인기'], '30분 내', '한우마을'),

('제주 감귤 3kg', '당도 높은 제주산 감귤', 15000, 20000, 25,
 '신선식품', 'https://picsum.photos/400/400?random=2', 'https://picsum.photos/200/200?random=2',
 4.6, 892, 100, true, true, ARRAY['제주', '과일', '할인'], '30분 내', '제주농장'),

('유기농 샐러드 채소 믹스', '신선한 유기농 샐러드용 채소', 8900, 10000, 11,
 '신선식품', 'https://picsum.photos/400/400?random=3', 'https://picsum.photos/200/200?random=3',
 4.5, 234, 80, true, false, ARRAY['유기농', '샐러드', '건강'], '30분 내', '그린팜'),

-- 가공식품
('신라면 블랙 4+1 기획팩', '진한 육수의 프리미엄 라면', 6500, 8000, 19,
 '가공식품', 'https://picsum.photos/400/400?random=4', 'https://picsum.photos/200/200?random=4',
 4.7, 1523, 200, true, true, ARRAY['라면', '인기', '기획전'], '30분 내', '농심'),

('스팸 클래식 200g x 6캔', '대한민국 대표 햄', 23900, 28000, 15,
 '가공식품', 'https://picsum.photos/400/400?random=5', 'https://picsum.photos/200/200?random=5',
 4.6, 678, 150, true, false, ARRAY['햄', '스팸', '묶음'], '30분 내', 'CJ제일제당'),

('진짜 파스타 소스 600g', '이탈리아 정통 토마토 소스', 7900, 9900, 20,
 '가공식품', 'https://picsum.photos/400/400?random=6', 'https://picsum.photos/200/200?random=6',
 4.4, 432, 120, true, false, ARRAY['파스타', '소스', '이탈리안'], '30분 내', '오뚜기'),

-- 생활용품
('다우니 프리미엄 2.8L', '오래 지속되는 향기', 18900, 25000, 24,
 '생활용품', 'https://picsum.photos/400/400?random=7', 'https://picsum.photos/200/200?random=7',
 4.5, 892, 100, true, true, ARRAY['섬유유연제', '다우니', '대용량'], '30분 내', 'P&G'),

('크리넥스 3겹 화장지 30롤', '부드러운 3겹 화장지', 19900, 24000, 17,
 '생활용품', 'https://picsum.photos/400/400?random=8', 'https://picsum.photos/200/200?random=8',
 4.6, 1234, 80, true, false, ARRAY['화장지', '대용량', '필수품'], '30분 내', '유한킴벌리'),

('퍼실 세탁세제 3.5L', '강력한 세척력', 22000, 28000, 21,
 '생활용품', 'https://picsum.photos/400/400?random=9', 'https://picsum.photos/200/200?random=9',
 4.4, 567, 90, true, false, ARRAY['세제', '대용량', '퍼실'], '30분 내', '헨켈'),

-- 음료/주류
('코카콜라 제로 355ml x 24캔', '제로 칼로리 콜라', 19900, 24000, 17,
 '음료/주류', 'https://picsum.photos/400/400?random=10', 'https://picsum.photos/200/200?random=10',
 4.7, 2341, 150, true, true, ARRAY['콜라', '제로', '박스'], '30분 내', '코카콜라'),

('스타벅스 아메리카노 270ml x 6개', '스타벅스 RTD 커피', 11900, 15000, 21,
 '음료/주류', 'https://picsum.photos/400/400?random=11', 'https://picsum.photos/200/200?random=11',
 4.5, 892, 120, true, false, ARRAY['커피', '스타벅스', 'RTD'], '30분 내', '스타벅스'),

('참이슬 후레쉬 360ml x 20병', '깨끗한 소주', 26900, 32000, 16,
 '음료/주류', 'https://picsum.photos/400/400?random=12', 'https://picsum.photos/200/200?random=12',
 4.6, 1567, 100, true, true, ARRAY['소주', '참이슬', '박스'], '30분 내', '하이트진로'),

-- 간식/디저트
('하리보 골드베어 젤리 1kg', '세계적인 과일맛 젤리', 12900, 15000, 14,
 '간식/디저트', 'https://picsum.photos/400/400?random=13', 'https://picsum.photos/200/200?random=13',
 4.7, 892, 150, true, true, ARRAY['젤리', '하리보', '대용량'], '30분 내', '하리보'),

('오레오 쿠키 패밀리팩', '우유에 찍어먹는 쿠키', 8900, 10000, 11,
 '간식/디저트', 'https://picsum.photos/400/400?random=14', 'https://picsum.photos/200/200?random=14',
 4.6, 1234, 200, true, false, ARRAY['쿠키', '오레오', '간식'], '30분 내', '몬델리즈'),

('허쉬 초콜릿 아몬드 200g', '아몬드가 들어간 초콜릿', 9900, 12000, 18,
 '간식/디저트', 'https://picsum.photos/400/400?random=15', 'https://picsum.photos/200/200?random=15',
 4.5, 567, 180, true, false, ARRAY['초콜릿', '허쉬', '아몬드'], '30분 내', '허쉬'),

('포카칩 오리지널 66g x 4개', '바삭한 감자칩', 7600, 8800, 14,
 '간식/디저트', 'https://picsum.photos/400/400?random=16', 'https://picsum.photos/200/200?random=16',
 4.4, 892, 250, true, false, ARRAY['감자칩', '포카칩', '묶음'], '30분 내', '오리온'),

('빙그레 메로나 8개입', '여름 대표 아이스크림', 6900, 8000, 14,
 '간식/디저트', 'https://picsum.photos/400/400?random=17', 'https://picsum.photos/200/200?random=17',
 4.6, 1567, 100, true, true, ARRAY['아이스크림', '메로나', '여름'], '30분 내', '빙그레'),

('킨더 부에노 3개입', '프리미엄 초콜릿 바', 4500, 5000, 10,
 '간식/디저트', 'https://picsum.photos/400/400?random=18', 'https://picsum.photos/200/200?random=18',
 4.7, 432, 150, true, false, ARRAY['초콜릿', '킨더', '수입'], '30분 내', '페레로'),

('프링글스 오리지널 110g', '튜브형 감자칩', 3900, 4500, 13,
 '간식/디저트', 'https://picsum.photos/400/400?random=19', 'https://picsum.photos/200/200?random=19',
 4.5, 678, 200, true, false, ARRAY['감자칩', '프링글스', '오리지널'], '30분 내', '켈로그'),

('츄파춥스 멀티팩 120g', '다양한 맛 막대사탕', 5900, 6900, 14,
 '간식/디저트', 'https://picsum.photos/400/400?random=20', 'https://picsum.photos/200/200?random=20',
 4.3, 234, 180, true, false, ARRAY['사탕', '츄파춥스', '멀티팩'], '30분 내', '츄파춥스');

-- 테스트용 사용자 생성 (실제로는 Supabase Auth를 통해 생성됨)
-- 이 부분은 예시이며, 실제 사용 시에는 auth.users 테이블과 연동되어야 합니다