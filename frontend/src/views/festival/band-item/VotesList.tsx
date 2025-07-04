import { AvatarGroup, Stack } from '@mui/material';
import { Vote } from 'api/models';
import { DefaultBadge } from 'components/default-badge';
import { UserAvatar } from 'components/user-avatar';
import { useSelector } from 'react-redux';
import { selectRelevantUserIds } from 'state/festival-details/selectors';
import { selectBandFilterUserVotes } from 'state/sort-slice/selectors';
import { getVoteColor } from 'utils/color-getters';
import { filterRelevantVotes, sortVotes } from 'utils/sorting';

interface VotersListProps {
  votes: Vote[];
}

export const VotesList = ({ votes }: VotersListProps) => {
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
