import { createTheme } from '@mui/material';

interface FestivalStatusColor {
  main: string;
  hover: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    voteOneColor: Palette['primary'];
    voteTwoColor: Palette['primary'];
    voteThreeColor: Palette['primary'];
    voteFourColor: Palette['primary'];
    voteFiveColor: Palette['primary'];
    followGoingColor: Palette['primary'];
    followConsideringColor: Palette['primary'];
    festivalTileColor: FestivalStatusColor;
  }

  interface PaletteOptions {
    voteOneColor?: PaletteOptions['primary'];
    voteTwoColor?: PaletteOptions['primary'];
    voteThreeColor?: PaletteOptions['primary'];
    voteFourColor?: PaletteOptions['primary'];
    voteFiveColor?: PaletteOptions['primary'];
    followGoingColor?: PaletteOptions['primary'];
    followConsideringColor?: PaletteOptions['primary'];
    festivalTileColor?: FestivalStatusColor;
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
    background: {
      default: '#f0ead4',
      paper: '#f0ead4',
    },
    primary: {
      main: '#362514',
      contrastText: '#FAF8F0',
    },
    secondary: {
      main: '#3A707E',
      contrastText: '#FAF8F0',
    },
    voteOneColor: { main: '#bd8eda' },
    voteTwoColor: { main: '#8ec8da' },
    voteThreeColor: { main: '#8eda9d' },
    voteFourColor: { main: '#dac68e' },
    voteFiveColor: { main: '#da998e' },
    followGoingColor: { main: '#fd8c31' },
    followConsideringColor: { main: '#fee7b6' },

    festivalTileColor: { main: '#FAF8F0', hover: '#F5F1E0' },
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
