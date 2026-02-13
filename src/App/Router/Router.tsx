import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';

export default function Router() {
  return <RouterProvider router={router} />;
}
