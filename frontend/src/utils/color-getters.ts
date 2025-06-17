import { UserStatusValue, VoteValue } from 'api/models';

export const getVoteColor = (vote: VoteValue) => {
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

export const getStatusColor = (status: UserStatusValue) => {
  switch (status) {
    case 'C':
      return 'warning';
    case 'G':
      return 'success';
  }
};
