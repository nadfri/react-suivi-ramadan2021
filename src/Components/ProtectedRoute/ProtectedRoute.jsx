import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { db } from '../../firebase';
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/Loader';

/**
 * ProtectedRoute: Route sécurisée vérifiée via Firestore
 * @param {Object} props - Props
 * @param {Object} props.user - Utilisateur connecté
 * @param {React.Component} props.component - Composant à afficher
 * @param {string} props.path - Chemin de la route
 * @param {boolean} props.exact - Route exacte
 */
export default function ProtectedRoute({ user, component: Component, path, exact }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // ✅ Pas connecté : rediriger vers l'accueil
      setIsAdmin(false);
      setLoading(false);
    } else {
      // ✅ Vérifier le rôle admin dans Firestore
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          setIsAdmin(doc.exists && doc.data()?.role === 'admin');
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur vérification admin:', error);
          setIsAdmin(false);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        // ✅ Pendant la vérification, afficher un loader
        if (loading) {
          return <Loader />;
        }

        // ✅ Si l'utilisateur n'est pas connecté, rediriger vers l'accueil (connexion)
        if (!user) {
          return <Redirect to='/' />;
        }

        // ✅ Si l'utilisateur est connecté mais n'est pas admin, afficher 404
        if (!isAdmin) {
          return <NotFound />;
        }

        // ✅ Sinon, afficher le composant Admin
        return <Component user={user} />;
      }}
    />
  );
}
