import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { FIRST_DAY, USERS } from '../../utils';
import Loader from '../Loader/Loader';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import './Admin.scss';
import { MdArrowBackIos } from 'react-icons/md';

export default function Admin({ user }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [usersCount, setUsersCount] = useState(0);
  const history = useHistory();

  // État pour le ConfirmModal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: () => {},
  });

  const closeModal = () => setModalConfig((prev) => ({ ...prev, isOpen: false }));

  // Vérification du rôle admin au montage
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    db.collection(USERS)
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data()?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Rediriger vers 404 si pas admin
          history.push('/404');
        }
      })
      .catch((err) => {
        console.error('Erreur vérification admin:', err);
        setIsAdmin(false);
        history.push('/404');
      });
  }, [user, history]);

  // Charger le nombre de users quand on est admin
  useEffect(() => {
    if (isAdmin) {
      const fetchUsersCount = async () => {
        try {
          const snapshot = await db.collection(USERS).get();
          setUsersCount(snapshot.size);
        } catch (err) {
          console.error('Erreur lors de la récupération des users:', err);
        }
      };
      fetchUsersCount();
    }
  }, [isAdmin]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  /**Archiver uniquement les données de tous les users (SANS RESET)*/
  const executeArchiveAllUsersOnly = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await db.collection(USERS).get();

      const promises = usersSnapshot.docs.map(async (userDoc) => {
        const userData = userDoc.data();
        const year = userData.firstDay ? userData.firstDay.split('-')[0] : 'Inconnu';

        if (userData.jours && userData.jours.some((j) => j.checked || j.poids)) {
          const joursManques = userData.jours.filter((j) => !j.valid).length;

          return db
            .collection(USERS)
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
        return null;
      });

      await Promise.all(promises);
      showMessage(`✅ Archivage seul terminé (${usersSnapshot.size} users)`);
    } catch (err) {
      showMessage(`❌ Erreur: ${err.message}`);
    }
    setLoading(false);
  };

  const archiveAllUsersOnly = () => {
    setModalConfig({
      isOpen: true,
      title: 'Confirmation Archivage',
      message:
        "⚠️ Archiver les données actuelles dans l'historique de tous les utilisateurs (sans réinitialiser)?",
      type: 'primary',
      onConfirm: () => {
        closeModal();
        executeArchiveAllUsersOnly();
      },
    });
  };

  /**Archiver et Réinitialiser les données de tous les users*/
  const executeArchiveAndResetAllUsersData = async () => {
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
  };

  const archiveAndResetAllUsersData = () => {
    setModalConfig({
      isOpen: true,
      title: 'Archivage & Reset',
      message:
        "⚠️ Archiver les données actuelles dans l'historique et réinitialiser tous les utilisateurs?",
      type: 'success',
      onConfirm: () => {
        closeModal();
        executeArchiveAndResetAllUsersData();
      },
    });
  };

  /**Réinitialiser les données de tous les users (SANS ARCHIVAGE)*/
  const executeResetAllUsersData = async () => {
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
  };

  const resetAllUsersData = () => {
    setModalConfig({
      isOpen: true,
      title: 'Attention : Suppression locale',
      message: '⚠️ Êtes-vous sûr? Cette action efface TOUT sans archiver!',
      type: 'danger',
      onConfirm: () => {
        closeModal();
        executeResetAllUsersData();
      },
    });
  };

  /**Copier les users vers la DB test*/
  const executeCopyUsersToUsersTest = async () => {
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
  };

  const copyUsersToUsersTest = () => {
    setModalConfig({
      isOpen: true,
      title: 'Copie vers Test',
      message: '⚠️ Copier les utilisateurs vers users-test?',
      type: 'warning',
      onConfirm: () => {
        closeModal();
        executeCopyUsersToUsersTest();
      },
    });
  };

  if (isAdmin === null) {
    return <Loader />;
  }

  if (isAdmin === false) {
    return null; // Déjà géré par history.push('/404')
  }

  return (
    <div className='Admin'>
      <h1>Panneau Admin</h1>
      <Link to='/' className='back-btn'>
        <MdArrowBackIos /> Accueil
      </Link>
      <div className='message' style={{ display: message ? 'block' : 'none' }}>
        {message}
      </div>
      <div className='actions'>
        <div className='action-card'>
          <h2>📊 Gestion des données</h2>

          <button
            onClick={archiveAllUsersOnly}
            disabled={loading}
            className='btn-primary'>
            {loading ? '⏳ En cours...' : '📚 Archiver'}
          </button>

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
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={closeModal}
      />{' '}
    </div>
  );
}
