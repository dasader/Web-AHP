import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b3d6e",
      dark: "#0f2340",
      light: "#2d5f9e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b07d28",
      dark: "#8c621a",
      light: "#d4a650",
      contrastText: "#ffffff",
    },
    error:   { main: "#891818", dark: "#6d1212", light: "#a01e1e" },
    success: { main: "#1e6b45", dark: "#155236", light: "#22804f" },
    warning: { main: "#92540a", dark: "#7a4408", light: "#a8600c" },
    background: {
      default: "#f6f2eb",
      paper:   "#ffffff",
    },
    text: {
      primary:   "#131826",
      secondary: "#3d4f6e",
      disabled:  "#6e7d9a",
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontSize: "clamp(2.2rem,5vw,4rem)",   fontWeight: 700, lineHeight: 1.1,  letterSpacing: "-0.02em" },
    h2: { fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em" },
    h3: { fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 600, lineHeight: 1.2 },
    body1: { fontSize: "1rem",      lineHeight: 1.6 },
    body2: { fontSize: "0.875rem",  lineHeight: 1.55 },
    button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.01em" },
  },
  shape: { borderRadius: 10 },
  spacing: 8,
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-family)",
          transition: "background-color 350ms cubic-bezier(0.4,0,0.2,1), color 350ms cubic-bezier(0.4,0,0.2,1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontSize: "var(--font-size-sm)" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "var(--font-size-sm)" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontSize: "var(--font-size-sm)" },
      },
    },
  },
});

export default theme;
