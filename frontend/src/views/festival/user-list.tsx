import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { UserEntry } from 'api/models';
import { UserAvatar } from 'components/user-avatar';
import { sortUsersByStatus } from 'utils/array-utils';

interface UserListProps {
  users: UserEntry[];
}

export const UserList = ({ users }: UserListProps) => (
  <Stack>
    <Typography variant='h2'>User List:</Typography>
    <List>
      <Divider />
      {users.toSorted(sortUsersByStatus).map((user) => (
        <UserItem key={user.user_id} user_entry={user} />
      ))}
    </List>
  </Stack>
);

interface UserItemProps {
  user_entry: UserEntry;
}

const UserItem = ({
  user_entry: { user_nickname, user_status_display, user_status, user_id },
}: UserItemProps) => {
  const theme = useTheme();

  let bgColor: string;
  switch (user_status) {
    case 'C':
      bgColor = theme.palette.warning.main;
      break;
    case 'G':
      bgColor = theme.palette.success.main;
      break;
  }

  return (
    <>
      <ListItem sx={{ backgroundColor: bgColor }}>
        <ListItemAvatar>
          <UserAvatar spotify_id={user_id} />
        </ListItemAvatar>
        <ListItemText primary={user_nickname} secondary={user_status_display} />
      </ListItem>
      <Divider />
    </>
  );
};
