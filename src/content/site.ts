export const site = {
  name: 'OMYQT',
  tagline: '매일 아침, 나를 위한 말씀',
  url: 'https://www.omyqt.com',
  appUrl: 'https://app.omyqt.com/intro',
  appAuthUrl: 'https://app.omyqt.com/auth',

  hero: {
    headline: '매일 아침,\n나를 위한 말씀',
    subheadline: 'AI가 당신의 삶에 맞춘 성경 묵상을 매일 준비합니다.\n절별 해석, 적용 가이드, 기도문까지 한 번에.',
    ctaPrimary: '지금 무료로 시작하기',
    ctaSecondary: '앱 다운로드',
  },

  features: [
    {
      icon: '📖',
      title: '매일 새로운 묵상',
      description: '성경 통독 순서에 따라 매일 아침 새로운 말씀과 AI 해석이 준비됩니다. 빠짐없이, 꾸준히.',
    },
    {
      icon: '✨',
      title: 'AI 맞춤 해석',
      description: '절별 해석, 핵심 요약, 적용 가이드, 오늘의 기도문까지. 당신의 삶에 맞는 깊이 있는 묵상.',
    },
    {
      icon: '🔔',
      title: '매일 알림',
      description: '설정한 시간에 말씀 알림을 받아보세요. 바쁜 일상 속에서도 묵상을 놓치지 않습니다.',
    },
    {
      icon: '📅',
      title: '묵상 타임라인',
      description: '지난 묵상을 타임라인으로 돌아보며 말씀의 흐름을 느껴보세요. 나만의 영적 성장 기록.',
    },
    {
      icon: '💬',
      title: '회고 기록',
      description: '오늘 말씀에서 느낀 점, 감사, 기도를 기록하세요. 묵상이 삶으로 이어집니다.',
    },
    {
      icon: '❤️',
      title: '마음에 담기',
      description: '인상 깊은 묵상을 저장하고 언제든 다시 꺼내보세요. 당신만의 말씀 컬렉션.',
    },
  ],

  steps: [
    {
      step: '01',
      title: '가입',
      description: '이메일 또는 소셜 로그인으로\n30초 만에 가입하세요.',
    },
    {
      step: '02',
      title: '개인화',
      description: 'AI가 당신의 신앙 여정에 맞춰\n묵상을 준비합니다.',
    },
    {
      step: '03',
      title: '매일 묵상',
      description: '매일 아침 새로운 말씀과\n해석을 만나보세요.',
    },
  ],

  playStoreUrl: '',
  appStoreUrl: '',

  testimonials: [
    {
      name: '민지',
      role: '직장인',
      quote: '매일 아침 출근 전 10분 묵상이 하루를 완전히 바꿨어요. AI 해석이 제 상황에 딱 맞아서 놀랍습니다.',
    },
    {
      name: '준혁',
      role: '대학생',
      quote: 'QT를 처음 시작했는데 절별 해석 덕분에 성경이 이해가 돼요. 이제 매일 빠지지 않고 합니다.',
    },
    {
      name: '은혜',
      role: '주부',
      quote: '기도문까지 준비해줘서 정말 좋아요. 아이들 보내고 나서 잠깐의 묵상 시간이 소중해졌어요.',
    },
  ],

  contact: {
    email: 'hello@omyqt.com',
    privacyUrl: '/privacy',
    termsUrl: '/terms',
    paidServiceUrl: '/paid-service',
  },

  company: {
    legalName: '주식회사 글로보더',
    representativeName: '배제협',
    businessRegistrationNumber: '386-86-03467',
    corporateRegistrationNumber: '285011-0060205',
    businessOpeningDate: '2025-05-02',
    businessAddress: '경기도 고양시 덕양구 토당동 373-10 3층 649호',
    // 통신판매업은 신고하지 않았다. 사실대로 "미신고"로 고지한다.
    mailOrderSalesRegistration: '미신고',
    // 검증된 대표 전화번호가 없어 표기하지 않는다. 문의는 이메일로 받는다.
    supportEmail: 'jerrybay889@gmail.com',
    privacyOfficerEmail: 'jerrybay889@gmail.com',
  },

  // 유료 구독 요금제 (모든 금액 부가가치세 포함, 매월 자동 갱신)
  plans: [
    { key: 'plus', name: 'Plus', priceKrw: 3000, seats: 1, summary: '광고 없이 30일+ 기록 열람, 키워드 리포트, 리마인더 3개, 북마크·한 줄 적용' },
    { key: 'family3', name: 'Family 3', priceKrw: 7900, seats: 3, summary: '최대 3명 Plus 권한, 가족 공동 QT, 주간 가족 리포트' },
    { key: 'family5', name: 'Family 5', priceKrw: 9900, seats: 5, summary: '최대 5명 Plus 권한, 가족 공동 QT, 주간 가족 리포트, 초대 링크 참여' },
  ],

  legal: {
    // 문서 시행일 / 최종 개정일
    termsEffectiveDate: '2026-09-08',
    privacyEffectiveDate: '2026-09-08',
  },

  seo: {
    title: 'OMYQT — 매일 아침 AI 성경 묵상 앱',
    description: '매일 아침 AI가 당신의 삶에 맞춘 성경 말씀과 묵상을 준비합니다. 절별 해석, 적용 가이드, 기도문까지. 무료로 시작하세요.',
    keywords: '기독교 QT앱, 매일묵상 앱, 성경 묵상 앱, AI 성경 묵상, 큐티 앱 추천, 기독교 청년 QT',
    ogImage: 'https://www.omyqt.com/og-image.png',
  },

  supabaseUrl: 'https://ckiowomuzaeyymjccasr.supabase.co',
  supabaseAnonKey: 'sb_publishable_Laz4kizZ02oWwGVcc1Ii-Q_5YGyKe6L',
};
