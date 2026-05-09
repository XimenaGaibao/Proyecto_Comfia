// src/styles/tokens.js
export const C = {
  gold: "#8B6F47",
  goldDark: "#6B5035",
  goldLight: "#C4A882",
  cream: "#FFF9E6",
  creamDark: "#F5ECC8",
  white: "#FFFFFF",
  gray50: "#F9F7F4",
  gray100: "#EDE9E0",
  gray300: "#B8B0A0",
  gray500: "#7A7060",
  gray700: "#3D3528",
  red: "#D93025",
  green: "#2E7D32",
  greenLight: "#E8F5E9",
  orange: "#E65100",
  orangeLight: "#FFF3E0",
  blue: "#1565C0",
  blueLight: "#E3F2FD",
};

// Fuente única para TODO - Manrope
export const font = "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const fontSans = font; // Misma fuente para todo

export const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
  
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  body { 
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${C.cream}; 
    color: ${C.gray700}; 
  }
  
  /* Todos los títulos con Manrope */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
  }
  
  /* Todos los textos con Manrope */
  p, span, a, li, label, input, button, textarea, select {
    font-family: 'Manrope', sans-serif;
  }
  
  input, button, select, textarea { 
    font-family: 'Manrope', sans-serif; 
  }
  
  a { 
    text-decoration: none; 
    color: inherit; 
  }
`;