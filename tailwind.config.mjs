/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}",
    "./components/**/*.{astro,html,js,jsx,ts,tsx}",
    "./layouts/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        // Primary colors using CSS variables
        primary: {
          0: 'var(--color-primary-0)',
          1: 'var(--color-primary-1)',
          2: 'var(--color-primary-2)',
          3: 'var(--color-primary-3)',
          4: 'var(--color-primary-4)',
          5: 'var(--color-primary-5)',
          DEFAULT: 'var(--color-primary-3)',
        },
        // Gray scale
        gray: {
          1: 'var(--color-gray-1)',
          2: 'var(--color-gray-2)',
          3: 'var(--color-gray-3)',
          4: 'var(--color-gray-4)',
          5: 'var(--color-gray-5)',
          DEFAULT: 'var(--color-gray-3)',
        },
        // Semantic colors
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'monospace'],
        secondary: ['var(--font-secondary)', 'sans-serif'],
        tertiary: ['var(--font-tertiary)', 'sans-serif'],
        // Specific fonts
        'source-code': ['Source Code Pro', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      fontSize: {
        // Using rem values based on 62.5% base
        'xs': '1.2rem',
        'sm': '1.4rem',
        'base': '1.6rem',
        'lg': '1.8rem',
        'xl': '2rem',
        '2xl': '2.4rem',
        '3xl': '3.2rem',
        '4xl': '4rem',
        '5xl': '4.8rem',
        '6xl': '5.6rem',
        '7xl': '6.4rem',
      },
      spacing: {
        // Common spacing values
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
        '4xl': '8rem',
        '5xl': '10rem',
      },
      screens: {
        'xs': '400px',
        'sm': '600px',
        'md': '768px',
        'lg': '960px',
        'xl': '1024px',
        '2xl': '1280px',
        '3xl': '1920px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'particle-float': 'particle-float 6s infinite ease-in-out',
      },
      transitionProperty: {
        'base': 'var(--transition-base)',
        'fast': 'var(--transition-fast)',
        'slow': 'var(--transition-slow)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'none': 'none',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.2em',
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.4',
        'normal': '1.6',
        'relaxed': '1.8',
        'loose': '2',
      },
    },
  },
  plugins: [],
};