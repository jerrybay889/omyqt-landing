#!/usr/bin/env node
// Static validation for the OMYQT landing legal/merchant surface.
// No dependencies — pure Node. Run with `npm test`.
//
// Verifies that the public legal pages carry every verified business fact,
// cover the legally required topics, expose the truthful mail-order status,
// and never leak secrets, invented phone numbers, or raw user data.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const failures = [];
const fail = (msg) => failures.push(msg);
const mustInclude = (file, text, needles) => {
  for (const n of needles) {
    if (!text.includes(n)) fail(`${file}: missing required content ${JSON.stringify(n)}`);
  }
};

// ---------------------------------------------------------------------------
// 1. Verified business facts (single source of truth: src/content/site.ts)
// ---------------------------------------------------------------------------
const site = read('src/content/site.ts');
mustInclude('site.ts', site, [
  '주식회사 글로보더',
  '배제협',
  '386-86-03467',
  '285011-0060205',
  '2025-05-02',
  '경기도 고양시 덕양구 토당동 373-10 3층 649호',
  "mailOrderSalesRegistration: '미신고'",
]);
mustInclude('site.ts', site, ['priceKrw: 3000', 'priceKrw: 7900', 'priceKrw: 9900']);

// ---------------------------------------------------------------------------
// 2. Required legal pages exist
// ---------------------------------------------------------------------------
for (const p of ['src/pages/terms.astro', 'src/pages/privacy.astro', 'src/pages/paid-service.astro', 'src/components/LegalMerchantBlock.astro']) {
  if (!existsSync(join(root, p))) fail(`missing file: ${p}`);
}

// ---------------------------------------------------------------------------
// 3. Terms of Service coverage
// ---------------------------------------------------------------------------
const terms = read('src/pages/terms.astro');
mustInclude('terms.astro', terms, [
  '시행일',
  '이용계약',
  '정기결제',
  '부가가치세',
  '디지털 콘텐츠',
  '즉시',
  '청약철회',
  '전자상거래 등에서의 소비자보호에 관한 법률',
  '즉시 이용(공급 개시)에 대한 동의',
  '구독의 해지',
  '미성년자',
  '법정대리인',
  '서비스의 제공 및 변경',
  'AI 생성물',
  '준거법',
  '관할',
  '한국소비자원',
  '부칙',
]);

// ---------------------------------------------------------------------------
// 4. Privacy Policy coverage
// ---------------------------------------------------------------------------
const privacy = read('src/pages/privacy.astro');
mustInclude('privacy.astro', privacy, [
  '개인정보의 처리 목적',
  '처리하는 개인정보의 항목',
  '이메일',
  '출생연도',
  '회고 기록',
  '기도제목',
  '푸시',
  '결제',
  '종교적 신념',
  '별도 동의',
  '처리 및 보유 기간',
  '전자상거래 등에서의 소비자보호에 관한 법률',
  '5년',
  '3개월',
  '통신비밀보호법',
  '제3자 제공',
  '기본적으로 비공개',
  '개인정보 처리의 위탁',
  'Supabase',
  'Anthropic',
  '토스페이먼츠',
  'Vercel',
  '국외 이전',
  '미국',
  '서울 리전',
  '열람',
  '정정',
  '삭제',
  '처리정지',
  '만 14세 미만',
  '안전성 확보',
  '쿠키',
  '개인정보 보호책임자',
  '개인정보분쟁조정위원회',
  '개인정보처리방침의 변경',
]);
// Privacy must NOT claim an FTC-approved standard form.
if (/표준약관|공정거래위원회.{0,20}표준|FTC[- ]?approved/i.test(privacy)) {
  fail('privacy.astro: must not claim an FTC/공정위 approved standard form');
}

// ---------------------------------------------------------------------------
// 5. Paid-service pre-contract page coverage
// ---------------------------------------------------------------------------
const paid = read('src/pages/paid-service.astro');
mustInclude('paid-service.astro', paid, [
  '부가가치세',
  '결제가 완료되는 즉시',
  '정기결제',
  '자동',
  '청약철회',
  '환불',
  '해지',
  '미성년자',
  '법정대리인',
  '미신고',
  '토스페이먼츠',
]);

// ---------------------------------------------------------------------------
// 6. Footer wiring
// ---------------------------------------------------------------------------
const footer = read('src/components/Footer.astro');
mustInclude('Footer.astro', footer, [
  'site.company.representativeName',
  'site.company.corporateRegistrationNumber',
  'site.company.businessOpeningDate',
  'site.company.mailOrderSalesRegistration',
  'site.contact.paidServiceUrl',
]);

// ---------------------------------------------------------------------------
// 7. No invented telephone number anywhere in the public surface
// ---------------------------------------------------------------------------
const legalFiles = [
  'src/content/site.ts',
  'src/components/Footer.astro',
  'src/components/LegalMerchantBlock.astro',
  'src/pages/terms.astro',
  'src/pages/privacy.astro',
  'src/pages/paid-service.astro',
];
for (const f of legalFiles) {
  const t = read(f);
  if (/href=["']tel:/i.test(t)) fail(`${f}: contains a tel: link — no verified phone exists`);
  if (/(대표\s*전화|대표번호|고객센터\s*전화|전화번호)\s*[:：]?\s*(\+?\d[\d\-\s]{6,})/.test(t)) {
    fail(`${f}: appears to publish a company phone number`);
  }
}
// The merchant block must positively state the phone is not yet available.
if (!read('src/components/LegalMerchantBlock.astro').includes('대표 전화번호가 없어')) {
  fail('LegalMerchantBlock.astro: must disclose that no verified phone number is published yet');
}

// ---------------------------------------------------------------------------
// 8. No secrets / raw user data in the repo source surface
// ---------------------------------------------------------------------------
const secretPatterns = [
  [/service_role/i, 'service_role key reference'],
  [/SUPABASE_SERVICE_ROLE/i, 'Supabase service role env'],
  [/sk-ant-[A-Za-z0-9-]{10,}/, 'Anthropic API secret key'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'PEM private key'],
  [/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/, 'JWT-shaped token'],
  [/VAPID[_A-Z]*PRIVATE/i, 'VAPID private key'],
  [/TOSS[_A-Z]*SECRET/i, 'Toss secret key'],
];
const scanDirs = ['src', 'public', 'scripts'];
const scanExt = /\.(astro|ts|tsx|js|mjs|cjs|json|md|mdx|html|txt|css)$/;
const walk = (dir) => {
  for (const name of readdirSync(join(root, dir))) {
    const rel = join(dir, name);
    const abs = join(root, rel);
    if (statSync(abs).isDirectory()) { walk(rel); continue; }
    if (!scanExt.test(name)) continue;
    if (abs === fileURLToPath(import.meta.url)) continue; // don't scan this scanner
    const content = readFileSync(abs, 'utf8');
    for (const [re, label] of secretPatterns) {
      if (re.test(content)) fail(`${relative(root, abs)}: possible secret — ${label}`);
    }
  }
};
for (const d of scanDirs) if (existsSync(join(root, d))) walk(d);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
if (failures.length) {
  console.error(`\n✗ legal validation FAILED (${failures.length})\n`);
  for (const f of failures) console.error('  - ' + f);
  console.error('');
  process.exit(1);
}
console.log('✓ legal validation passed — business facts, legal coverage, mail-order status, no secrets/phone leaks');
