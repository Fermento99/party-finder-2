import { Festival, FestivalDetails, UserStatusValue } from './models';
import { getHandler, postHandler } from './request-handler';

const getFestivals = async (): Promise<Festival[]> => {
  return getHandler('festivals/');
};

const getFestivalDetails = async (id: string): Promise<FestivalDetails> => {
  return getHandler(`festivals/${id}/`);
};

const followFestival = async (id: string, status: UserStatusValue) => {
  return postHandler(`festivals/${id}/follow`, { user_status: status });
};

export { getFestivals, getFestivalDetails, followFestival };
