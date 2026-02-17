import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../../firebase';
import { USERS } from '../../../utils';
import './History.scss';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';

export default function History({ user }) {
  const [historyList, setHistoryList] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const snapshot = await db
          .collection(USERS)
          .doc(user.uid)
          .collection('history')
          .orderBy('firstDay', 'desc')
          .get();

        const historyData = snapshot.docs.map((doc) => ({
          year: doc.id,
          ...doc.data(),
        }));
        setHistoryList(historyData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de l'historique:", err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user.uid]);

  const calculateStats = (jours) => {
    // 1. Jeuné : Validé par l'utilisateur
    const countValid = jours.filter((j) => j.valid).length;
    // 2. Manqué : Coché expressément comme non jeuné
    const countMissed = jours.filter((j) => j.checked && !j.valid).length;
    // 3. Non renseigné : Jour jamais touché
    const countNotFilled = jours.filter((j) => !j.checked && !j.valid).length;

    return { countValid, countMissed, countNotFilled };
  };

  const calculatePoidsDelta = (jours, firstPoids) => {
    const joursAvecPoids = jours.filter((j) => j.poids);
    if (joursAvecPoids.length === 0) return 0;
    const dernierPoids = joursAvecPoids[joursAvecPoids.length - 1].poids;
    const initial = firstPoids || joursAvecPoids[0].poids;
    const delta = (dernierPoids - initial).toFixed(1);
    return delta > 0 ? `+${delta}` : delta;
  };

  return (
    <div className='History'>
      <div className='history-container'>
        <button className='back-btn' onClick={() => history.push('/calendar')}>
          <IoArrowBackOutline size={25} /> <span>Retour</span>
        </button>

        <h1>🕰️ Historique de vos Ramadans</h1>

        {loading ? (
          <div className='loader-history'>Chargement...</div>
        ) : historyList.length === 0 ? (
          <p className='no-history'>Vous n'avez pas encore d'historique archivé.</p>
        ) : (
          <div className='history-list'>
            {historyList.map((item) => {
              const stats = calculateStats(item.jours);
              const poids = calculatePoidsDelta(item.jours, item.firstPoids);

              return (
                <div
                  key={item.year}
                  className={`history-card ${selectedHistory === item.year ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedHistory(selectedHistory === item.year ? null : item.year)
                  }>
                  <div className='card-header'>
                    <FaCalendarAlt /> <span>Ramadan {item.year}</span>
                  </div>
                  <div className='card-summary'>
                    <div className='stat'>
                      Jeuné: <span>{stats.countValid} j</span>
                    </div>
                    <div className='stat'>
                      Manqué: <span>{stats.countMissed} j</span>
                    </div>
                    <div className='stat'>
                      Oubli: <span>{stats.countNotFilled} j</span>
                    </div>
                    <div className='stat'>
                      Poids: <span>{poids} kg</span>
                    </div>
                  </div>

                  {selectedHistory === item.year && (
                    <div className='card-details'>
                      <p>
                        <strong>1er jour:</strong>{' '}
                        {new Date(item.firstDay).toLocaleDateString('fr-FR')}
                      </p>
                      <p>
                        <strong>Poids initial:</strong>{' '}
                        {item.firstPoids || 'Non renseigné'} kg
                      </p>
                      <div className='days-grid'>
                        {item.jours.map((j, i) => (
                          <div
                            key={i}
                            className={`day-mini ${j.valid ? 'valid' : j.checked ? 'missed' : ''}`}>
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
