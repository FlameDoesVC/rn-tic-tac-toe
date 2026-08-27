// themes.ts
export const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    text: '#1C1C1E',
    border: '#E5E5EA',
    xColor: '#e40000',
    oColor: '#007AFF',
    loseColor: '#404040'
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    text: '#FFFFFF',
    border: '#272729',
    xColor: '#e40000',
    oColor: '#007AFF', 
    loseColor: '#bababa'
  },
};

export type ThemeType = typeof lightTheme;
