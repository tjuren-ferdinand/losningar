/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgba(250, 250, 252, 1)',
        'background-blur': 'rgba(250, 250, 252, 0.3)',
        card: 'rgba(255, 255, 255, 0.5)',
        'card-hover': 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(0, 0, 0, 0.05)',
        text: '#000000',
        'text-secondary': 'rgba(0, 0, 0, 0.4)',
        'text-tertiary': 'rgba(0, 0, 0, 0.25)',
        accent: 'rgba(0, 0, 0, 0.8)',
        'accent-hover': 'rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.15em',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'vision': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'vision-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.12)',
        'vision-subtle': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
