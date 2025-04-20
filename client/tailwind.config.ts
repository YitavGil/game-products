/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover)',
        'secondary': 'var(--secondary-color)',
        'accent': 'var(--accent-color)',
        'background-dark': 'var(--background-dark)',
        'background-card': 'var(--background-card)',
        'background-hover': 'var(--background-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'success': 'var(--success-color)',
        'error': 'var(--error-color)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glow': 'var(--shadow-glow)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Russo One', 'sans-serif'],
      },
    },
  },
}