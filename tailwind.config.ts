import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome palette for e-ink
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          light: 'rgba(0, 0, 0, 0.1)',
          DEFAULT: 'rgba(0, 0, 0, 0.15)',
          medium: 'rgba(0, 0, 0, 0.3)',
          dark: 'rgba(0, 0, 0, 0.5)',
        }
      },
      fontFamily: {
        sans: ['ui-monospace', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        '11': '2.75rem',
        '12': '3rem',
      },
      backgroundImage: {
        'hatch-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
      },
    },
  },
  plugins: [],
};

export default config;
