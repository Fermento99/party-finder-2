import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectUserDetails } from 'state/user-slice/selectors';
import { DefaultTooltip } from './default-tooltip';

interface UserAvatarProps {
  spotify_id?: string;
  tooltip?: boolean;
}

export const UserAvatar = ({ spotify_id, tooltip = true }: UserAvatarProps) => {
  const navigate = useNavigate();

  const { data } = useSelector(selectUserDetails(spotify_id));

  let src = spotify_id;
  if (data) {
    const image = data.details.images.find(({ height }) => height === 64)?.url;
    if (image) {
      src = image;
    } else {
      src = data.nickname;
    }
  }

  return (
    <DefaultTooltip title={tooltip ? data?.nickname ?? spotify_id : ''}>
      <Avatar
        alt={data?.nickname}
        src={src}
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/home/user/${spotify_id}`);
        }}
      />
    </DefaultTooltip>
  );
};
