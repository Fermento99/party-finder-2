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

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    voteOneColor: true;
    voteTwoColor: true;
    voteThreeColor: true;
    voteFourColor: true;
    voteFiveColor: true;
  }
}

export const theme = createTheme({
  palette: {
    voteOneColor: { main: '#6a4c93' },
    voteTwoColor: { main: '#1982c4' },
    voteThreeColor: { main: '#8ac926' },
    voteFourColor: { main: '#ffca3a' },
    voteFiveColor: { main: '#ff595e' },
  },
});
