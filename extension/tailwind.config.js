/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        lessborder: "hsl(var(--less-border))", // x
        lessinput: "hsl(var(--less-input))", // x
        lessring: "hsl(var(--less-ring))", // x
        lessbackground: "hsl(var(--less-background))", // x
        lessforeground: "hsl(var(--less-foreground))", // x
        lessprimary: { // x
          DEFAULT: "hsl(var(--less-primary))",
          foreground: "hsl(var(--less-primary-foreground))",
        },
        lesssecondary: { // x
          DEFAULT: "hsl(var(--less-secondary))",
          foreground: "hsl(var(--less-secondary-foreground))",
        },
        lessdestructive: { // x
          DEFAULT: "hsl(var(--less-destructive))",
          foreground: "hsl(var(--less-destructive-foreground))",
        },
        lessmuted: { // x
          DEFAULT: "hsl(var(--less-muted))",
          foreground: "hsl(var(--less-muted-foreground))",
        },
        lessaccent: { // x
          DEFAULT: "hsl(var(--less-accent))",
          foreground: "hsl(var(--less-accent-foreground))",
        },
        lesspopover: { // x
          DEFAULT: "hsl(var(--less-popover))",
          foreground: "hsl(var(--less-popover-foreground))",
        },
        lesscard: {
          DEFAULT: "hsl(var(--less-card))",
          foreground: "hsl(var(--less-card-foreground))",
        },
      },
      borderRadius: {
        lesslg: `var(--radius)`,
        lessmd: `calc(var(--radius) - 2px)`,
        lesssm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};


