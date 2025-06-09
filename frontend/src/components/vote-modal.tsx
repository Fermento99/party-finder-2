import { Card, CardActions, CardContent, Modal } from '@mui/material';
import { Vote } from 'api/models';
import { VoteList } from './vote-list';
import { VoteActions } from './vote-actions';
import { useSelector } from 'react-redux';
import { selectCurrentUserDetails } from 'state/user-slice/selectors';

const CardStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '90%',
};

interface VoteModalProps {
  votes?: Vote[];
  band_id?: string;
  open: boolean;
  onClose: () => void;
}

export const VoteModal = ({
  votes,
  band_id,
  open,
  onClose,
}: VoteModalProps) => {
  const { data, loading } = useSelector(selectCurrentUserDetails);

  let userVote = undefined;
  if (loading === 'successful') {
    userVote = votes?.find(({ user_id }) => user_id === data?.spotify_id)?.vote;
  }

  if (!band_id || !votes) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={CardStyle}>
        <CardContent>
          <VoteList band_id={band_id} />
        </CardContent>
        <CardActions>
          <VoteActions band_id={band_id} userVote={userVote} />
        </CardActions>
      </Card>
    </Modal>
  );
};
