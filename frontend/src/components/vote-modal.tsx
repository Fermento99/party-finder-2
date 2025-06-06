import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
  Typography,
} from '@mui/material';
import { voteOnBand } from 'api/band';
import { Vote, VOTES_MAP, VoteValue } from 'api/models';
import { useNavigate } from 'react-router';

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
  bandId?: string;
  open: boolean;
  onClose: () => void;
}

export const VoteModal = ({ votes, bandId, open, onClose }: VoteModalProps) => {
  if (!bandId || !votes) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={CardStyle}>
        <CardContent>
          <VoteContent votes={votes} />
        </CardContent>
        <CardActions>
          <VoteActions bandId={bandId} />
        </CardActions>
      </Card>
    </Modal>
  );
};

interface VoteContentProps {
  votes: Vote[];
}

const VoteContent = ({ votes }: VoteContentProps) => {
  const data = votes.reduce<Record<VoteValue, UserChipProps[]>>(
    (acc, next) => {
      acc[next.vote].push({
        userId: next.user_id,
        nickname: next.user_nickname,
      });
      return acc;
    },
    { '1': [], '2': [], '3': [], '4': [], '5': [] }
  );

  return (
    <Table
      sx={(theme) => ({
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.divider,
      })}
    >
      <TableBody>
        {Object.entries(data).map(([key, value]) => (
          <TableRow>
            <Cell>
              <Typography>{VOTES_MAP[key as VoteValue]}</Typography>
            </Cell>
            <Cell>
              <Stack useFlexGap direction='row' flexWrap='wrap' spacing={1}>
                {value.map((voter) => (
                  <UserChip {...voter} />
                ))}
              </Stack>
            </Cell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface UserChipProps {
  userId: string;
  nickname: string;
}

const UserChip = ({ userId, nickname }: UserChipProps) => {
  const navigate = useNavigate();

  return (
    <Chip
      size='small'
      onClick={() => navigate(`/user/${userId}`)}
      label={nickname}
    />
  );
};

const Cell = (props: TableCellProps) => (
  <TableCell
    {...props}
    sx={(theme) => ({
      '&:not(:first-child)': {
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: theme.palette.divider,
        width: '50%',
      },
    })}
  />
);

interface VoteActionsProps {
  bandId: string;
}

const VoteActions = ({ bandId }: VoteActionsProps) => (
  <Stack direction='row' spacing={1}>
    {Object.entries(VOTES_MAP).map(([key, value]) => (
      <Button
        variant='outlined'
        key={key}
        onClick={() => voteOnBand(bandId, key as VoteValue)}
      >
        {value}
      </Button>
    ))}
  </Stack>
);
