/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // тёмная тема через класс .dark
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        "soft-light": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "soft-dark": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "soft-light-hover": "0 8px 24px rgba(255, 254, 254, 0.1)",
        "soft-dark-hover": "0 8px 24px rgba(0, 0, 0, 0.2)",
      },

      colors: {
        // Цвета будут взяты из CSS-переменных (определим их ниже)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        neonPink: "#FF6EC7",
        neonBlue: "#00FFFF",
        neonGreen: "#39FF14",
        neonCyan: "#10E8E8",
        neonWhite: "#E0FFFF",
      },

      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #FF6EC7, #00FFFF, #39FF14)",
        "gradient-purple": "linear-gradient(90deg, #5D3FD3, #A259FF)",
      },
      boxShadow: {
        neon: "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 80px #39FF14",
        neonSoft: "0 0 5px #00FFFF, 0 0 15px #00FFFF, 0 0 30px #39FF14",
      },
      textShadow: {
        neon: "0 0 8px #00FFFF, 0 0 10px #39FF14",
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease forwards",
        scaleIn: "scaleIn 0.4s ease forwards",
        textPop: "textPop 0.6s ease forwards",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        textPop: {
          "0%": { opacity: 0, transform: "translateY(20px) scale(0.9)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 5px #FF6EC7, 0 0 10px #00FFFF, 0 0 20px #39FF14",
          },
          "50%": {
            boxShadow: "0 0 20px #FF6EC7, 0 0 30px #00FFFF, 0 0 40px #39FF14",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-neon": {
          textShadow: "0 0 8px #00FFFF, 0 0 10px #39FF14",
        },
      })
    },
  ],
}
