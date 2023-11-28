import { useQuery } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const useGetUserMessagesQuery = ({ fromId, recipientId }, enabled) => {
  return useQuery({
    queryKey: ['userMessages', fromId, recipientId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}messages`, {
          params: {
            fromId,
            recipientId,
          },
        });

        return response.data;
      } catch (err) {
        throw parseAxiosError(err);
      }
    },
    enabled,
  });
};
