import { Button, Stack } from '@mui/material';
import { VOTES_MAP, VoteValue } from 'api/models';
import { useDispatch, useSelector } from 'react-redux';
import { actionUnvote, actionVote } from 'state/festival-slice/actions';
import { selectUsersBandVote } from 'state/festival-slice/selectors';
import { selectCurrentUserIdAndNickname } from 'state/user-slice/selectors';

interface VoteActionsProps {
  band_id: string;
  userVote?: VoteValue;
}

export const VoteActions = ({ band_id }: VoteActionsProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUserIdAndNickname);
  const userVote = useSelector(selectUsersBandVote(band_id, user.spotify_id));

  const getButtonColor = (vote: VoteValue) => {
    switch (vote) {
      case '1':
        return 'voteOneColor';
      case '2':
        return 'voteTwoColor';
      case '3':
        return 'voteThreeColor';
      case '4':
        return 'voteFourColor';
      case '5':
        return 'voteFiveColor';
    }
  };

  return (
    <Stack direction='row' spacing={1}>
      {Object.entries(VOTES_MAP).map(([key, value]) => (
        <Button
          sx={{ maxWidth: '16.6%' }}
          size='small'
          variant={
            userVote && userVote === (key as VoteValue)
              ? 'contained'
              : 'outlined'
          }
          color={getButtonColor(key as VoteValue)}
          key={key}
          onClick={() =>
            dispatch(
              actionVote({
                band_id,
                vote: key as VoteValue,
                vote_display: VOTES_MAP[key as VoteValue],
                user_id: user.spotify_id,
                user_nickname: user.nickname,
              })
            )
          }
        >
          {key}: {value}
        </Button>
      ))}
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
              user_id: user.spotify_id,
              user_nickname: user.nickname,
            })
          )
        }
      >
        Remove my vote
      </Button>
    </Stack>
  );
};
