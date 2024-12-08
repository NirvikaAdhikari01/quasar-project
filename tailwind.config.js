module.exports = {
  content: [
    "./src/**/*.{html,js,ts,vue}",
  ],
  theme: {
    extend: {
      animation: {
        slideInLeft: 'slideInLeft 1s ease-out forwards',
        slideInRight: 'slideInRight 1s ease-out forwards',
        fadeInZigzag: 'fadeInZigzag 2s ease-out forwards',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInZigzag: {
          '0%': { opacity: 0, transform: 'translateX(-50%)' },
          '50%': { opacity: 1, transform: 'translateX(10%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      colors: {
        gradientStart: '#003E5C',
        gradientEnd: '#011926',
      },
    },
  },
  plugins: [],
}
