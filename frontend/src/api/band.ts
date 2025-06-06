import { Band, VoteValue } from './models';
import { getHandler, postHandler } from './request-handler';

const getBandDetails = async (id: string): Promise<Band> => {
  return getHandler(`bands/${id}/`);
};

const voteOnBand = async (id: string, vote: VoteValue) => {
  return postHandler(`bands/${id}/vote/`, { vote });
};

export { getBandDetails, voteOnBand };
