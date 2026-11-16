/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FBFBF9',
          100: '#F8F8F5', // Primary background
          200: '#F1F2ED', // Secondary surface
          300: '#E7E9E2',
          400: '#D6D9CF',
        },
        charcoal: {
          900: '#1B201F',
          800: '#252B2A', // Primary text
          700: '#3D4543',
          500: '#737C78', // Secondary text
          400: '#949E9A',
          200: '#D1D7D4',
          100: '#E9EDE9',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E8EFE9', // Soft sage
          200: '#D0DFD3',
          400: '#7A9E8F',
          500: '#58786B', // Muted forest green
          600: '#405E53', // Deep sage
          700: '#324A42',
          800: '#243730',
          900: '#182520',
        },
        slateBlue: {
          100: '#EDF2F5', // Pale blue
          400: '#9DB3C2',
          500: '#7893A5', // Muted blue
          700: '#4D687A',
        },
        sand: {
          100: '#F6F3EE',
          200: '#EDE7DB', // Warm sand
          300: '#DFD6C3',
        },
        terracotta: {
          100: '#F7EBE7',
          300: '#DDA08C',
          500: '#BD826E', // Soft terracotta
          700: '#955845',
        },
        status: {
          success: '#4D7C66',
          'success-bg': '#EAF3EE',
          warning: '#C88A3A',
          'warning-bg': '#FCF5E9',
          critical: '#B64E48',
          'critical-bg': '#FAEDEC',
          info: '#597B93',
          'info-bg': '#EDF4F8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(37, 43, 42, 0.04), 0 1px 2px -1px rgba(37, 43, 42, 0.04)',
        'soft': '0 4px 16px -2px rgba(37, 43, 42, 0.06), 0 2px 6px -2px rgba(37, 43, 42, 0.03)',
        'lift': '0 10px 25px -3px rgba(37, 43, 42, 0.08), 0 4px 10px -4px rgba(37, 43, 42, 0.04)',
        'modal': '0 20px 40px -8px rgba(24, 37, 32, 0.16), 0 8px 16px -6px rgba(24, 37, 32, 0.08)',
      }
    },
  },
  plugins: [],
}
