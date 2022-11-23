import { config } from '../lib/config';

export const getImageUrl = (path: string) => {
  return `${config.STORAGE_URL}${path}`;
};
