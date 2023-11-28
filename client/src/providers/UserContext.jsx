import { createContext, useContext, useMemo } from 'react';

import { useCookies } from 'react-cookie';
import { useGetUserQuery } from '../lib/queries/useGetUserQuery';
import Loader from '../components/Loader';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [cookies] = useCookies(['UserId']);
  const userId = cookies.UserId !== 'undefined' ? cookies.UserId : undefined;

  const {
    data: user = {},
    error: userErrorMsg,
    isFetching: isUserFetching,
  } = useGetUserQuery({ userId });

  const matchedUserIds = useMemo(
    () => user.matches?.map(({ user_id }) => user_id),
    [user]
  );

  return (
    <UserContext.Provider
      value={{
        /* If there's userId in cookies or if the user is logged in and their info is successfully retrieved - the user is authenticated */
        isAuthenticated: Boolean(userId),
        user,
        userErrorMsg,
        isUserFetching,
        matchedUserIds,
      }}
    >
      {isUserFetching ? <Loader /> : children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
