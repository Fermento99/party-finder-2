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
import { LoadingHandler } from 'components/loading-handler';

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
    <LoadingHandler loading={loadingStatus}>
      <Stack sx={{ py: 2 }} spacing={2}>
        <Box>
          <Typography variant='h1'>{festivalDetails?.name}</Typography>
          <Typography color='text.secondary' variant='body2'>
            {festivalDetails?.start_date} - {festivalDetails?.end_date}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {festivalDetails?.place}
          </Typography>
        </Box>
        <UserList users={festivalDetails?.users ?? []} />
        <BandList bands={festivalDetails?.bands ?? []} />
      </Stack>
    </LoadingHandler>
  );
};
