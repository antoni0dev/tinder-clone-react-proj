import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { parseAxiosError } from '../utils';

export const useGetGenderedUsersQuery = ({ gender }) => {
  const { data, error, isPending } = useQuery({
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
  });

  return {
    genderedUsers: data,
    genderedUsersErrorMsg: error,
    isGenderedUsersPending: isPending,
  };
};
