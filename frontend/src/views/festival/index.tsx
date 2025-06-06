import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { actionFetchFestivalDetails } from 'state/festival-slice/actions';
import { festivalDetailsDataSelector } from 'state/festival-slice/selectors';
import { UserList } from './user-list';
import { BandList } from './band-list';

type FestivalViewURLProps = {
  id: string;
};

export const FestivalView = () => {
  const { id } = useParams<FestivalViewURLProps>();
  const dispatch = useDispatch();
  const { loading, data } = useSelector(festivalDetailsDataSelector);

  useEffect(() => {
    dispatch(actionFetchFestivalDetails(id ?? '0'));
  }, [id, dispatch]);

  return (
    <Stack>
      {loading === 'successful' && (
        <Stack>
          <Box>
            <Typography variant='h1'>{data.name}</Typography>
            <Typography color='secondary'>
              {data.start_date} - {data.end_date}
            </Typography>
            <Typography color='secondary'>{data.place}</Typography>
          </Box>
          <UserList users={data.users} />
          <BandList bands={data.bands} />
        </Stack>
      )}
    </Stack>
  );
};
