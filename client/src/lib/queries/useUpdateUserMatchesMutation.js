import { useMutation } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const useUpdateUserMatches = () =>
  useMutation({
    mutationFn: async ({ userId, matchedUserId }) => {
      try {
        await axios.put(`${BASE_URL}addMatch`, { userId, matchedUserId });
      } catch (err) {
        throw new Error(parseAxiosError(err));
      }
    },
  });
