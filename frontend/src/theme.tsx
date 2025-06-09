import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    voteOneColor: Palette['primary'];
    voteTwoColor: Palette['primary'];
    voteThreeColor: Palette['primary'];
    voteFourColor: Palette['primary'];
    voteFiveColor: Palette['primary'];
  }

  interface PaletteOptions {
    voteOneColor?: PaletteOptions['primary'];
    voteTwoColor?: PaletteOptions['primary'];
    voteThreeColor?: PaletteOptions['primary'];
    voteFourColor?: PaletteOptions['primary'];
    voteFiveColor?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    voteOneColor: true;
    voteTwoColor: true;
    voteThreeColor: true;
    voteFourColor: true;
    voteFiveColor: true;
  }
}

export const theme = createTheme({
  palette: {
    voteOneColor: { main: '#7453A2', light: '#A994C7' },
    voteTwoColor: { main: '#1982c4', light: '#5DB4EA' },
    voteThreeColor: { main: '#8ac926', light: '#B2E265' },
    voteFourColor: { main: '#ffca3a', light: '#FFD970' },
    voteFiveColor: { main: '#ff595e', light: '#FF7075' },
  },
});
