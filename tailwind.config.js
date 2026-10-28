/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141414',
        cream: '#FAF7F2',
        sand: '#F3EDE4',
        card: '#FFFFFF',
        muted: '#6B6B6B',
        line: '#E6E0D6',
        accent: {
          DEFAULT: '#F5C518',
          soft: '#FFF3B0',
          ink: '#B8890A',
        },
        lilac: '#E9E0FF',
        lavender: '#C4B5FD',
        plum: '#A78BFA',
        sage: '#86A07A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,20,20,0.04), 0 8px 24px rgba(20,20,20,0.06)',
        lift: '0 2px 4px rgba(20,20,20,0.05), 0 16px 40px rgba(20,20,20,0.10)',
        glow: '0 0 0 1px rgba(245,197,24,0.4), 0 12px 32px rgba(20,20,20,0.12)',
      },
      backgroundImage: {
        'warm-gradient':
          'linear-gradient(135deg, #F5C518 0%, #F7D96E 40%, #FFF3B0 100%)',
        'soft-gradient':
          'linear-gradient(135deg, #E9E0FF 0%, #C4B5FD 50%, #F5C518 100%)',
        'hero-gradient':
          'radial-gradient(1200px 600px at 70% -10%, rgba(196,181,253,0.35), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(245,197,24,0.22), transparent 60%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade': 'fade 0.5s ease both',
        'pop': 'pop 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};