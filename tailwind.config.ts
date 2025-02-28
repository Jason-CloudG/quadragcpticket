
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'fade-in-right': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)'
					},
				},
				'fade-in-left': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)'
					},
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1)'
					},
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'fade-in-right': 'fade-in-right 0.4s ease-out',
				'fade-in-left': 'fade-in-left 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Playfair Display', 'serif'],
			},
			typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: 'var(--tw-prose-body)',
                        p: {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                        },
                        '[class~="lead"]': {
                            color: 'var(--tw-prose-lead)',
                        },
                        a: {
                            color: 'var(--tw-prose-links)',
                            textDecoration: 'underline',
                            fontWeight: '500',
                        },
                        strong: {
                            color: 'var(--tw-prose-bold)',
                            fontWeight: '600',
                        },
                        'ol[type="A"]': {
                            listStyleType: 'upper-alpha',
                        },
                        'ol[type="a"]': {
                            listStyleType: 'lower-alpha',
                        },
                        'ol[type="A" s]': {
                            listStyleType: 'upper-alpha',
                        },
                        'ol[type="a" s]': {
                            listStyleType: 'lower-alpha',
                        },
                        'ol[type="I"]': {
                            listStyleType: 'upper-roman',
                        },
                        'ol[type="i"]': {
                            listStyleType: 'lower-roman',
                        },
                        'ol[type="I" s]': {
                            listStyleType: 'upper-roman',
                        },
                        'ol[type="i" s]': {
                            listStyleType: 'lower-roman',
                        },
                        'ol[type="1"]': {
                            listStyleType: 'decimal',
                        },
                        'ol > li': {
                            position: 'relative',
                        },
                        'ul > li': {
                            position: 'relative',
                        },
                        blockquote: {
                            fontWeight: '500',
                            fontStyle: 'italic',
                            color: 'var(--tw-prose-quotes)',
                            borderLeftWidth: '0.25rem',
                            borderLeftColor: 'var(--tw-prose-quote-borders)',
                            quotes: '"\\201C""\\201D""\\2018""\\2019"',
                        },
                        'blockquote p:first-of-type::before': {
                            content: 'open-quote',
                        },
                        'blockquote p:last-of-type::after': {
                            content: 'close-quote',
                        },
                        h1: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '800',
                            fontSize: '2.25em',
                            marginTop: '0',
                            marginBottom: '0.8888889em',
                            lineHeight: '1.1111111',
                        },
                        'h1 strong': {
                            fontWeight: '900',
                            color: 'inherit',
                        },
                        h2: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '700',
                            fontSize: '1.5em',
                            marginTop: '2em',
                            marginBottom: '1em',
                            lineHeight: '1.3333333',
                        },
                        'h2 strong': {
                            fontWeight: '800',
                            color: 'inherit',
                        },
                        h3: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            fontSize: '1.25em',
                            marginTop: '1.6em',
                            marginBottom: '0.6em',
                            lineHeight: '1.6',
                        },
                        'h3 strong': {
                            fontWeight: '700',
                            color: 'inherit',
                        },
                        h4: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            marginTop: '1.5em',
                            marginBottom: '0.5em',
                            lineHeight: '1.5',
                        },
                        'h4 strong': {
                            fontWeight: '700',
                            color: 'inherit',
                        },
                        img: {
                            marginTop: '2em',
                            marginBottom: '2em',
                        },
                        picture: {
                            marginTop: '2em',
                            marginBottom: '2em',
                        },
                        'picture > img': {
                            marginTop: '0',
                            marginBottom: '0',
                        },
                        code: {
                            color: 'var(--tw-prose-code)',
                            fontWeight: '600',
                            fontSize: '0.875em',
                        },
                        'code::before': {
                            content: '"`"',
                        },
                        'code::after': {
                            content: '"`"',
                        },
                        'a code': {
                            color: 'inherit',
                        },
                        'h1 code': {
                            color: 'inherit',
                        },
                        'h2 code': {
                            color: 'inherit',
                        },
                        'h3 code': {
                            color: 'inherit',
                        },
                        'h4 code': {
                            color: 'inherit',
                        },
                        'blockquote code': {
                            color: 'inherit',
                        },
                        'thead': {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            borderBottomWidth: '1px',
                            borderBottomColor: 'var(--tw-prose-th-borders)',
                        },
                        'thead th': {
                            verticalAlign: 'bottom',
                            paddingRight: '0.5714286em',
                            paddingBottom: '0.5714286em',
                            paddingLeft: '0.5714286em',
                        },
                        'thead th:first-child': {
                            paddingLeft: '0',
                        },
                        'thead th:last-child': {
                            paddingRight: '0',
                        },
                        'tbody tr': {
                            borderBottomWidth: '1px',
                            borderBottomColor: 'var(--tw-prose-td-borders)',
                        },
                        'tbody tr:last-child': {
                            borderBottomWidth: '0',
                        },
                        'tbody td': {
                            verticalAlign: 'baseline',
                        },
                        tfoot: {
                            borderTopWidth: '1px',
                            borderTopColor: 'var(--tw-prose-th-borders)',
                        },
                        'tfoot td': {
                            verticalAlign: 'top',
                        },
                    },
                },
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography')
	],
} satisfies Config;
