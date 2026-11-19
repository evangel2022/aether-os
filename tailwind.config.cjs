/** @type {import('tailwindcss').Config} */
const fullOpacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, index) => [String(index), String(index / 100)]),
);

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Compact desktop rhythm for 1366×768-class laptops.
        short: { raw: '(max-height: 820px)' },
      },
      opacity: fullOpacity,
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--surface-alt) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-strong': 'rgb(var(--accent-strong) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
        'topbar-ink': 'rgb(var(--topbar-ink) / <alpha-value>)',
        'topbar-muted': 'rgb(var(--topbar-muted) / <alpha-value>)',
        positive: 'rgb(var(--positive) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI Variable"',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Microsoft YaHei UI"',
          'sans-serif',
        ],
        mono: ['"SF Mono"', '"Cascadia Code"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        window:
          '0 48px 100px -28px rgb(15 32 62 / 0.52), 0 18px 42px -18px rgb(15 32 62 / 0.28), 0 0 0 1px rgb(255 255 255 / 0.5) inset',
        panel:
          '0 36px 80px -32px rgb(24 42 74 / 0.35), 0 10px 28px -16px rgb(24 42 74 / 0.16), 0 0 0 1px rgb(255 255 255 / 0.2) inset',
        card: '0 10px 30px -18px rgb(18 35 66 / 0.28), 0 1px 2px rgb(18 35 66 / 0.04)',
        float: '0 22px 48px -20px rgb(15 32 62 / 0.36), 0 4px 12px -6px rgb(15 32 62 / 0.12)',
        dock:
          '0 24px 60px -18px rgb(12 28 55 / 0.52), 0 8px 22px -12px rgb(12 28 55 / 0.25), 0 1px 0 0 rgb(255 255 255 / 0.55) inset',
        'inner-hairline': 'inset 0 1px 0 0 rgb(255 255 255 / 0.45)',
      },
      transitionTimingFunction: {
        'aether': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'aether-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'orb-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -3%, 0) scale(1.06)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bar-breathe': {
          '0%, 100%': { transform: 'scaleY(0.45)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'orb-drift': 'orb-drift 22s ease-in-out infinite',
        'soft-pulse': 'soft-pulse 2.8s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'bar-breathe': 'bar-breathe 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
