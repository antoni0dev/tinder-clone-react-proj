import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './src/lib/constants';
import App from './src/App';
import { HomePage, DashboardPage, OnboardingUsersPage } from './src/pages';

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
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
