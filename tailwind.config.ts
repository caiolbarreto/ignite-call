import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: '#121214',
      },

      colors: {
        gray100: '#E1E1E6',
        gray200: '#A9A9B2',
      },
    },
  },
  plugins: [],
}
export default config
