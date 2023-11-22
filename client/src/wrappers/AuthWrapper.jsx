import Loader from '../components/Loader';
import { useRedirect } from '../hooks/useRedirect';

const AuthWrapper = ({ children }) => {
  const isLoading = useRedirect();

  return isLoading ? <Loader /> : children;
};

export default AuthWrapper;
