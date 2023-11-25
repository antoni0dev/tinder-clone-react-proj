import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../providers/UserContext';
import { PATHS, PUBLIC_PATHS } from '../lib/constants';

export const useRedirect = () => {
  const { userId } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if authenticated trying to access public path
    if (userId && PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.dashboard, { replace: true });
      return;
    }

    // if unauthenticated trying to access private path
    if (!userId && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.home, { replace: true });
      return;
    }

    setIsLoading(false);
  }, [location, navigate, userId]);

  return isLoading;
};
