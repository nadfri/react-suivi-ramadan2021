import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Calendar from '../../pages/Calendar/Calendar';
import Historic from '../../pages/Historic/Historic';
import Statistics from '../../pages/Statistics/Statistics';
import Settings from '../../pages/Settings/Settings';
import NotFound from '../../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Calendar />,
      },
      {
        path: 'graph',
        element: <Statistics />,
      },
      {
        path: 'history',
        element: <Historic />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
