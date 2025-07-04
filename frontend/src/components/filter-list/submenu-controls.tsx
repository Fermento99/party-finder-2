import { Button, Stack } from '@mui/material';

interface SubmenuControlsProps {
  onApply: () => void;
  onClear: () => void;
}

export const SubmenuControls = ({ onApply, onClear }: SubmenuControlsProps) => (
  <Stack
    direction='row'
    sx={{ px: 2, py: 0.75 }}
    justifyContent='space-between'
  >
    <Button color='secondary' variant='outlined' onClick={onClear}>
      Clear
    </Button>
    <Button color='secondary' variant='outlined' onClick={onApply}>
      Apply
    </Button>
  </Stack>
);
