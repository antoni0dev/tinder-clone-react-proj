import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './lib/constants';
import App from './App';
import { HomePage, DashboardPage, OnboardingUsersPage } from './pages';
import ErrorNotFoundPage from './components/ErrorNotFoundPage';

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
    errorElement: <ErrorNotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: PATHS.onboardingUsers,
        element: <OnboardingUsersPage />,
      },
    ],
  },
]);
