import { createContext, useContext } from 'react';

import { useCookies } from 'react-cookie';
import { useGetUserQuery } from '../lib/queries/useGetUserQuery';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [cookies] = useCookies(['UserId']);
  const userId = cookies.UserId;

  {
    /* TODO: implement loading state everywhere where user data is used but it's not yet available cuz it's fetching */
  }
  const {
    data: user,
    error: userErrorMsg,
    isPending: isUserFetching,
  } = useGetUserQuery({ userId });

  return (
    <UserContext.Provider
      value={{ userId, user, userErrorMsg, isUserFetching }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
