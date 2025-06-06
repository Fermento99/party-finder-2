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
import { selectCurrentUserDetails } from 'state/user-slice/selectors';

export const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector(selectCurrentUserDetails);

  useEffect(() => {
    dispatch(actionFetchCurrentUser());
    dispatch(actionFetchUserList());
  }, [dispatch]);

  useEffect(() => {
    if (loading === 'failed') navigate('/login');
  }, [loading, navigate]);

  return (
    <>
      <AppBar sx={{ px: 2, py: 1 }}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <UserAvatar spotify_id={data?.spotify_id} tooltip={false} />
          <Typography>{data?.nickname}</Typography>
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
