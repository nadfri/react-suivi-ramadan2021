//Librairies
import { db } from '../../firebase';
import { useState, useEffect } from 'react';
import { USERS } from '../../utils';
//CSS
import './Calendar.scss';
import settingIco from './Settings/settings.svg';
//Components
import Day from './Day/Day';
import InfoBar from './InfoBar/InfoBar';
import Loader from '../Loader/Loader';
import Total from './Total/Total';
import ErrorModal from '../ErrorModal/ErrorModal';
import Settings from './Settings/Settings';

export default function Calendar({ user }) {
  /*State*/
  const [displaySettings, setDisplaySettings] = useState(false);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState(null);
  const [jeuner, setJeuner] = useState(0);
  const [manquer, setManquer] = useState(0);
  const [pertePoids, setPertePoids] = useState(0);
  const [error, setError] = useState(false);

  /*Gestion du Settings*/
  const changeFirstPoids = (value) =>
    setState((prev) => ({ ...prev, firstPoids: value }));

  const changeFirstDay = (value) => setState((prev) => ({ ...prev, firstDay: value }));

  const changeFirstConnect = (value) =>
    setState((prev) => ({ ...prev, firstConnect: value }));

  const changeDisplaySettings = (value) => setDisplaySettings(value);

  /*Chargement des données*/
  useEffect(() => {
    setLoader(true);
    db.collection(USERS)
      .doc(user.uid)
      .get()
      .then((doc) => {
        setState(doc.data());
        setLoader(false);
        if (doc.data().firstConnect) setDisplaySettings(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setError(true);
      });

    //WillUnmount
    return () => console.log('CleanUp');
  }, [user]);

  /*Mise à jour des Totaux*/
  useEffect(() => {
    if (state) {
      // Calcul des jours de jeûne et manqués
      let countValid = 0;
      let countNotValid = 0;

      state.jours.forEach((jour) => {
        if (jour.valid) {
          countValid++;
        } else if (!jour.valid && jour.checked) {
          countNotValid++;
        }
      });

      setJeuner(countValid);
      setManquer(countNotValid);

      // Calcul de la variation de poids
      const joursAvecPoids = state.jours.filter((jour) => jour.poids);

      if (joursAvecPoids.length === 0) {
        // Si aucun jour avec poids enregistré
        setPertePoids(0);
      } else {
        // Récupérer le dernier poids enregistré
        const dernierPoids = joursAvecPoids[joursAvecPoids.length - 1].poids;

        // Utiliser firstPoids s'il est défini, sinon utiliser le premier poids disponible
        const poidsInitial = state.firstPoids || joursAvecPoids[0].poids;

        // Calculer la différence (négatif = perte, positif = gain)
        const difference = (dernierPoids - poidsInitial).toFixed(1);

        // Ajouter un "+" devant les valeurs positives pour plus de clarté
        const formattedDifference = difference > 0 ? `+${difference}` : difference;
        setPertePoids(formattedDifference);
      }
    }
  }, [state]);

  /*Mise en place du calendrier*/
  function calendrier(state) {
    // Préparer un tableau des jours avec leur poids pour une utilisation facile
    const joursAvecPoids = state.jours
      .map((jour, idx) => ({ ...jour, idx }))
      .filter((jour) => jour.poids);

    return state.jours.map((day, index) => {
      // Date formatting
      let firstDay = new Date(state.firstDay);
      let date = new Date();
      date.setTime(firstDay.getTime() + index * 1000 * 3600 * 24);
      const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).format(date);

      // Trouver le dernier poids enregistré avant ce jour
      const dernierPoidsConnu =
        joursAvecPoids.filter((jour) => jour.idx < index).pop()?.poids || '';

      return (
        <Day
          key={index}
          data={{
            ...day,
            date: formattedDate,
            index,
            firstPoids: state.firstPoids,
            dernierPoidsConnu,
            changeDayPoids,
            checkValidDay,
          }}
        />
      );
    });
  }

  /*Fonction Mise à jour via Day/Modale */
  const changeDayPoids = (index, value) => {
    const copyState = { ...state };
    copyState.jours[index].poids = value;
    setState(copyState);
    db.collection(USERS).doc(user.uid).update(copyState);
  };

  const checkValidDay = (index, valid, check) => {
    const copyState = { ...state };
    copyState.jours[index].valid = valid;
    copyState.jours[index].checked = check;
    setState(copyState);
    db.collection(USERS).doc(user.uid).update(copyState);
  };

  /*Suppression De la Base de Données*/
  const suppressionDB = () => {
    const copyState = { ...state };
    copyState.firstConnect = true;
    copyState.firstPoids = '';

    for (let jour of copyState.jours) {
      jour.poids = '';
      jour.valid = false;
      jour.checked = false;
    }

    db.collection(USERS).doc(user.uid).set(copyState);
    setState(copyState);
    setDisplaySettings(true);
  };

  /********************Rendu JSX********************/
  return (
    <div className='Calendar'>
      {loader && <Loader />}

      {error && <ErrorModal />}

      <img
        src={settingIco}
        className='settingIco'
        alt='parameters'
        onClick={() => changeDisplaySettings(true)}
        role='button'
        aria-pressed={displaySettings}
      />

      {displaySettings && (
        <Settings
          firstDay={state.firstDay}
          firstPoids={state.firstPoids}
          changeFirstDay={changeFirstDay}
          changeFirstPoids={changeFirstPoids}
          changeDisplaySettings={changeDisplaySettings}
          changeFirstConnect={changeFirstConnect}
          suppressionDB={suppressionDB}
          user={user}
        />
      )}

      <InfoBar />

      {state && (
        <div className='grid'>
          {calendrier(state)}
          <Total jeuner={jeuner} manquer={manquer} pertePoids={pertePoids} />
        </div>
      )}
    </div>
  );
}
