import {
  AvatarGroup,
  Box,
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
        slotProps={{ primary: { variant: 'h1', fontSize: 20 } }}
        secondary={
          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
            <Stack>
              <Typography variant='body2'>
                {start_date} - {end_date}
              </Typography>
              <Typography variant='body2'>{place}</Typography>
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
  <Box sx={{ width: 110 }}>
    <AvatarGroup max={3}>
      {users.toSorted(sortUsersByStatus).map((userEntry) => (
        <DefaultBadge
          bgColor={getStatusColor(userEntry.user_status)}
          tooltip={userEntry.user_status_display}
          badgeContent={userEntry.user_status}
        >
          <UserAvatar spotify_id={userEntry.user_id} />
        </DefaultBadge>
      ))}
    </AvatarGroup>
  </Box>
);
