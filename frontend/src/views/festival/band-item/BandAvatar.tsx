import { Avatar } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { BandDetails } from 'api/models';
import { DefaultTooltip } from 'components/default-tooltip';
import { MouseEvent } from 'react';
import { getImageSrc } from 'utils/images';

interface BandAvaterProps {
  bandDetails: BandDetails;
}

export const BandAvatar = ({ bandDetails }: BandAvaterProps) => {
  const avatarSrc = getImageSrc(160, bandDetails.images);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.open(bandDetails.url, '_blank');
  };
  return (
    <DefaultTooltip title='Open Spotify page'>
      <Avatar
        variant='square'
        sx={{ width: 160, height: 160, cursor: 'pointer' }}
        src={avatarSrc}
        alt={bandDetails.name}
        slots={{
          fallback: MusicNoteIcon,
        }}
        slotProps={{ fallback: { sx: { fontSize: 150 } } }}
        onClick={handleAvatarClick}
      />
    </DefaultTooltip>
  );
};
