/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      container: {
         // 추가
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         colors: {
            // 기존 색상 유지
            gray: {
               primary: '#333333',
               secondary: '#4F4F4F',
               tertiary: '#828282',
            },
            dark: {
               primary: '#1a1a1a',
               secondary: '#2d2d2d',
               text: '#ffffff',
               accent: '#4a9eff',
            },
            light: {
               primary: '#ffffff',
               secondary: '#f5f5f5',
               text: '#000000',
               accent: '#0066cc',
            },
            // shadcn-ui 색상 추가
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
         },
         keyframes: {
            // 기존 키프레임 유지
            from: { transform: 'rotateY(0deg) scale(2.0)' },
            to: { transform: 'rotateY(360deg) scale(1.0)' },
            // shadcn-ui 키프레임 추가
            'accordion-down': {
               from: { height: 0 },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: 0 },
            },
         },
         animation: {
            // 기존 애니메이션 유지
            intro: 'intro 2s ease-in-out',
            // shadcn-ui 애니메이션 추가
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
         },
      },
   },
   plugins: [
      require('@tailwindcss/typography'),
      require('tailwindcss-animate'), // 추가
   ],
}
