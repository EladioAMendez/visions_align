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
        // TeachingDream custom colors from design spec
        background: "#F1F5F9", // Theme: Light Gray background
        card: "#FFFFFF", // Theme: White card backgrounds
        primary: "#1E293B", // Primary color: Dark Blue for question text and main content
        secondary: "#64748B", // Secondary color: Medium Gray for secondary information
        accent: "#4ECDC4", // Accent color: Teal for expand/collapse indicators
        success: "#6BCF7F", // Success color: Mint for helpful tip highlights
        border: "#F1F5F9", // Border color: Light Gray for card borders
      },
      backgroundImage: {
        gradient:
          "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
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
        'card': '12px', // Card border radius from design spec
      },
      spacing: {
        'card-outer': '24px', // Outer padding from design spec
        'card-inner': '12px', // Spacing between question cards from design spec
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontWeight: {
        normal: 400, // Regular weight for answers
        medium: 500, // Medium weight for questions
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
      teachingdream: {
        "primary": "#1E293B",
        "secondary": "#64748B",
        "accent": "#4ECDC4",
        "neutral": "#F1F5F9",
        "base-100": "#FFFFFF",
        "success": "#6BCF7F",
      }
    }, "light", "dark"],
  },
};
