import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../config/firebase';
import { useAuth } from '@context/AuthContext';
import { getAuthErrorMessage } from './authUtils';

export default function Login() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = loading || isSubmitting;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Bon retour</h1>
        <p className="text-sm text-slate-500">Connectez-vous pour reprendre votre suivi.</p>
      </div>

      <form className="space-y-3" onSubmit={handleEmailLogin}>
        <label className="block text-sm font-semibold text-slate-700">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="exemple@email.com"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Mot de passe
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Votre mot de passe"
          />
        </label>

        <Link
          to="/auth/forgot"
          className="text-sm text-slate-600 hover:text-slate-800 transition-colors inline-block"
        >
          Mot de passe oublié ?
        </Link>

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isBusy ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        ou
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isBusy}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="flex w-full items-center justify-center gap-2">
          <FcGoogle className="text-lg" aria-hidden="true" />
          Continuer avec Google
        </span>
      </button>

      <p className="text-center text-sm text-slate-600">
        Pas encore de compte ?{' '}
        <Link
          to="/auth/register"
          className="text-sm text-slate-600 hover:text-slate-800 transition-colors font-semibold"
        >
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
