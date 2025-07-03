import { Button, MenuItem, Stack } from '@mui/material';
import { VOTES_MAP, VoteValue } from 'api/models';
import { useDispatch, useSelector } from 'react-redux';
import { actionUnvote, actionVote } from 'state/festival-details/actions';
import { selectUsersBandVote } from 'state/festival-details/selectors';
import { selectCurrentUserIdAndNickname } from 'state/user-slice/selectors';
import { getVoteColor } from 'utils/color-getters';
import { ButtonMenu } from './button-menu';

interface VoteActionsProps {
  band_id: string;
  userVote?: VoteValue;
}

export const VoteActions = ({ band_id }: VoteActionsProps) => {
  const dispatch = useDispatch();
  const { spotify_id, nickname } = useSelector(selectCurrentUserIdAndNickname);
  const userVote = useSelector(selectUsersBandVote(band_id, spotify_id!));

  return (
    <Stack direction='row' spacing={1}>
      <ButtonMenu
        buttonLabel={userVote ? VOTES_MAP[userVote] : 'Select Your Vote'}
        buttonProps={{
          disableElevation: true,
          sx: { textTransform: 'capitalize' },
          variant: userVote ? 'contained' : 'outlined',
          color: userVote ? getVoteColor(userVote) : 'secondary',
        }}
      >
        {Object.entries(VOTES_MAP).map(([key, value]) => (
          <MenuItem
            key={key}
            sx={{ textTransform: 'capitalize' }}
            color={getVoteColor(key as VoteValue)}
            onClick={() => {
              dispatch(
                actionVote({
                  band_id,
                  vote: key as VoteValue,
                  vote_display: VOTES_MAP[key as VoteValue],
                  user_id: spotify_id!,
                  user_nickname: nickname!,
                })
              );
            }}
          >
            {key}: {value}
          </MenuItem>
        ))}
      </ButtonMenu>
      <Button
        variant='outlined'
        color='error'
        disabled={userVote === undefined}
        onClick={() =>
          dispatch(
            actionUnvote({
              band_id,
              vote: userVote!,
              vote_display: VOTES_MAP[userVote!],
              user_id: spotify_id!,
              user_nickname: nickname!,
            })
          )
        }
      >
        Remove my vote
      </Button>
    </Stack>
  );
};
