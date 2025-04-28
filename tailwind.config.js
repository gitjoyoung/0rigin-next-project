/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ['class'],
   content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
      './src/features/**/*.{js,ts,jsx,tsx,mdx}',
      './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
      './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         fontFamily: {
            sans: ['Noto Sans KR', 'sans-serif'],
            mono: ['Fira Code', 'monospace'],
            dos: ['DOS', 'monospace'],
         },
         colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
            sidebar: {
               DEFAULT: 'hsl(var(--sidebar))',
               foreground: 'hsl(var(--sidebar-foreground))',
               border: 'hsl(var(--sidebar-border))',
               accent: {
                  DEFAULT: 'hsl(var(--sidebar-accent))',
                  foreground: 'hsl(var(--sidebar-accent-foreground))',
               },
               ring: 'hsl(var(--sidebar-ring))',
            },
            chart: {
               1: 'hsl(var(--chart-1))',
               2: 'hsl(var(--chart-2))',
               3: 'hsl(var(--chart-3))',
               4: 'hsl(var(--chart-4))',
               5: 'hsl(var(--chart-5))',
            },
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         keyframes: {
            'accordion-down': {
               from: {
                  height: '0',
               },
               to: {
                  height: 'var(--radix-accordion-content-height)',
               },
            },
            'accordion-up': {
               from: {
                  height: 'var(--radix-accordion-content-height)',
               },
               to: {
                  height: '0',
               },
            },
            'rotate-fade-in': {
               '0%': {
                  opacity: '0',
                  transform: 'rotate(-180deg) scale(0.5)',
               },
               '100%': {
                  opacity: '1',
                  transform: 'rotate(0deg) scale(1)',
               },
            },
            'fade-in': {
               from: {
                  opacity: '0',
               },
               to: {
                  opacity: '1',
               },
            },
            'marquee-y': {
               '0%': { transform: 'translateY(0)' },
               '100%': { transform: 'translateY(-50%)' },
            },
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'rotate-fade-in':
               'rotate-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            'fade-in': 'fade-in 0.3s ease-out forwards',
            'marquee-y': 'marquee-y 10s linear infinite',
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
}
