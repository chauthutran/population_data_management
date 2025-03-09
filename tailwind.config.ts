import type { Config } from 'tailwindcss'

export default {
  content: [
    "./ui/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gainsboro": "#E4EDED",
      }
    },
  },
  plugins: [],
} satisfies Config

