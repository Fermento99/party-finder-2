import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
  Typography,
} from '@mui/material';
import { VOTES_MAP, VoteValue } from 'api/models';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectBandVotes } from 'state/festival-details/selectors';
import { getVoteColor } from 'utils/color-getters';

interface VoteListProps {
  band_id: string;
}

export const VoteList = ({ band_id }: VoteListProps) => {
  const votes = useSelector(selectBandVotes(band_id));

  const data = votes?.reduce<Record<VoteValue, UserChipProps[]>>(
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
        {Object.entries(data ?? []).map(([key, value]) => (
          <TableRow
            sx={(theme) => ({
              backgroundColor:
                theme.palette[getVoteColor(key as VoteValue)].main,
            })}
          >
            <Cell>
              <Typography
                color={`${getVoteColor(key as VoteValue)}.contrastText`}
              >
                {VOTES_MAP[key as VoteValue]}
              </Typography>
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
