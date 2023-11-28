import { useQuery } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const useGetMatchesQuery = ({ matchedUserIds }) =>
  useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}users`, {
          params: {
            userIds: JSON.stringify(matchedUserIds),
          },
        });
        return response.data;
      } catch (err) {
        throw parseAxiosError(err);
      }
    },
  });
