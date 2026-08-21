/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF6E4",
          soft: "#FFEFD1",
          dark: "#F5E4C0"
        },
        juice: {
          red: "#E31C2B",
          "red-dark": "#9E1119",
          "red-deep": "#6E0C12",
          leaf: "#2FA84F",
          "leaf-dark": "#1E7A38",
          mango: "#FFB627",
          "mango-dark": "#F08C1D",
          berry: "#FF5F7E",
          ink: "#2B1210"
        }
      },
      fontFamily: {
        display: ["Roboto", "Arial", "sans-serif"],
        body: ["Roboto", "Arial", "sans-serif"],
        script: ["Roboto", "Arial", "sans-serif"]
      },
      boxShadow: {
        pop: "6px 6px 0px 0px rgba(43,18,16,0.9)",
        "pop-sm": "3px 3px 0px 0px rgba(43,18,16,0.9)",
        card: "0 10px 30px -12px rgba(110,12,18,0.35)",
        glow: "0 0 40px rgba(255,182,39,0.35)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r,0deg))" },
          "50%": { transform: "translateY(-18px) rotate(var(--r,0deg))" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-12px) rotate(4deg)" }
        },
        blobMorph: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" },
          "34%": { borderRadius: "60% 40% 30% 70% / 55% 65% 35% 45%" },
          "67%": { borderRadius: "35% 65% 55% 45% / 40% 55% 45% 60%" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        drip: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "scaleY(1)", opacity: "1" }
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        blobMorph: "blobMorph 12s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        drip: "drip 0.6s ease-out forwards",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
        spinSlow: "spinSlow 18s linear infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards"
      }
    }
  },
  plugins: []
};
