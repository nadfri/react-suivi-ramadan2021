import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * ProtectedRoute: Route sécurisée qui redirige vers l'accueil si non connecté
 */
export default function ProtectedRoute({ user, component: Component, path, exact }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        // ✅ Si l'utilisateur est connecté, on affiche le composant
        if (user) {
          return <Component {...props} user={user} />;
        }

        // ✅ Sinon, on redirige vers l'accueil (connexion)
        return <Redirect to='/' />;
      }}
    />
  );
}
