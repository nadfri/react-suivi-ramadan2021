import { Link } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <div className='NotFound'>
      <div className='container'>
        <div className='content'>
          <h1>🔍 404</h1>
          <h2>Page non trouvée</h2>
          <p>
            Désolé, la page que vous recherchez n'existe pas ou vous n'avez pas les
            permissions nécessaires.
          </p>

          <Link to='/' className='btn-home'>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
