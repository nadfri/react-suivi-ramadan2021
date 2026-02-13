import { useNavigate } from 'react-router-dom';

type ErrorPageProps = {
  onReset?: () => void;
};

export default function Error({ onReset }: ErrorPageProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onReset) {
      onReset();
    }
    navigate('/');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 6v2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Oups! Une erreur s'est produite</h1>
        <p className="text-gray-600 text-lg mb-2">
          Nous sommes désolés, quelque chose s'est mal passé.
        </p>
        <p className="text-gray-500 text-base mb-8">
          Veuillez essayer de recharger la page ou retourner à l'accueil.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Retourner à l'accueil
          </button>
          <button
            onClick={handleReload}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
          >
            Recharger la page
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Si le problème persiste, veuillez contacter le support technique.
          </p>
        </div>
      </div>
    </div>
  );
}
