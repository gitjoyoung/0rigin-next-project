import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}
// {
//    "dependencies": {
//       "@auth/firebase-adapter": "^2.7.4",
//       "@headlessui/react": "^2.2.0",
//       "@heroicons/react": "^2.2.0",
//       "@hookform/resolvers": "^3.9.1",
//       "@uiw/react-markdown-preview": "^5.1.3",
//       "@uiw/react-md-editor": "4.0.5",
//       "@vercel/speed-insights": "^1.1.0",
//       "bcryptjs": "^2.4.3",
//       "browser-image-compression": "^2.0.2",
//       "clsx": "^2.1.1",
//       "currency.js": "^2.0.4",
//       "dayjs": "^1.11.13",
//       "firebase": "^11.1.0",
//       "firebase-admin": "^13.0.2",
//       "framer-motion": "^11.15.0",
//       "nanoid": "^5.0.9",
//       "next": "15.1.3",
//       "next-auth": "4.24.11",
//       "next-themes": "^0.4.4",
//       "openai": "^4.77.0",
//       "path-to-regexp": "^8.2.0",
//       "react": "^19.0.0",
//       "react-dom": "^19.0.0",
//       "react-hook-form": "^7.54.2",
//       "react-icons": "^5.4.0",
//       "react-query": "^3.39.3",
//       "rehype-sanitize": "^6.0.0",
//       "remark-gfm": "^4.0.0",
//       "unified": "^11.0.5",
//       "zod": "^3.24.1",
//       "zustand": "^5.0.2"
//    },
//    "devDependencies": {
//       "@radix-ui/react-slot": "^1.1.1",
//       "@tailwindcss/typography": "^0.5.15",
//       "@types/node": "^22.10.3",
//       "@types/react": "19.0.2",
//       "@types/react-dom": "^19.0.2",
//       "@typescript-eslint/eslint-plugin": "^8.19.0",
//       "@typescript-eslint/parser": "^8.19.0",
//       "autoprefixer": "^10.4.20",
//       "class-variance-authority": "^0.7.1",
//       "eslint": "^9.17.0",
//       "eslint-config-next": "15.1.3",
//       "eslint-config-prettier": "^9.1.0",
//       "eslint-plugin-import": "^2.31.0",
//       "eslint-plugin-prettier": "^5.2.1",
//       "husky": "^9.1.7",
//       "lint-staged": "^15.3.0",
//       "lucide-react": "^0.469.0",
//       "postcss": "^8",
//       "prettier": "^3.4.2",
//       "tailwind-merge": "^2.6.0",
//       "tailwindcss": "^3.4.1",
//       "tailwindcss-animate": "^1.0.7",
//       "typescript": "^5.7.2"
//    }
// }
