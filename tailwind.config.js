/** @type {import('tailwindcss').Config} */

module.exports = {
   darkMode: 'class',
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],

   theme: {
      extend: {
         keyframes: {
            from: { transform: 'rotateY(0deg) scale(2.0)' },
            to: { transform: 'rotateY(360deg) scale(1.0)' },
         },
         animation: {
            intro: 'intro 2s ease-in-out',
         },
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
      },
   },
   plugins: [],
}
