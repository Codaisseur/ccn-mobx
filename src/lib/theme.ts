// src/lib/theme.ts
export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
    cardBackgroundColor: string;
  };
};

export const themes = {
  light: {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#eee",
      textColor: "#444",
      toolbarBackgroundColor: "#009688",
      cardBackgroundColor: "#fff",
    },
  },
  dark: {
    fontFamily: "sans-serif",
    colors: {
      backgroundColor: "#222",
      textColor: "#eee",
      toolbarBackgroundColor: "#111",
      cardBackgroundColor: "#333",
    },
  },
};
