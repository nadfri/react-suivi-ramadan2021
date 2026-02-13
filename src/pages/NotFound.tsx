import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="text-9xl font-bold text-orange-200 mb-4">404</div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page non trouvée</h1>
        <p className="text-gray-600 text-lg mb-2">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <p className="text-gray-500 text-base mb-8">
          La page a peut-être été supprimée ou l'URL est incorrecte.
        </p>

        {/* Action Button */}
        <div className="flex flex-col gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-block"
          >
            Retourner à l'accueil
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            Si vous pensez que c'est une erreur, veuillez contacter le support.
          </p>
        </div>
      </div>
    </div>
  );
}
