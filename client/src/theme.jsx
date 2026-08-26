// color design tokens export
const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#FCE4EC",
    100: "#F8BBD0",
    200: "#F48FB1",
    300: "#F06292",
    400: "#EC407A",
    500: "#E91E63",
    600: "#D81B60",
    700: "#C2185B",
    800: "#AD1457",
    900: "#880E4F",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark" 
        ? {
            // palette values for dark mode
            primary: {
              lightest: colorTokens.grey[100],
              light: colorTokens.grey[500],
              main: colorTokens.grey[600],
              dark: colorTokens.grey[800],
            },
            secondary: {
              light: colorTokens.primary[200],
              main: colorTokens.primary[500],
              dark: colorTokens.primary[700],
            }
            
          }
        : {
            // palette values for light mode
            primary: {
              lightest: colorTokens.grey[700],
              light: colorTokens.grey[700],
              main: colorTokens.grey[400],
              dark: colorTokens.grey[100],
            },
            secondary: {
              light: colorTokens.primary[200],
              main: colorTokens.primary[500],
              dark: colorTokens.primary[700],
            }
          }),
    },
  };
};