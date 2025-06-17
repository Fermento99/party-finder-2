import { AppBar, Box, Button, Stack, Typography } from '@mui/material';
import { UserAvatar } from 'components/user-avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import {
  actionFetchCurrentUser,
  actionFetchUserList,
  actionUserLogout,
} from 'state/user-slice/actions';
import {
  selectCurrentUserDetails,
  selectCurrentUserLoadingStatus,
} from 'state/user-slice/selectors';

export const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUserDetails);
  const loadingStatus = useSelector(selectCurrentUserLoadingStatus);

  useEffect(() => {
    dispatch(actionFetchCurrentUser());
    dispatch(actionFetchUserList());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'failed') navigate('/login');
  }, [loadingStatus, navigate]);

  return (
    <>
      <AppBar sx={{ px: 2, py: 1 }}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <UserAvatar spotify_id={currentUser?.spotify_id} tooltip={false} />
          <Typography>{currentUser?.nickname}</Typography>
          <Button
            color='secondary'
            onClick={() => dispatch(actionUserLogout())}
          >
            Logout
          </Button>
        </Stack>
      </AppBar>
      <Box sx={{ height: 56 }} />
      <Outlet />
    </>
  );
};
