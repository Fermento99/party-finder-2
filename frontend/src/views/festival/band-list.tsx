import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Band, Vote } from 'api/models';
import { useNavigate } from 'react-router';
import { UserAvatar } from 'components/user-avatar';
import { useMemo, useState } from 'react';
import { VoteModal } from 'components/vote-modal';
import { filterRelevantVotes, sortVotes } from 'utils/sorting';
import { useSelector } from 'react-redux';
import { selectRelevantUserIds } from 'state/festival-details/selectors';
import { DefaultBadge } from 'components/default-badge';
import { getVoteColor } from 'utils/color-getters';
import { SortList } from 'components/sort-list';
import {
  selectBandFilter,
  selectBandFilterUserVotes,
  selectBandSort,
} from 'state/sort-slice/selectors';
import { sortBands } from 'utils/sorting/band-sorting';
import { FilterList } from 'components/filter-list';
import { filterBands } from 'utils/sorting/band-filtering';
import { formatFolowersNumber } from 'utils/formating';

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
  }, [bands, bandSort, bandFilter]);

  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
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

interface BandItemProps {
  band: Band;
  onSelect: () => void;
}

const BandItem = ({ band, onSelect }: BandItemProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem alignItems='center'>
        <Stack
          spacing={2}
          sx={{ width: '100%' }}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack
            flexGrow={1}
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={2}
            alignItems='center'
          >
            <ListItemAvatar>
              <Avatar
                variant='square'
                sx={{ width: 160, height: 160 }}
                src={
                  band.details.images.find(({ width }) => width === 160)?.url
                }
                alt={band.details.name}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/home/band/${band.spotify_id}`);
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={band.details.name}
              slotProps={{
                primary: {
                  variant: 'h3',
                  textAlign: { xs: 'center', sm: 'center', md: 'start' },
                },
                secondary: {
                  textAlign: { xs: 'center', sm: 'center', md: 'start' },
                },
              }}
              secondary={
                <Stack>
                  <Typography variant='body2'>
                    {formatFolowersNumber(band.details.followers)} followers
                  </Typography>
                  <Typography variant='body2'>
                    genres: {band.details.genres}
                  </Typography>
                </Stack>
              }
            />
          </Stack>
          <VotesList votes={band.votes} />
          <Button onClick={onSelect}>Vote</Button>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

interface VotersListProps {
  votes: Vote[];
}

const VotesList = ({ votes }: VotersListProps) => {
  const relevantUserIds = useSelector(selectRelevantUserIds);
  const userVotesFilter = useSelector(selectBandFilterUserVotes);

  return (
    <Stack sx={{ width: 110, alignItems: 'center' }}>
      <AvatarGroup max={3}>
        {votes
          .filter(
            (vote) =>
              filterRelevantVotes(relevantUserIds)(vote) &&
              (userVotesFilter.length === 0 ||
                userVotesFilter.includes(vote.user_id))
          )
          .sort(sortVotes)
          .map((vote) => (
            <DefaultBadge
              bgColor={getVoteColor(vote.vote)}
              tooltip={vote.vote_display}
              badgeContent={vote.vote}
            >
              <UserAvatar spotify_id={vote.user_id} />
            </DefaultBadge>
          ))}
      </AvatarGroup>
    </Stack>
  );
};
