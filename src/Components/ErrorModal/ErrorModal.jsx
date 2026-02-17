import './ErrorModal.scss';
import { MdRefresh } from 'react-icons/md';

export default function ErrorModal() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className='ErrorModal'>
      <div className='container'>
        <p>Problème de connexion ou erreur de chargement.</p>
        <button onClick={handleReload} className='refresh-btn'>
          <MdRefresh size={20} /> Réessayer
        </button>
      </div>
    </div>
  );
}
