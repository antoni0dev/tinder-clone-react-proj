import { Outlet } from 'react-router-dom';
import AuthWrapper from './wrappers/AuthWrapper';
import { styled } from 'styled-components';
import UserContextProvider from './providers/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <AuthWrapper>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </AuthWrapper>
    </UserContextProvider>
  );
};

const Wrapper = styled.main`
  height: 100%;
`;

export default App;
