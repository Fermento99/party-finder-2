import { Badge, BadgeProps } from '@mui/material';

interface CustomBadgeProps {
  tooltip?: string;
  bgColor?: string;
}

export const DefaultBadge = ({
  tooltip,
  bgColor,
  ...props
}: BadgeProps & CustomBadgeProps) => (
  <Badge
    {...props}
    overlap='circular'
    invisible={false}
    sx={{ 'MuiBadge-badge': { backgroundColor: bgColor } }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    variant='dot'
    slotProps={{
      badge: () => ({
        title: tooltip,
      }),
    }}
  />
);
