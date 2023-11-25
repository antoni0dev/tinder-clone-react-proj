import { useQuery } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const useGetUserQuery = ({ userId }) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}user`, {
          params: { userId },
        });

        return response.data;
      } catch (err) {
        throw new Error(parseAxiosError(err));
      }
    },
  });
};
