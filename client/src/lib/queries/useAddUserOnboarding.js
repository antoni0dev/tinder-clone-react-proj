import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, PATHS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { parseAxiosError } from '../utils';

export const useAddUserOnboarding = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ formData }) => {
      try {
        await axios.put(`${BASE_URL}user`, { formData });
        navigate(PATHS.dashboard);
      } catch (err) {
        throw new Error(parseAxiosError(err));
      }
    },
  });
};
