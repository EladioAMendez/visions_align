module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        // VisionsAlign professional brand colors
        background: "#FAFBFC", // Professional light background
        card: "#FFFFFF", // Clean white cards
        primary: "#1A2332", // Deep navy - primary brand color
        secondary: "#475569", // Slate gray - secondary text
        accent: "#0EA5E9", // Sky blue - accent for CTAs and highlights
        success: "#07b39b", // Teal - for success states that align with the brand's palette
        warning: "#F59E0B", // Amber - warnings and attention
        error: "#EF4444", // Red - error states
        border: "#E2E8F0", // Light border for subtle divisions
        muted: "#64748B", // Muted text for secondary information
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90deg, #2A3B4C 0%, #3E5A72 25%, #5C8A9E 50%, #8FBCCF 75%, #C2E0F0 100%)",
      },
      animation: {
        opacity: "opacity 0.25s ease-in-out",
        appearFromRight: "appearFromRight 300ms ease-in-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
        popup: "popup 0.25s ease-in-out",
        shimmer: "shimmer 3s ease-out infinite alternate",
        // TeachingDream custom animations
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
        pulseOnCorrect: "pulseOnCorrect 1s ease-out forwards",
        shakeOnError: "shakeOnError 0.5s ease-in-out",
      },
      keyframes: {
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        appearFromRight: {
          "0%": { opacity: 0.3, transform: "translate(15%, 0px);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
        wiggle: {
          "0%, 20%, 80%, 100%": {
            transform: "rotate(0deg)",
          },
          "30%, 60%": {
            transform: "rotate(-2deg)",
          },
          "40%, 70%": {
            transform: "rotate(2deg)",
          },
          "45%": {
            transform: "rotate(-4deg)",
          },
          "55%": {
            transform: "rotate(4deg)",
          },
        },
        popup: {
          "0%": { transform: "scale(0.8)", opacity: 0.8 },
          "50%": { transform: "scale(1.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        // TeachingDream custom keyframes
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.9, transform: "scale(1.03)" },
        },
        pulseOnCorrect: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(107, 207, 127, 0)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 10px rgba(107, 207, 127, 0.7)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(107, 207, 127, 0)" },
        },
        shakeOnError: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-5px)" },
          "40%, 80%": { transform: "translateX(5px)" },
        },
      },
      borderRadius: {
        'card': '12px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      spacing: {
        'card-outer': '24px',
        'card-inner': '12px',
        'section-sm': '80px',
        'section-md': '120px',
        'section-lg': '160px',
        'executive': '200px',
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Light & dark themes are added by default (it switches automatically based on OS settings)
    // You can add another theme among the list of 30+
    // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
    // https://daisyui.com/
    themes: [{
      visionsalign: {
        "primary": "#1A2332", // Deep navy
        "secondary": "#475569", // Slate gray
        "accent": "#0EA5E9", // Sky blue
        "neutral": "#1A2332", // Dark for neutral elements
        "base-100": "#FFFFFF", // White base
        "base-200": "#FAFBFC", // Light background
        "base-300": "#F1F5F9", // Lighter background
        "success": "#07b39b", // Teal
        "warning": "#F59E0B", // Amber
        "error": "#EF4444", // Red
        "info": "#0EA5E9", // Sky blue for info
      }
    }, "light", "dark"],
  },
};
