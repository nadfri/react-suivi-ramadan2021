import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { getAuthErrorMessage } from './authUtils';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Mot de passe oublié</h1>
        <p className="text-sm text-slate-500">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
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

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {sent && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Email envoyé. Pensez à vérifier vos spams.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        <Link
          to="/auth/login"
          className="text-sm text-slate-600 hover:text-slate-800 transition-colors font-semibold"
        >
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
