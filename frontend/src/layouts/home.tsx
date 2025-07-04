import {
  AppBar,
  Box,
  Divider,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserAvatar } from 'components/user-avatar';
import { useEffect, useState, MouseEvent } from 'react';
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

const NavButton = (props: IconButtonProps) => (
  <IconButton
    sx={(theme) => ({
      color: theme.palette.primary.contrastText,
    })}
    {...props}
  />
);

export const HomeLayout = () => {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <AppBar sx={{ px: 2, py: 1 }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row'>
            <NavButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </NavButton>
            <NavButton onClick={() => navigate('/home')}>
              <HomeFilledIcon />
            </NavButton>
          </Stack>
          <UserAvatar
            spotify_id={currentUser?.spotify_id}
            tooltip={false}
            onClick={(e) => openMenu(e as MouseEvent<HTMLElement>)}
          />
        </Stack>
      </AppBar>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem disabled>
          {currentUser?.nickname} ({currentUser?.details.display_name})
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => navigate(`/home/user/${currentUser?.spotify_id}`)}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={() => dispatch(actionUserLogout())}>Logout</MenuItem>
      </Menu>
      <Box sx={{ height: 56 }} />
      <Outlet />
    </>
  );
};
