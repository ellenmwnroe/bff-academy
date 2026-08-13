import type { Config } from "tailwindcss";

const config = {
    darkMode: "class", 
    content: [
      './src/pages/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}',
      './src/app/**/*.{ts,tsx}',
      './src/ui/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
          fontFamily: {
            sans: ['var(--font-poppins)', 'sans-serif'],
            serif: ['var(--font-bevan)', 'serif'],
          },
        },
      },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;