import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { parseAxiosError } from '../utils';

export const useGetGenderedUsersQuery = ({ gender, enabled }) => {
  return useQuery({
    queryKey: ['genderedUsers', gender],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}gendered-users`, {
          params: { gender },
        });
        return response.data;
      } catch (err) {
        throw new Error(parseAxiosError(err));
      }
    },
    enabled: enabled,
  });
};
