import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '@context/AuthContext';

export default function Settings() {
  const { user, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-600">Gérez votre compte et vos préférences.</p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Compte</h2>

        {loading ? (
          <p className="text-sm text-slate-500">Chargement du compte...</p>
        ) : user ? (
          <>
            <p className="text-sm text-slate-600">
              Vous êtes connecté via l&apos;email{' '}
              <span className="font-semibold text-slate-800">{user.email ?? 'inconnu'}</span>.
            </p>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningOut ? 'Déconnexion en cours...' : 'Se déconnecter'}
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Vous n&apos;êtes pas connecté.</p>
            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-800"
            >
              Se connecter
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
