import { Divider, List, Stack, Typography } from '@mui/material';
import { Band, Vote } from 'api/models';
import { useMemo, useState } from 'react';
import { VoteModal } from 'components/vote-modal';
import { useSelector } from 'react-redux';
import { selectRelevantUserIds } from 'state/festival-details/selectors';
import { SortList } from 'components/sort-list';
import { selectBandFilter, selectBandSort } from 'state/sort-slice/selectors';
import { sortBands } from 'utils/sorting/band-sorting';
import { FilterList } from 'components/filter-list';
import { filterBands } from 'utils/sorting/band-filtering';
import { BandItem } from './band-item';

interface BandListPorps {
  bands: Band[];
}

interface SelectionState {
  votes?: Vote[];
  bandId?: string;
}

export const BandList = ({ bands }: BandListPorps) => {
  const [isVoteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [selectedBand, selectBand] = useState<SelectionState>();
  const relevantUserIds = useSelector(selectRelevantUserIds);
  const bandFilter = useSelector(selectBandFilter);
  const bandSort = useSelector(selectBandSort);

  const handleSelection = (payload: SelectionState) => {
    selectBand(payload);
    setVoteModalVisible(true);
  };

  const sortedBands = useMemo(() => {
    let tempBands = bands.map((band) => ({
      ...band,
      votes: band.votes.filter(({ user_id }) =>
        relevantUserIds?.includes(user_id)
      ),
    }));

    tempBands = filterBands(tempBands, bandFilter);

    return sortBands(tempBands, bandSort);
  }, [bands, bandSort, bandFilter, relevantUserIds]);

  return (
    <Stack>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mx: 2 }}
      >
        <Typography variant='h2'>Band List:</Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <FilterList />
          <SortList />
          <Typography color='text.secondary'>
            Items: {sortedBands.length}
          </Typography>
        </Stack>
      </Stack>
      <List>
        <Divider />
        {sortedBands.map((band) => (
          <BandItem
            key={band.spotify_id}
            band={band}
            onSelect={() =>
              handleSelection({ votes: band.votes, bandId: band.spotify_id })
            }
          />
        ))}
      </List>
      <VoteModal
        votes={selectedBand?.votes}
        band_id={selectedBand?.bandId}
        open={isVoteModalVisible}
        onClose={() => setVoteModalVisible(false)}
      />
    </Stack>
  );
};
