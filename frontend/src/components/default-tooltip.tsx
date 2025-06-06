import { Tooltip, TooltipProps } from '@mui/material';

export const DefaultTooltip = (props: TooltipProps) => (
  <Tooltip arrow placement='top' {...props} />
);
