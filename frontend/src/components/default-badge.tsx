import { Badge, BadgeProps, Palette, PaletteColor } from '@mui/material';

interface CustomBadgeProps {
  tooltip?: string;
  bgColor: keyof Palette;
}

export const DefaultBadge = ({
  tooltip,
  bgColor,
  ...props
}: BadgeProps & CustomBadgeProps) => (
  <Badge
    {...props}
    overlap='circular'
    sx={(theme) => ({
      '.MuiBadge-badge': {
        backgroundColor: (theme.palette[bgColor] as PaletteColor).main,
      },
    })}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    slotProps={{
      badge: () => ({
        title: tooltip,
      }),
    }}
  />
);
