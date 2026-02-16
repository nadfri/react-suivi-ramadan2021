import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { FIRST_DAY, USERS } from '../../utils';
import './Admin.scss';

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [usersCount, setUsersCount] = useState(0);

  // Charger le nombre de users au montage
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const snapshot = await db.collection(USERS).get();
        setUsersCount(snapshot.size);
      } catch (err) {
        console.error('Erreur lors de la récupération des users:', err);
      }
    };

    fetchUsersCount();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  /**Réinitialiser les données de tous les users*/
  const resetAllUsersData = async () => {
    if (window.confirm('⚠️ Êtes-vous sûr? Cette action est irréversible!')) {
      setLoading(true);
      try {
        const usersToReset = USERS;
        const usersSnapshot = await db.collection(usersToReset).get();

        usersSnapshot.forEach(async (userDoc) => {
          const user = userDoc.data();
          const copyState = { ...user };
          copyState.firstConnect = true;
          copyState.firstPoids = '';
          copyState.firstDay = FIRST_DAY;

          for (let jour of copyState.jours) {
            jour.poids = '';
            jour.valid = false;
            jour.checked = false;
          }

          await db.collection(usersToReset).doc(userDoc.id).set(copyState);
        });

        showMessage(`✅ Réinitialisation complète (${usersSnapshot.size} users)`);
      } catch (err) {
        showMessage(`❌ Erreur: ${err.message}`);
      }
      setLoading(false);
    }
  };

  /**Copier les users vers la DB test*/
  const copyUsersToUsersTest = async () => {
    if (window.confirm('⚠️ Copier les utilisateurs vers users-test?')) {
      setLoading(true);
      try {
        const count = await db
          .collection('users')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection('users-test').doc(doc.id).set(doc.data());
            });
            return querySnapshot.size;
          });

        showMessage(`✅ ${count} users copiés vers users-test`);
      } catch (err) {
        showMessage(`❌ Erreur: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className='Admin'>
      <div className='admin-container'>
        <h1>🔐 Panneau Admin</h1>

        <div className='message' style={{ display: message ? 'block' : 'none' }}>
          {message}
        </div>

        <div className='actions'>
          <div className='action-card'>
            <h2>📊 Gestion des données</h2>

            <button onClick={resetAllUsersData} disabled={loading} className='btn-danger'>
              {loading ? '⏳ En cours...' : '🔄 Réinitialiser tous les users'}
            </button>

            <button
              onClick={copyUsersToUsersTest}
              disabled={loading}
              className='btn-warning'>
              {loading ? '⏳ En cours...' : '📋 Copier users vers users-test'}
            </button>
          </div>

          <div className='action-card info'>
            <h3>ℹ️ À propos</h3>
            <ul>
              <li>
                <strong>Base active:</strong> {USERS}
              </li>
              <li>
                <strong>Utilisateurs:</strong> {usersCount}
              </li>
              <li>
                <strong>Premier jour:</strong> {FIRST_DAY}
              </li>
              <li>
                <strong>Version:</strong> 2.1
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
