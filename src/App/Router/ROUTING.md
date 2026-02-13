# React Router Setup

## Overview

This project uses **React Router DOM v7.13.0** for client-side routing with BrowserRouter.

## File Structure

```
src/
├── main.tsx                    # App entry, imports Router
├── router/
│   ├── router.tsx              # Router component (default export)
│   └── routes.tsx              # Route configuration
├── pages/
│   ├── Home.tsx                # Homepage
│   ├── Layout.tsx              # Main layout wrapper
│   └── NotFound.tsx            # 404 page
└── App.tsx                     # Root app layout with Outlet
```

## How It Works

### Entry Point (main.tsx)

```tsx
import Router from './router/router.tsx';

createRoot(rootElement).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
```

### Router Setup (router/router.tsx)

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';

export default function Router() {
  return <RouterProvider router={router} />;
}
```

### Route Configuration (router/routes.tsx)

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
```

### Root Layout (App.tsx)

```tsx
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <PWABadge />
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

## Adding New Routes

### 1. Create a New Page

```tsx
// src/pages/Dashboard.tsx
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

### 2. Add Route to routes.tsx

```tsx
{
  path: '/dashboard',
  element: <Dashboard />,
}
```

### 3. Link to the Route

```tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </>
  );
}
```

## Common Hooks

### useNavigate

```tsx
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

### useParams

```tsx
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { userId } = useParams();
  return <h1>User {userId}</h1>;
}

// Add route: { path: '/user/:userId', element: <UserPage /> }
```

### useLocation

```tsx
import { useLocation } from 'react-router-dom';

export default function MyPage() {
  const location = useLocation();
  return <p>Current path: {location.pathname}</p>;
}
```

## Nested Routes Example

```tsx
// src/pages/Dashboard.tsx
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

// In routes.tsx
{
  path: '/dashboard',
  element: <Dashboard />,
  children: [
    {
      path: 'stats',
      element: <Stats />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
  ],
}
```

Access via:
- `/dashboard/stats`
- `/dashboard/settings`

## Protected Routes (with Auth)

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
}

// In routes.tsx
{
  path: '/protected',
  element: (
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  ),
}
```

## Lazy Loading Routes (Code Splitting)

```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard.tsx'));

// In routes.tsx
{
  path: '/dashboard',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  ),
}
```

## Current Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Homepage |
| `*` | NotFound | 404 page |

## Documentation

- [React Router Docs](https://reactrouter.com)
- [Router API](https://reactrouter.com/en/main/start/overview)
- [Hooks](https://reactrouter.com/en/main/hooks/use-navigate)
