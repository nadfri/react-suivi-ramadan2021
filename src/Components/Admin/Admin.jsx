import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  /**Archiver et Réinitialiser les données de tous les users*/
  const archiveAndResetAllUsersData = async () => {
    if (
      window.confirm(
        "⚠️ Archiver les données actuelles dans l'historique et réinitialiser tous les utilisateurs?",
      )
    ) {
      setLoading(true);
      try {
        const usersToReset = USERS;
        const usersSnapshot = await db.collection(usersToReset).get();

        // Utilisation de Promise.all pour paralléliser un peu les écritures
        const promises = usersSnapshot.docs.map(async (userDoc) => {
          const userData = userDoc.data();
          const year = userData.firstDay ? userData.firstDay.split('-')[0] : 'Inconnu';

          // 1. Archiver dans la sous-collection "history"
          let joursManques = 0;
          if (userData.jours && userData.jours.some((j) => j.checked || j.poids)) {
            // ✅ La dette = Tous les jours qui ne sont pas validés (confirmés jeûnés)
            // Cela inclut les jours marqués "non jeûnés" ET les jours oubliés/vides
            joursManques = userData.jours.filter((j) => !j.valid).length;

            await db
              .collection(usersToReset)
              .doc(userDoc.id)
              .collection('history')
              .doc(year)
              .set({
                firstDay: userData.firstDay,
                firstPoids: userData.firstPoids,
                jours: userData.jours,
                archivedAt: new Date().toISOString(),
                detteAnnee: joursManques,
              });
          }

          // 2. Préparer le reset
          const resetState = { ...userData };
          resetState.firstConnect = true;
          resetState.firstPoids = '';
          resetState.firstDay = FIRST_DAY;
          // ✅ Cumuler la dette
          resetState.detteTotale = (userData.detteTotale || 0) + joursManques;

          if (resetState.jours) {
            for (let jour of resetState.jours) {
              jour.poids = '';
              jour.valid = false;
              jour.checked = false;
            }
          }

          // 3. Sauvegarder le reset
          return db.collection(usersToReset).doc(userDoc.id).set(resetState);
        });

        await Promise.all(promises);

        showMessage(
          `✅ Archivage et Réinitialisation terminés (${usersSnapshot.size} users)`,
        );
      } catch (err) {
        showMessage(`❌ Erreur: ${err.message}`);
      }
      setLoading(false);
    }
  };

  /**Réinitialiser les données de tous les users (SANS ARCHIVAGE)*/
  const resetAllUsersData = async () => {
    if (window.confirm('⚠️ Êtes-vous sûr? Cette action efface TOUT sans archiver!')) {
      setLoading(true);
      try {
        const usersToReset = USERS;
        const usersSnapshot = await db.collection(usersToReset).get();

        const promises = usersSnapshot.docs.map(async (userDoc) => {
          const user = userDoc.data();
          const copyState = { ...user };
          copyState.firstConnect = true;
          copyState.firstPoids = '';
          copyState.firstDay = FIRST_DAY;

          if (copyState.jours) {
            for (let jour of copyState.jours) {
              jour.poids = '';
              jour.valid = false;
              jour.checked = false;
            }
          }

          return db.collection(usersToReset).doc(userDoc.id).set(copyState);
        });

        await Promise.all(promises);

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
        const querySnapshot = await db.collection('users').get();
        const promises = querySnapshot.docs.map((doc) =>
          db.collection('users-test').doc(doc.id).set(doc.data()),
        );
        await Promise.all(promises);
        showMessage(`✅ ${querySnapshot.size} utilisateurs copiés vers users-test`);
      } catch (err) {
        showMessage(`❌ Erreur: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className='Admin'>
      <div className='admin-container'>
        <Link to='/' className='back-btn'>
          🏠 Accueil
        </Link>
        <h1>🔐 Panneau Admin</h1>

        <div className='message' style={{ display: message ? 'block' : 'none' }}>
          {message}
        </div>

        <div className='actions'>
          <div className='action-card'>
            <h2>📊 Gestion des données</h2>

            <button
              onClick={archiveAndResetAllUsersData}
              disabled={loading}
              className='btn-success'>
              {loading ? '⏳ En cours...' : '📁 Archiver & Réinitialiser'}
            </button>

            <button onClick={resetAllUsersData} disabled={loading} className='btn-danger'>
              {loading ? '⏳ En cours...' : '🔄 Reset SANS archiver'}
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
