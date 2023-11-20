import { Outlet } from 'react-router-dom';
import AuthWrapper from './wrappers/AuthWrapper';

const App = () => {
  return (
    <AuthWrapper>
      <main>
        <Outlet />
      </main>
    </AuthWrapper>
  );
};

export default App;
