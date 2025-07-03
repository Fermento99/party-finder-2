import { format } from 'd3-format';

export const formatFolowersNumber = (count: number) =>
  count < 100 ? count.toString() : format('.3s')(count);
