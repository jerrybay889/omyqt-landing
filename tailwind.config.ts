import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(40, 33%, 98%)',
        foreground: 'hsl(220, 13%, 18%)',
        primary: {
          DEFAULT: 'hsl(222, 47%, 25%)',
          foreground: 'hsl(45, 30%, 95%)',
        },
        accent: {
          DEFAULT: 'hsl(38, 92%, 55%)',
          foreground: 'hsl(222, 47%, 15%)',
        },
        muted: {
          DEFAULT: 'hsl(35, 15%, 95%)',
          foreground: 'hsl(220, 9%, 46%)',
        },
        border: 'hsl(35, 15%, 88%)',
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Noto Serif KR"', 'serif'],
        body: ['Pretendard', 'Inter', 'sans-serif'],
        verse: ['"Noto Serif KR"', '"Playfair Display"', 'serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(220, 13%, 18%)',
            a: {
              color: 'hsl(222, 47%, 25%)',
              '&:hover': { color: 'hsl(38, 92%, 55%)' },
            },
            h1: { fontFamily: '"Noto Serif KR", serif' },
            h2: { fontFamily: '"Noto Serif KR", serif' },
            h3: { fontFamily: '"Noto Serif KR", serif' },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
