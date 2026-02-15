import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Calendar from '../../pages/Calendar/Calendar';
import Historic from '../../pages/Historic/Historic';
import Statistics from '../../pages/Statistics/Statistics';
import Settings from '../../pages/Settings/Settings';
import NotFound from '../../pages/NotFound/NotFound';
import AuthLayout from '@pages/Auth/AuthLayout';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import ForgotPassword from '@pages/Auth/ForgotPassword';
import { AuthRedirect, ProtectedRoute } from './RouteGuards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
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
    path: '/auth',
    element: (
      <AuthRedirect>
        <AuthLayout />
      </AuthRedirect>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
