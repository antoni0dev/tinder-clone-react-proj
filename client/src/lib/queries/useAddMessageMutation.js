import { useMutation } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const useAddMessageMutation = () =>
  useMutation({
    mutationKey: ['addMessage'],
    mutationFn: async ({ message }) => {
      try {
        const response = await axios.post(`${BASE_URL}message`, {
          message,
        });

        return response.data;
      } catch (err) {
        throw parseAxiosError(err);
      }
    },
  });
