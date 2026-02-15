import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../config/firebase';
import { useAuth } from '@context/AuthContext';
import { getAuthErrorMessage } from './authUtils';

export default function Register() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
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
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Créer votre compte</h1>
        <p className="text-sm text-slate-500">Démarrez votre suivi Ramadan en quelques secondes.</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <label className="block text-sm font-semibold text-slate-700">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="exemple@email.com"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Mot de passe
          <input
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Au moins 6 caractères"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Confirmer le mot de passe
          <input
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Retapez votre mot de passe"
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 transition-all hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isBusy ? 'Création en cours...' : 'Créer mon compte'}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        ou
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={isBusy}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-200 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <FcGoogle className="text-lg" aria-hidden="true" />
          Continuer avec Google
        </span>
      </button>

      <p className="text-center text-sm text-slate-600">
        Déjà un compte ?{' '}
        <Link to="/auth/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
