import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

type GuardProps = {
  children: ReactNode;
};

const LoadingPlaceholder = () => (
  <div className="flex h-svh items-center justify-center bg-slate-50">
    <div className="text-center space-y-2">
      <div className="size-10 mx-auto rounded-full border-2 border-emerald-200 border-t-emerald-700 animate-spin" />
      <p className="text-sm text-slate-600">Chargement...</p>
    </div>
  </div>
);

export function ProtectedRoute({ children }: GuardProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPlaceholder />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export function AuthRedirect({ children }: GuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPlaceholder />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
