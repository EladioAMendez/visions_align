module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'primary-text': '#2A3B4C',
  			'secondary-text': '#3E5A72',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			highlight: '#8FBCCF',
  			border: 'hsl(var(--border))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			warning: '#F59E0B',
  			error: '#EF4444',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'brand-gradient': 'linear-gradient(90deg, #2A3B4C 0%, #3E5A72 25%, #5C8A9E 50%, #8FBCCF 75%, #C2E0F0 100%)'
  		},
  		animation: {
  			opacity: 'opacity 0.25s ease-in-out',
  			appearFromRight: 'appearFromRight 300ms ease-in-out',
  			wiggle: 'wiggle 1.5s ease-in-out infinite',
  			popup: 'popup 0.25s ease-in-out',
  			insightFadeIn: 'insightFadeIn 0.5s ease-out forwards',
  			alignPulse: 'alignPulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
  			pathSlideUp: 'pathSlideUp 0.5s ease-out forwards',
  			dataShimmer: 'dataShimmer 1.5s infinite ease-in-out',
  			connectExpand: 'connectExpand 0.4s ease-out forwards',
  			fadeInUp: 'fadeInUp 0.5s ease-out forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			opacity: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			appearFromRight: {
  				'0%': {
  					opacity: 0.3,
  					transform: 'translate(15%, 0px);'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translate(0);'
  				}
  			},
  			wiggle: {
  				'0%, 20%, 80%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'30%, 60%': {
  					transform: 'rotate(-2deg)'
  				},
  				'40%, 70%': {
  					transform: 'rotate(2deg)'
  				},
  				'45%': {
  					transform: 'rotate(-4deg)'
  				},
  				'55%': {
  					transform: 'rotate(4deg)'
  				}
  			},
  			popup: {
  				'0%': {
  					transform: 'scale(0.8)',
  					opacity: 0.8
  				},
  				'50%': {
  					transform: 'scale(1.1)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: 1
  				}
  			},
  			insightFadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			alignPulse: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.02)',
  					opacity: '0.95'
  				}
  			},
  			pathSlideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(15px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			dataShimmer: {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.6
  				}
  			},
  			connectExpand: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(1.05)'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		borderRadius: {
  			card: '12px',
  			lg: 'var(--radius)',
  			xl: '16px',
  			'2xl': '24px',
  			'3xl': '32px',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'100': '25rem',
  			'card-outer': '24px',
  			'card-inner': '12px',
  			'section-sm': '80px',
  			'section-md': '120px',
  			'section-lg': '160px',
  			executive: '200px'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			display: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1.1'
  				}
  			]
  		},
  		fontWeight: {
  			light: 300,
  			normal: 400,
  			medium: 500,
  			semibold: 600,
  			bold: 700,
  			extrabold: 800
  		}
  	}
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    // Light & dark themes are added by default (it switches automatically based on OS settings)
    // You can add another theme among the list of 30+
    // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
    // https://daisyui.com/
    themes: [{
      visionsalign: {
        "primary": "#2A3B4C",       // Deep Slate Blue (Primary Text)
        "secondary": "#3E5A72",     // Muted Steel Blue (Secondary Text)
        "accent": "#5C8A9E",        // Soft Teal (CTA)
        "neutral": "#2A3B4C",       // Using primary for neutral elements
        "base-100": "#FFFFFF",      // White base (Card)
        "base-200": "#FAFBFC",      // Light background
        "base-300": "#F1F5F9",      // Lighter background/border
        "success": "#8FBCCF",       // Light Sky Blue (Highlight/Success)
        "warning": "#F59E0B",       // Amber
        "error": "#EF4444",         // Red
        "info": "#8FBCCF",          // Using success color for info
      }
    }, "light", "dark"],
  },
};
