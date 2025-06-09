import { Band, VoteValue } from './models';
import { deleteHandler, getHandler, postHandler } from './request-handler';

const getBandDetails = async (id: string): Promise<Band> => {
  return getHandler(`bands/${id}/`);
};

const voteOnBand = async (id: string, vote: VoteValue) => {
  return postHandler(`bands/${id}/vote/`, { vote });
};

const unvoteOnBand = async (id: string) => {
  return deleteHandler(`bands/${id}/vote/`);
};

export { getBandDetails, voteOnBand, unvoteOnBand };
