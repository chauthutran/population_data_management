import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lemon-green": "#adf802",
        "yellow-green-shade": "#d2e100 ",
        "light-green-shade": "#8bd100",
        "deep-green": "#336633",
        "lemon-lime": "#CFFF52",
        "grayish-yellow": "#d7d8d3",
        "color-1": "#8dca02",
        "color-2": "#b0fd02",
        "color-3": "#476501",
        "color-4": "#6a9801",
        "color-5": "#233300",
        "bright-lime-green": "#80F802",
        "soft-lavender": "#D6A2E8",
        "muted-teal": "#66B2B2",
        "color-6": "#e8e8e8",
        "color-7": "#f2f2f2",
        "color-8": "#a2a2a2",

        // "deep-olive": "#4A6726",
        // "muted-teal": "#4F9D86",
        // "warm-gray": "#5F697A",
        // "soft-cream": "#FFF8D6",
        "pale-lemon": "#F9FFB3",
        // "pastel-sky": "#A3E1FF",
        // "rich-navy": "#1D3557",
        "warm-orange": "#FFAB40",
        // "bold-red": "#E63946",
        
        
        // "color-1": "#3491e8",
        // "color-2": "#b6e2ff",
        // "color-3": "#e3f3ff",
        // "color-4": "#f37bcf",
        // "color-5": "#68b631",
        // "color-6": "#f7fafd",
        // "color-7": "#bbf246",
        // "color-8": "#cfff52"
        
        
                        
        // "deep-navy-blue": "#2A4D69",
        // "dark-blue": "#1F3A50",
        // "very-dark-blue": "#1D3A52",
        // "soft-sky-blue": "#74B3CE",
        // "muted-teal": "#5A8A95",
        // "steel-gray": "#3E5C76",
        // "light-gray-blue-event": "#AFC7D1 ",
        // "light-gray-blue-odd": "#D4E3EB ",
        // "pale-blue": "#E5F0F7",
        // "sunset-orange": "#CE8774",
        // "light-sunset-orange": "#E5B99F",
        // "outrageous-orange": "#FF5E3A",
        // "rich-teal": "#417D7A",
        // "charcoal-gray": "#2C3E50",
        // "button-danger": "#E57373",
        // "sky-blue": "#64B5F6",
        // "soft-green": "#81C784",
        // "light-soft-green": "#9de2a0",
        
        
        
        // "sidebar-bg": "#74B3CE",
        // "navbar-bg": "#F8FAFC",
        // "card-bg": "#FFFFFF",
        // "button-primary": "#38A169",
        // "text-color": "#333F50",
        // "primary-bg": "#74B3CE",
        // "secondary-bg": "#F8FAFC"
      }
    },
  },
  plugins: [],
} satisfies Config

