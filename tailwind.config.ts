import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#74B3CE",
        "navbar-bg": "#F8FAFC",
        "card-bg": "#FFFFFF",
        "button-primary": "#38A169",
        "button-danger": "#E57373",
        "text-color": "#333F50",
        "primary-bg": "#74B3CE",
        "secondary-bg": "#F8FAFC"
      }
    },
  },
  plugins: [],
} satisfies Config

