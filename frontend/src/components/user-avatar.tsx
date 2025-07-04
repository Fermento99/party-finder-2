import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectUserDetails } from 'state/user-slice/selectors';
import { DefaultTooltip } from './default-tooltip';
import { MouseEvent } from 'react';
import { getImageSrc } from 'utils/images';

interface UserAvatarProps {
  spotify_id?: string;
  tooltip?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export const UserAvatar = ({
  spotify_id,
  tooltip = true,
  onClick,
}: UserAvatarProps) => {
  const navigate = useNavigate();

  const user = useSelector(selectUserDetails(spotify_id));

  let src = getImageSrc(64, user?.details.images, user?.nickname);

  return (
    <DefaultTooltip title={tooltip ? user?.nickname ?? spotify_id : ''}>
      <Avatar
        alt={user?.nickname}
        src={src}
        sx={{ '&.MuiAvatar-root': { border: 'none' } }}
        onClick={
          onClick
            ? onClick
            : (event) => {
                event.stopPropagation();
                navigate(`/home/user/${spotify_id}`);
              }
        }
      />
    </DefaultTooltip>
  );
};
