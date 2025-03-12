import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy-blue": "#2A4D69",
        "very-dark-blue": "#1F3A50",
        "soft-sky-blue": "#74B3CE",
        "muted-teal": "#5A8A95",
        "steel-gray": "#3E5C76",
        "light-gray-blue-event": "#AFC7D1 ",
        "light-gray-blue-odd": "#D4E3EB ",
        "pale-blue": "#E5F0F7",
        "sunset-orange": "#CE8774",
        "light-sunset-orange": "#E5B99F",
        // "outrageous-orange": "#FF5E3A",
        "rich-teal": "#417D7A",
        "charcoal-gray": "#2C3E50",
        
        
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

