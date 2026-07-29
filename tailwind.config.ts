import type { Config } from "tailwindcss";

// すべての値は DESIGN_RULES.md（プロジェクトルート）と
// 確定済みデザインモック(Version 1)に基づくデザイントークン。
// コンポーネント側では色・余白・文字サイズを直接書かず、必ずこのトークンを参照すること。
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#6271A1",
          deep: "#46578F",
          footer: "#39456F",
        },
        magenta: "#C25383",
        green: {
          DEFAULT: "#3BA564",
          bg: "#E4F3E9",
          text: "#1F7A44",
        },
        ink: {
          DEFAULT: "#3A372F",
          soft: "#6B6862",
        },
        paper: "#FEFDFB",
        line: "#E3E6F0",
        placeholder: {
          DEFAULT: "#E7DBBE",
          icon: "#B7A67B",
        },
        "footer-text": "#E4E7F3",
        "footer-text-muted": "#9AA4CC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "sans-serif"],
      },
      fontSize: {
        h1: ["28px", { lineHeight: "1.35", fontWeight: "700" }],
        "h1-desktop": ["40px", { lineHeight: "1.35", fontWeight: "700" }],
        h2: ["22px", { lineHeight: "1.4", fontWeight: "700" }],
        "h2-desktop": ["28px", { lineHeight: "1.4", fontWeight: "700" }],
        h3: ["16px", { lineHeight: "1.5", fontWeight: "700" }],
        "h3-desktop": ["18px", { lineHeight: "1.5", fontWeight: "700" }],
        body: ["15px", { lineHeight: "1.8" }],
        "body-desktop": ["16px", { lineHeight: "1.8" }],
        caption: ["13px", { lineHeight: "1.5" }],
        eyebrow: ["12px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      borderRadius: {
        btn: "9px",
        card: "16px",
      },
      minHeight: {
        btn: "44px",
      },
      aspectRatio: {
        hero: "21 / 9",
        "hero-mobile": "3 / 4",
        card: "4 / 3",
        square: "1 / 1",
        portrait: "3 / 4",
        wide: "3 / 2",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
