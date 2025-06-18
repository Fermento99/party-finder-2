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
import { format } from 'd3-format';
import { Band, Vote } from 'api/models';
import { useNavigate } from 'react-router';
import { UserAvatar } from 'components/user-avatar';
import { useState } from 'react';
import { VoteModal } from 'components/vote-modal';
import { filterRelevantVotes, sortVotes } from 'utils/array-utils';
import { useSelector } from 'react-redux';
import { selectRelevantUsers } from 'state/festival-details/selectors';
import { DefaultBadge } from 'components/default-badge';
import { getVoteColor } from 'utils/color-getters';

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

  const handleSelection = (payload: SelectionState) => {
    selectBand(payload);
    setVoteModalVisible(true);
  };

  return (
    <Stack>
      <Typography variant='h2'>Band List:</Typography>
      <List>
        <Divider />
        {bands.map((band) => (
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

const formatFolowersNumber = format('.3s');

interface BandItemProps {
  band: Band;
  onSelect: () => void;
}

const BandItem = ({ band, onSelect }: BandItemProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem sx={{ justifyContent: 'space-between' }}>
        <Stack
          direction='row'
          sx={{ width: '70%', maxWidth: 'calc(100% - 190px)' }}
        >
          <ListItemAvatar>
            <Avatar
              variant='square'
              sx={{ width: 160, height: 160, mr: 2 }}
              src={band.details.images.find(({ width }) => width === 160)?.url}
              alt={band.details.name}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/home/band/${band.spotify_id}`);
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={band.details.name}
            slotProps={{ primary: { variant: 'h3' } }}
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
      </ListItem>
      <Divider />
    </>
  );
};

interface VotersListProps {
  votes: Vote[];
}

const VotesList = ({ votes }: VotersListProps) => {
  const relevantUsers = useSelector(selectRelevantUsers);

  return (
    <Stack sx={{ width: 110, alignItems: 'center' }}>
      <AvatarGroup max={3}>
        {votes
          .filter(filterRelevantVotes(relevantUsers))
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
