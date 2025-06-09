import { Festival, FestivalDetails, UserStatusValue } from './models';
import { deleteHandler, getHandler, postHandler } from './request-handler';

const getFestivals = async (): Promise<Festival[]> => {
  return getHandler('festivals/');
};

const getFestivalDetails = async (id: string): Promise<FestivalDetails> => {
  return getHandler(`festivals/${id}/`);
};

const followFestival = async (id: string, status: UserStatusValue) => {
  return postHandler(`festivals/${id}/follow/`, { user_status: status });
};

const unFollowFestival = async (id: string) => {
  deleteHandler(`festivals/${id}/follow/`);
};

export { getFestivals, getFestivalDetails, followFestival, unFollowFestival };
