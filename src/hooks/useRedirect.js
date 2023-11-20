import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  // TODO: implement checks for whether the user is authenticated or not

  return isLoading;
};
