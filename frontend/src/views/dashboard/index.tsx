import { Divider, List, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchFestivalList } from 'state/festival-slice/actions';
import { festivalListDataSelector } from 'state/festival-slice/selectors';
import { FestivalItem } from './festival-item';

export const DashboardView = () => {
  const festivalListData = useSelector(festivalListDataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionFetchFestivalList());
  }, [dispatch]);

  return (
    <Stack>
      <Typography>Festival List:</Typography>
      <List>
        <Divider />
        {festivalListData.loading === 'successful' &&
          festivalListData.data?.map((festival) => (
            <>
              <FestivalItem key={festival.id} festival={festival} />
              <Divider />
            </>
          ))}
      </List>
    </Stack>
  );
};
