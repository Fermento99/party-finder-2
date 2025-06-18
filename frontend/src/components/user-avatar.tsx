import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectUserDetails } from 'state/user-slice/selectors';
import { DefaultTooltip } from './default-tooltip';
import { MouseEvent } from 'react';

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

  let src = spotify_id;
  if (user) {
    const image = user?.details.images.find(({ height }) => height === 64)?.url;
    if (image) {
      src = image;
    } else {
      src = user.nickname;
    }
  }

  return (
    <DefaultTooltip title={tooltip ? user?.nickname ?? spotify_id : ''}>
      <Avatar
        alt={user?.nickname}
        src={src}
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
