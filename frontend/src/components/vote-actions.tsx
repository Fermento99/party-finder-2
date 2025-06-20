import { Button, Menu, MenuItem, Stack } from '@mui/material';
import { VOTES_MAP, VoteValue } from 'api/models';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionUnvote, actionVote } from 'state/festival-details/actions';
import { selectUsersBandVote } from 'state/festival-details/selectors';
import { selectCurrentUserIdAndNickname } from 'state/user-slice/selectors';
import { getVoteColor } from 'utils/color-getters';

interface VoteActionsProps {
  band_id: string;
  userVote?: VoteValue;
}

export const VoteActions = ({ band_id }: VoteActionsProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { spotify_id, nickname } = useSelector(selectCurrentUserIdAndNickname);
  const userVote = useSelector(selectUsersBandVote(band_id, spotify_id!));

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Stack direction='row' spacing={1}>
      <Button
        disableElevation
        sx={{ textTransform: 'capitalize' }}
        variant={userVote ? 'contained' : 'outlined'}
        color={userVote ? getVoteColor(userVote) : 'secondary'}
        onClick={openMenu}
        ref={menuButtonRef}
      >
        {userVote ? VOTES_MAP[userVote] : 'Select Your Vote'}
      </Button>
      <Menu
        open={isMenuOpen}
        onClose={closeMenu}
        anchorEl={menuButtonRef.current}
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
              closeMenu();
            }}
          >
            {key}: {value}
          </MenuItem>
        ))}
      </Menu>
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
