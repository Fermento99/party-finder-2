import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    voteOneColor: Palette['primary'];
    voteTwoColor: Palette['primary'];
    voteThreeColor: Palette['primary'];
    voteFourColor: Palette['primary'];
    voteFiveColor: Palette['primary'];
    followGoingColor: Palette['primary'];
    followConsideringColor: Palette['primary'];
  }

  interface PaletteOptions {
    voteOneColor?: PaletteOptions['primary'];
    voteTwoColor?: PaletteOptions['primary'];
    voteThreeColor?: PaletteOptions['primary'];
    voteFourColor?: PaletteOptions['primary'];
    voteFiveColor?: PaletteOptions['primary'];
    followGoingColor?: PaletteOptions['primary'];
    followConsideringColor?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    voteOneColor: true;
    voteTwoColor: true;
    voteThreeColor: true;
    voteFourColor: true;
    voteFiveColor: true;
    followGoingColor: true;
    followConsideringColor: true;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F77F00',
    },
    secondary: {
      main: '#005D8F',
    },
    voteOneColor: { main: '#7e5dac' },
    voteTwoColor: { main: '#1982c4' },
    voteThreeColor: { main: '#8ac926' },
    voteFourColor: { main: '#ffca3a' },
    voteFiveColor: { main: '#ff595e' },
    followGoingColor: { main: '#cc5adb' },
    followConsideringColor: { main: '#dba72c' },
  },

  typography: {
    body2: {
      fontFamily: 'Share Tech Mono',
    },
    h1: {
      fontFamily: 'New Rocker',
    },
    h3: {
      fontFamily: 'Alfa Slab One',
    },
  },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
