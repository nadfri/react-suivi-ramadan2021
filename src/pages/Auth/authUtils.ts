import { FirebaseError } from 'firebase/app';

const authErrorMessages: Record<string, string> = {
  'auth/invalid-email': 'Adresse email invalide.',
  'auth/user-not-found': 'Aucun compte ne correspond à cet email.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-credential': 'Identifiants invalides.',
  'auth/email-already-in-use': 'Cet email est déjà utilisé.',
  'auth/weak-password': 'Mot de passe trop faible. Utilisez au moins 6 caractères.',
  'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
  'auth/network-request-failed': 'Connexion impossible. Vérifiez votre réseau.',
  'auth/popup-closed-by-user': 'La fenêtre Google a été fermée.',
  'auth/popup-blocked': 'Le navigateur a bloqué la fenêtre de connexion Google.',
};

export const getAuthErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? 'Une erreur est survenue. Réessayez.';
  }

  return 'Une erreur est survenue. Réessayez.';
};
