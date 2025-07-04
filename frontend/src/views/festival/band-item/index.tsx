import { Band } from 'api/models';
import { formatFolowersNumber } from 'utils/formating';
import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { VotesList } from './VotesList';
import { BandAvatar } from './BandAvatar';

interface BandItemProps {
  band: Band;
  onSelect: () => void;
}

export const BandItem = ({ band, onSelect }: BandItemProps) => {
  return (
    <>
      <ListItem>
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
              <BandAvatar bandDetails={band.details} />
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
