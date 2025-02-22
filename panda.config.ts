import { defineConfig } from "@pandacss/dev";

export const tokens = {
  colors: {
    primary: {
      value: "#BA1884",
    },
    secondary: {
      value: "#1A202C",
    },
    background: {
      light: { value: "#F6F6F6" },
      dark: { value: "#14151A" },
      header: {
        light: { value: "#FFFFFF" },
        dark: { value: "#141416" },
      },
      search: {
        light: { value: "#E3E3E3" },
        dark: { value: "#23232C" },
      },
    },
    text: {
      light: { value: "#000000" },
      dark: { value: "#FFFFFF" },
    },
    paragraph: {
      light: { value: "#222222" },
      dark: { value: "#9B9B9B" },
    },
  },
};

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],

  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      breakpoints: {
        xs: "480px",
        sm: "640px",
        md: "820px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },

  globalCss: {
    html: {
      h: "full",
    },
    p: {
      letterSpacing: 0.5,
    },
    ":root": {
      body: {
        color: "{colors.text.light}",
        backgroundColor: "{colors.background.light}",
      },
      ".header": {
        backgroundColor: "{colors.background.header.light}",
        borderBottom: "2px solid rgba(200, 200, 200, .6)",
        boxShadow: "0px 2px 16px 4px rgba(50,50,50,0.15)",
      },
      ".menu": {
        backgroundColor: "{colors.background.header.light}",
        boxShadow: "0px 8px 8px rgba(50,50,50,0.15)",
      },
      ".search": {
        backgroundColor: "{colors.background.search.light}",
        color: "#555555",
      },
      ".filters": { backgroundColor: "{colors.background.light}" },
      ".modal": {
        backgroundColor: "{colors.background.light}",
        boxShadow: { base: "0 0 14px rgba(0,0,0,0.35)", sm: "none" },
      },
      ".tile": { backgroundColor: "#FFFFFF" },
      "& p": {
        color: "{colors.paragraph.light}",
      },
    },
    '[data-theme="dark"]': {
      body: {
        color: "{colors.text.dark}",
        backgroundColor: "{colors.background.dark}",
      },
      ".header": {
        backgroundColor: "{colors.background.header.dark}",
        borderBottom: "2px solid rgba(0, 0, 0, .3)",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.75)",
      },
      ".menu": {
        backgroundColor: "{colors.background.header.dark}",
        boxShadow: "0px 8px 8px rgba(0,0,0,0.55)",
      },
      ".search": {
        backgroundColor: "{colors.background.search.dark}",
        color: "#AAAAAA",
      },
      ".filters": { backgroundColor: "{colors.background.dark}" },
      ".modal": {
        backgroundColor: "{colors.background.dark}",
        boxShadow: { base: "0 0 14px rgba(0,0,0,0.7)", sm: "none" },
      },
      ".tile": {
        backgroundColor: "{colors.background.search.dark}",
      },
      "& p": {
        color: "{colors.paragraph.dark}",
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
