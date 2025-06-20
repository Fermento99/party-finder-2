import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { USER_STATUSES_MAP, UserEntry, UserStatusValue } from 'api/models';
import { UserAvatar } from 'components/user-avatar';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionFollowFestival,
  actionUnfollowFestival,
} from 'state/festival-details/actions';
import {
  selectFestivalDetails,
  selectUserFollowStatus,
} from 'state/festival-details/selectors';
import { selectCurrentUserIdAndNickname } from 'state/user-slice/selectors';
import { sortUsersByStatus } from 'utils/array-utils';
import { getStatusColor } from 'utils/color-getters';

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
    <FollowActions />
  </Stack>
);

interface UserItemProps {
  user_entry: UserEntry;
}

const UserItem = ({
  user_entry: { user_nickname, user_status_display, user_status, user_id },
}: UserItemProps) => (
  <>
    <ListItem
      sx={(theme) => ({
        backgroundColor: theme.palette[getStatusColor(user_status)].main,
      })}
    >
      <ListItemAvatar>
        <UserAvatar spotify_id={user_id} />
      </ListItemAvatar>
      <ListItemText primary={user_nickname} secondary={user_status_display} />
    </ListItem>
    <Divider />
  </>
);

const FollowActions = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { nickname, spotify_id } = useSelector(selectCurrentUserIdAndNickname);
  const festivalDetails = useSelector(selectFestivalDetails);
  const userFollowStatus = useSelector(selectUserFollowStatus(spotify_id!));

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Stack direction='row' spacing={1}>
      <Button
        sx={{ textTransform: 'capitalize' }}
        ref={menuButtonRef}
        variant={userFollowStatus?.user_status ? 'contained' : 'outlined'}
        color={
          userFollowStatus?.user_status
            ? getStatusColor(userFollowStatus?.user_status)
            : 'secondary'
        }
        onClick={openMenu}
      >
        {userFollowStatus?.user_status
          ? USER_STATUSES_MAP[userFollowStatus.user_status]
          : 'Choose Follow Status'}
      </Button>
      <Menu
        open={isMenuOpen}
        onClose={closeMenu}
        anchorEl={menuButtonRef.current}
      >
        {Object.entries(USER_STATUSES_MAP).map(([key, value]) => (
          <MenuItem
            sx={{ textTransform: 'capitalize' }}
            onClick={() => {
              dispatch(
                actionFollowFestival({
                  festival_id: festivalDetails!.id,
                  user_id: spotify_id!,
                  user_nickname: nickname!,
                  user_status: key as UserStatusValue,
                  user_status_display: value,
                })
              );
              closeMenu();
            }}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
      <Button
        color='error'
        variant='outlined'
        disabled={userFollowStatus === undefined}
        onClick={() =>
          dispatch(
            actionUnfollowFestival({
              festival_id: festivalDetails!.id,
              user_id: spotify_id!,
              user_nickname: nickname!,
              user_status: 'G',
              user_status_display: USER_STATUSES_MAP['G'],
            })
          )
        }
      >
        Unfollow festival
      </Button>
    </Stack>
  );
};
