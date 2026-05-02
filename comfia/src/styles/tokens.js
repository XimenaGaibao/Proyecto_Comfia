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

export const font = "'Manrope',Georgia serif";
export const fontSans = "'DM Sans', 'Segoe UI', sans-serif";

export const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${fontSans}; background: ${C.cream}; color: ${C.gray700}; }
  input, button, select, textarea { font-family: inherit; }
  a { text-decoration: none; color: inherit; }
`;
