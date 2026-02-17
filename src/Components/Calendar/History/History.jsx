import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../../firebase';
import { USERS } from '../../../utils';
import './History.scss';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function History({ user }) {
  const [historyList, setHistoryList] = useState([]);
  const [openYears, setOpenYears] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const modalRef = useRef(null);
  const cardRefs = useRef({});

  // State pour la modale d'édition
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingYear, setEditingYear] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('oui');
  const [poidsUpdate, setPoidsUpdate] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingJour, setEditingJour] = useState('');

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

        // Fermer tous les calendriers par défaut
        const initialOpenState = {};
        historyData.forEach((item) => {
          initialOpenState[item.year] = false;
        });
        setOpenYears(initialOpenState);

        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de l'historique:", err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user.uid]);

  useEffect(() => {
    if (editModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editModalOpen]);

  const toggleYear = (year) => {
    setOpenYears((prev) => {
      const newState = {
        ...prev,
        [year]: !prev[year],
      };

      // Si on ouvre l'année, faire scroller vers elle
      if (newState[year] && cardRefs.current[year]) {
        setTimeout(() => {
          cardRefs.current[year].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }

      return newState;
    });
  };

  const calculateStats = (jours) => {
    const countValid = jours.filter((j) => j.valid).length;
    const countMissed = jours.filter((j) => j.checked && !j.valid).length;
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

  // Ouverture de la modale d'édition
  const openEditModal = (yearItem, index) => {
    const day = yearItem.jours[index];
    setEditingYear(yearItem.year);
    setEditingIndex(index);
    setEditingJour(day.jour);

    // Calcul de la date
    const firstDayDate = new Date(yearItem.firstDay);
    const date = new Date();
    date.setTime(firstDayDate.getTime() + index * 1000 * 3600 * 24);
    setEditingDate(
      new Intl.DateTimeFormat('fr-FR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).format(date),
    );

    // Options radio
    if (day.valid) setSelectedOption('oui');
    else if (!day.valid && day.checked) setSelectedOption('non');
    else setSelectedOption('reset');

    // Poids (priorité comme dans Day.jsx)
    const joursAvecPoidsAnterieurs = yearItem.jours
      .slice(0, index)
      .filter((j) => j.poids);
    const dernierPoidsConnu =
      joursAvecPoidsAnterieurs.length > 0
        ? joursAvecPoidsAnterieurs[joursAvecPoidsAnterieurs.length - 1].poids
        : yearItem.firstPoids || '';

    setPoidsUpdate(day.poids || dernierPoidsConnu);
    setEditModalOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const updatedList = [...historyList];
    const yearIdx = updatedList.findIndex((h) => h.year === editingYear);
    if (yearIdx === -1) return;

    const day = updatedList[yearIdx].jours[editingIndex];
    if (selectedOption === 'oui') {
      day.valid = true;
      day.checked = true;
      day.poids = poidsUpdate;
    } else if (selectedOption === 'non') {
      day.valid = false;
      day.checked = true;
      day.poids = poidsUpdate;
    } else {
      day.valid = false;
      day.checked = false;
      day.poids = '';
    }

    setHistoryList(updatedList);
    setEditModalOpen(false);

    try {
      await db
        .collection(USERS)
        .doc(user.uid)
        .collection('history')
        .doc(editingYear)
        .update({
          jours: updatedList[yearIdx].jours,
        });
    } catch (err) {
      console.error('Erreur Firestore History Edit:', err);
    }
  };

  const cancelEdit = (e) => {
    if (e.target.id === 'modale' || e.target.id === 'modaleAnnuler') {
      setEditModalOpen(false);
    }
  };

  return (
    <div className='History'>
      <div className='history-container'>
        <button className='back-btn' onClick={() => history.push('/calendar')}>
          <IoArrowBackOutline size={25} /> <span>Retour</span>
        </button>

        <h1>Historique Ramadans</h1>

        {loading ? (
          <div className='loader-history'>Chargement...</div>
        ) : historyList.length === 0 ? (
          <p className='no-history'>Vous n'avez pas encore d'historique archivé.</p>
        ) : (
          <div className='history-list-minimal'>
            {historyList.map((item) => {
              const stats = calculateStats(item.jours);
              const poidsDelta = calculatePoidsDelta(item.jours, item.firstPoids);
              const isOpen = openYears[item.year];

              return (
                <div
                  key={item.year}
                  ref={(el) => (cardRefs.current[item.year] = el)}
                  className={`history-card-minimal ${isOpen ? 'active' : ''}`}>
                  <div
                    className='card-header-minimal'
                    onClick={() => toggleYear(item.year)}>
                    <div className='title'>
                      <FaCalendarAlt /> <span>Ramadan {item.year}</span>
                    </div>
                    <div className='header-badge'>
                      <span className='badge-text'>{stats.countValid}/30</span>
                    </div>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {isOpen && (
                    <div className='card-content-minimal'>
                      <div className='card-info-section'>
                        <div className='info-group'>
                          <p className='info-label'>Jeûnés</p>
                          <p className='info-value valid-count'>{stats.countValid}/30</p>
                        </div>
                        <div className='info-group'>
                          <p className='info-label'>Manqués</p>
                          <p className='info-value missed-count'>{stats.countMissed}</p>
                        </div>
                        <div className='info-group'>
                          <p className='info-label'>Non déclarés</p>
                          <p className='info-value neutral-count'>
                            {stats.countNotFilled}
                          </p>
                        </div>
                      </div>
                      <div className='card-weight-section'>
                        <div className='weight-group'>
                          <p className='info-label'>Poids initial :</p>
                          <p className='info-value'>{item.firstPoids || 'N/A'} kg</p>
                        </div>
                        <div className='weight-group'>
                          <p className='info-label'>Evolution :</p>
                          <p className='info-value weight-delta'>{poidsDelta} kg</p>
                        </div>
                      </div>
                      <div className='days-grid-minimal'>
                        {item.jours.map((j, i) => (
                          <div
                            key={i}
                            className={`day-mini-history ${j.valid ? 'valid' : j.checked ? 'missed' : ''}`}
                            onClick={() => openEditModal(item, i)}>
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

      {editModalOpen && (
        <div
          ref={modalRef}
          className='Modale Modale-History'
          onClick={cancelEdit}
          id='modale'>
          <h1>Le {editingJour} Ramadan</h1>
          <form onSubmit={submitEdit} className='form'>
            <div className='titre'>Avez-vous jeûné ce jour : ({editingDate})</div>
            <div className='buttons-radio'>
              <div className='button-radio green'>
                <input
                  type='radio'
                  id='oui'
                  value='oui'
                  checked={selectedOption === 'oui'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label htmlFor='oui'>Oui</label>
              </div>
              <div className='button-radio gray'>
                <input
                  type='radio'
                  id='reset'
                  value='reset'
                  checked={selectedOption === 'reset'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label htmlFor='reset'>Reset</label>
              </div>
              <div className='button-radio red'>
                <input
                  type='radio'
                  id='non'
                  value='non'
                  checked={selectedOption === 'non'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label htmlFor='non'>Non</label>
              </div>
            </div>

            <div className='formPoids'>
              <label className='titre'>Votre Poids ce jour-là :</label>
              <div className='input'>
                <input
                  type='number'
                  step='0.1'
                  placeholder='Poids'
                  value={poidsUpdate}
                  onChange={(e) => setPoidsUpdate(e.target.value)}
                />
                <span className='kgs'>Kgs</span>
              </div>
            </div>

            <div className='buttons'>
              <button type='submit'>Confirmer</button>
              <button type='button' onClick={cancelEdit} id='modaleAnnuler'>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
