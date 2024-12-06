import type {Config} from 'tailwindcss';
import 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', 'sans-serif']
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        plugins: [
            '@tailwindcss/forms',
        ]
    }
} as Config;
