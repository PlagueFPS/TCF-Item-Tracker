import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: 'hsl(225, 8%, 9%)',
          800: 'hsl(0, 0% 13%)',
          700: 'hsl(0, 0%, 15%)',
          600: 'hsl(0, 0%, 20%)',
        },
        secondary: {
          900: 'hsl(205, 63%, 48%)',
          800: 'hsl(205, 78%, 60%)',
          700: 'hsl(205, 89%, 70%)',
          600: 'hsl(205, 90%, 76%)',
          500: 'hsl(205, 86%, 81%)',
          400: 'hsl(205, 90%, 88%)',
          300: 'hsl(205, 100%, 96%)'
        },
        button: 'hsl(205, 86%, 81%)',
        outline: 'hsl(0, 0%, 19%)',
        common: 'hsl(209, 23%, 60%)',
        uncommon: 'hsl(125, 67%, 44%)',
        rare: 'hsl(205, 63%, 48%)',
        epic: 'hsl(300, 38%, 51%)',
        legendary: 'hsl(39, 100%, 50%)',
        exotic: 'hsl(350, 100%, 50%)',
        commonText: "hsl(210, 31%, 80%)",
        uncommonText: "hsl(120, 100%, 92%)",
        rareText: "hsl(219, 100%, 87%)",
        epicText: "hsl(300, 100%, 92%)",
        legendaryText: "hsl(39, 100%, 90%)",
        exoticText: "hsl(0, 100%, 91%)",
        greenLight: '#6be675',
      },
      boxShadow: {
        primary: '0 5px 0 0 hsl(205, 78%, 60%), 0 0 0 3px hsl(205, 78%, 60%), 0 5px 0 3px hsl(205, 78%, 60%)',
        secondary: '0 5px 0 0 hsl(0, 0% 13%), 0 0 0 3px hsl(0, 0% 13%), 0 2px 0 3px hsl(0, 0% 13%)',
        outline: '0 5px 0 0 hsl(0, 0%, 19%), 0 0 0 3px hsl(0, 0%, 19%), 0 2px 0 3px hsl(0, 0%, 19%)',
        common: '0 5px 0 0 hsl(209, 23%, 60%), 0 0 0 3px hsl(209, 23%, 60%), 0 5px 0 3px hsl(209, 23%, 60%)',
        uncommon: '0 5px 0 0 hsl(125, 67%, 44%), 0 0 0 3px hsl(125, 67%, 44%), 0 5px 0 3px hsl(125, 67%, 44%)',
        rare: '0 5px 0 0 hsl(205, 63%, 48%), 0 0 0 3px hsl(205, 63%, 48%), 0 5px 0 3px hsl(205, 63%, 48%)',
        epic: '0 5px 0 0 hsl(300, 38%, 51%), 0 0 0 3px hsl(300, 38%, 51%), 0 5px 0 3px hsl(300, 38%, 51%)',
        legendary: '0 5px 0 0 hsl(39, 100%, 50%), 0 0 0 3px hsl(39, 100%, 50%), 0 5px 0 3px hsl(39, 100%, 50%)',
        exotic: '0 5px 0 0 hsl(350, 100%, 50%), 0 0 0 3px hsl(350, 100%, 50%), 0 5px 0 3px hsl(350, 100%, 50%)',
        imgcommon: '0 3px 0  hsl(209, 23%, 60%), 0 0 0 3px hsl(209, 23%, 60%), 0 5px 0 3px hsl(209, 23%, 60%)',
        imguncommon: '0 3px 0  hsl(125, 67%, 44%), 0 0 0 3px hsl(125, 67%, 44%), 0 1px 0 3px hsl(125, 67%, 44%)',
        imgrare: '0 3px 0  hsl(205, 63%, 48%), 0 0 0 3px hsl(205, 63%, 48%), 0 1px 0 3px hsl(205, 63%, 48%)',
        imgepic: '0 3px 0  hsl(300, 38%, 51%), 0 0 0 3px hsl(300, 38%, 51%), 0 1px 0 3px hsl(300, 38%, 51%)',
        imglegendary: '0 3px 0  hsl(39, 100%, 50%), 0 0 0 3px hsl(39, 100%, 50%), 0 1px 0 3px hsl(39, 100%, 50%)',
        imgexotic: '0 3px 0  hsl(350, 100%, 50%), 0 0 0 3px hsl(350, 100%, 50%), 0 1px 0 3px hsl(350, 100%, 50%)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)'  },
          '100%': { transform: 'translateY(0%)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(0%)'  },
          '100%': { transform: 'translateY(-100%)' }
        },
        slideIn: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0%)' }
        },
        slideOut: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(100%)' }
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          '10%': { transform: "translate(-1px, -2px) rotate(-1deg)" },
          '20%': { transform: "translate(-3px, 0px) rotate(1deg)" },
          '30%': { transform: "translate(3px, 2px) rotate(0deg)" },
          '40%': { transform: "translate(1px, -1px) rotate(1deg)" },
          '50%': { transform: "translate(-1px, 2px) rotate(-1deg)" },
          '60%': { transform: "translate(-3px, 1px) rotate(0deg)" },
          '70%': { transform: "translate(3px, 1px) rotate(-1deg)" },
          '80%': { transform: "translate(-1px, -1px) rotate(1deg)" },
          '90%': { transform: "translate(1px, 2px) rotate(0deg)" },
          '100%': { transform: "translate(1px, -2px) rotate(-1deg)" },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' }
        },
        bounceOut: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(0)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' }
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.25s ease-in-out forwards',
        'fadeOut': 'fadeOut 0.25s ease-in-out forwards',
        'slideUp': 'slideUp 0.25s ease-in-out forwards',
        'slideDown': 'slideDown 0.25s ease-in-out forwards',
        'bounceIn': 'bounceIn 0.25s ease-in-out forwards',
        'bounceOut': 'bounceOut 0.25s ease-in-out forwards',
        'slideIn': 'slideIn 0.25s ease-in-out forwards',
        'slideOut': 'slideOut 0.25s ease-in-out forwards',
        'shake': 'shake 0.5s linear forwards'
      },
      backgroundImage: {
        'default': 'radial-gradient(circle at top, rgba(130, 154, 176, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastcommon': 'radial-gradient(circle at left, rgba(130, 154, 176, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastuncommon': 'radial-gradient(circle at left, rgba(0, 255, 64, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastrare': 'radial-gradient(circle at left, rgba(0, 68, 255, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastepic': 'radial-gradient(circle at left, rgba(195, 0, 255, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastlegendary': 'radial-gradient(circle at left, rgba(255, 153, 0, 0.25), hsl(0, 0%, 13%) 60%)',
        'toastexotic': 'radial-gradient(circle at left, rgba(255, 0, 0, 0.25), hsl(0, 0%, 13%) 60%)',
        'itemcommon': 'radial-gradient(circle at top, rgba(130, 154, 176, 0.25), hsl(0, 0%, 13%) 80%)',
        'itemuncommon': 'radial-gradient(circle at top,rgba(0,255,64,.25),hsl(0, 0%, 13%) 80%)',
        'itemrare': 'radial-gradient(circle at top,rgba(0,68,255,.25),hsl(0, 0%, 13%) 80%)',
        'itemepic': 'radial-gradient(circle at top,rgba(195,0,255,.25),hsl(0, 0%, 13%) 80%)',
        'itemlegendary': 'radial-gradient(circle at top,rgba(255,153,0,.25),hsl(0, 0%, 13%) 80%)',
        'itemexotic': 'radial-gradient(circle at top,rgba(255,0,0,.25),hsl(0, 0%, 13%) 80%)',
        'imgcommon': 'radial-gradient(circle at center, rgba(130, 154, 176, 0.25), hsl(0, 0%, 13%) 80%)',
        'imguncommon': 'radial-gradient(circle at center,rgba(0,255,64,.25),hsl(0, 0%, 13%) 80%)',
        'imgrare': 'radial-gradient(circle at center,rgba(0,68,255,.25),hsl(0, 0%, 13%) 80%)',
        'imgepic': 'radial-gradient(circle at center,rgba(195,0,255,.25),hsl(0, 0%, 13%) 80%)',
        'imglegendary': 'radial-gradient(circle at center,rgba(255,153,0,.25),hsl(0, 0%, 13%) 80%)',
        'imgexotic': 'radial-gradient(circle at center,rgba(255,0,0,.25),hsl(0, 0%, 13%) 80%)',
        'badum': 'radial-gradient(circle at top, rgba(195,0,255,.25), hsl(0, 0%, 13%) 60%)',
        'korolev': 'radial-gradient(circle at top, rgba(255, 153, 0, 0.25), hsl(0, 0%, 13%) 60%)',
        'ica': 'radial-gradient(circle at top, rgba(0, 68, 255, 0.25), hsl(0, 0%, 13%) 60%)',
        'osiris': 'radial-gradient(circle at top, rgba(0, 255, 64, 0.25), hsl(0, 0%, 13%) 60%)'
      },
      dropShadow: {
        'title': '0 4px 10px rgba(0,0,0,1)'
      }
    },
  },
  plugins: [],
}
export default config
