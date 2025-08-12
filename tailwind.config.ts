import type { Config } from 'tailwindcss';

export default {
    content: [
        './app/*.{js,ts,jsx,tsx}',
        "./app/**/*.{js,ts,jsx,tsx}",
        './ui/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            lg: '1024px',
            // ...
        },
        extend: {
            colors: {
                background: '#f1f3f4',
                'color-1': '#287ff9',
                'color-2': '#ffd823',
                'color-3': '#111111',
                'color-4': '#7eb4c4',
                'color-5': '#043873',
                'color-6': '#4f9cf9',

                'lemon-green': '#adf802',
                'yellow-green-shade': '#d2e100 ',
                'light-green-shade': '#8bd100',
                'deep-green': '#336633',
                'lemon-lime': '#CFFF52',
                'grayish-yellow': '#d7d8d3',
                'bright-lime-green': '#80F802',
                'soft-lavender': '#D6A2E8',
                'muted-teal': '#66B2B2',
                'pale-lemon': '#F9FFB3',
                'warm-orange': '#FFAB40'
            },
        },
    },
    plugins: [],
} satisfies Config;
