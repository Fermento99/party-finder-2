import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  selectFestivalDetails,
  selectFestivalDetailsLoadingStatus,
} from 'state/festival-details/selectors';
import { actionFetchFestivalDetails } from 'state/festival-details/actions';
import { UserList } from './user-list';
import { BandList } from './band-list';

type FestivalViewURLProps = {
  id: string;
};

export const FestivalView = () => {
  const { id } = useParams<FestivalViewURLProps>();
  const dispatch = useDispatch();
  const festivalDetails = useSelector(selectFestivalDetails);
  const loadingStatus = useSelector(selectFestivalDetailsLoadingStatus);

  useEffect(() => {
    dispatch(actionFetchFestivalDetails(id ?? '0'));
  }, [id, dispatch]);

  return (
    <Stack>
      {loadingStatus === 'successful' && (
        <Stack>
          <Box>
            <Typography variant='h1'>{festivalDetails!.name}</Typography>
            <Typography color='secondary'>
              {festivalDetails!.start_date} - {festivalDetails!.end_date}
            </Typography>
            <Typography color='secondary'>{festivalDetails!.place}</Typography>
          </Box>
          <UserList users={festivalDetails!.users} />
          <BandList bands={festivalDetails!.bands} />
        </Stack>
      )}
    </Stack>
  );
};
