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
        bandId={selectedBand?.bandId}
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
        <Stack direction='row' sx={{ maxWidth: '50%', width: '50%' }}>
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
            secondary={
              <Stack>
                <Typography>
                  {formatFolowersNumber(band.details.followers)} followers
                </Typography>
                <Typography>genres: {band.details.genres}</Typography>
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

const VotesList = ({ votes }: VotersListProps) => (
  <AvatarGroup>
    {votes.map((vote) => (
      <UserAvatar spotify_id={vote.user_id} />
    ))}
  </AvatarGroup>
);
