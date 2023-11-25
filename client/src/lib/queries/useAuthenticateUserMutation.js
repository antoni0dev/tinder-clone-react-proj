import { useMutation } from '@tanstack/react-query';
import { parseAxiosError } from '../utils';
import axios from 'axios';
import { BASE_URL, FORM_TYPES } from '../constants';

export const useAuthenticateUserMutation = () => {
  return useMutation({
    mutationFn: async ({ authType = '', data }) => {
      try {
        const response = await axios.post(
          `${BASE_URL}${authType === FORM_TYPES.REGISTER ? 'signup' : 'login'}`,
          data
        );

        return response.data;
      } catch (err) {
        throw new Error(parseAxiosError(err));
      }
    },
    onSuccess: ({ token, userId }) => ({ token, userId }),
    onError: (error) => parseAxiosError(error),
  });
};
