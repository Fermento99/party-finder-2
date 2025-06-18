import { Divider, List, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchFestivalList } from 'state/festival-list/actions';
import {
  selectFestivalList,
  selectFestivalListLoadingStatus,
} from 'state/festival-list/selectors';
import { FestivalItem } from './festival-item';
import { LoadingHandler } from 'components/loading-handler';

export const DashboardView = () => {
  const festivalList = useSelector(selectFestivalList);
  const loadingStatus = useSelector(selectFestivalListLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionFetchFestivalList());
  }, [dispatch]);

  return (
    <LoadingHandler loading={loadingStatus}>
      <Stack>
        <List>
          <Divider />
          {festivalList?.map((festival) => (
            <>
              <FestivalItem key={festival.id} festival={festival} />
              <Divider />
            </>
          ))}
        </List>
      </Stack>
    </LoadingHandler>
  );
};
