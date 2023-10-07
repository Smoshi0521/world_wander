import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
    colors: {
      background:"var(--background-color)",
      elements:"var(--elements)",
      input:"var(--input)",
      textBW:"var(--text)",
      hoverBG:"var(--hover)",
      hoverText:"var(--hoverText)",
      white:"#ffffff",
      transparent: "transparent",
      red: "#ef4444",
      yellow:"#eab308",
      violet: "#0284c7",
      black: "#111517",

    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },

  },
  plugins: [],
}
export default config
