import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { actionFetchCurrentUser } from 'state/user-slice/actions';
import { selectCurrentUserLoadingStatus } from 'state/user-slice/selectors';

const CardStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};

export const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector(selectCurrentUserLoadingStatus);

  useEffect(() => {
    dispatch(actionFetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'successful') navigate('/home');
  }, [loadingStatus, navigate]);

  return (
    <Card sx={CardStyle}>
      <CardHeader title='Party Finder' />
      <CardContent>
        <Typography>
          You need to login via Spotify to access Party Finder
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => window.location.replace('/api/login/')}>
          Login
        </Button>
      </CardActions>
    </Card>
  );
};
