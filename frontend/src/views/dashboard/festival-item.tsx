import {
  AvatarGroup,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Festival, UserEntry } from 'api/models';
import { DefaultBadge } from 'components/default-badge';
import { UserAvatar } from 'components/user-avatar';
import { useNavigate } from 'react-router';
import { sortUsersByStatus } from 'utils/array-utils';
import { getStatusColor } from 'utils/color-getters';

interface FestivalItemProps {
  festival: Festival;
}

export const FestivalItem = ({
  festival: { id, name, end_date, start_date, place, users },
}: FestivalItemProps) => {
  const navigate = useNavigate();

  return (
    <ListItem onClick={() => navigate(`/home/festival/${id}`)}>
      <ListItemText
        primary={name}
        secondary={
          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
            <Stack>
              <Typography>
                {start_date} - {end_date}
              </Typography>
              <Typography>{place}</Typography>
            </Stack>
            <UserList users={users} />
          </Stack>
        }
      />
    </ListItem>
  );
};

interface UserListProps {
  users: UserEntry[];
}

const UserList = ({ users }: UserListProps) => (
  <AvatarGroup max={3}>
    {users.toSorted(sortUsersByStatus).map((userEntry) => (
      <DefaultBadge
        color={getStatusColor(userEntry.user_status)}
        tooltip={userEntry.user_status_display}
      >
        <UserAvatar spotify_id={userEntry.user_id} />
      </DefaultBadge>
    ))}
  </AvatarGroup>
);
