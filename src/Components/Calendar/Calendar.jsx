//Librairies
import { db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import { FIRST_DAY, USERS } from '../../utils';
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

console.log('DB:', USERS);

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
      let countValid = 0;
      let countNotValid = 0;
      state.jours.forEach((jour) => {
        if (jour.valid) countValid++;
        else if (!jour.Valid && jour.checked) countNotValid++;
      });

      setJeuner(countValid);
      setManquer(countNotValid);

      /*Mise à jour du Poids*/
      if (state.firstPoids) {
        const tabKgs = state.jours.filter((jour) => jour.poids);
        if (tabKgs.length < 1) setPertePoids(0);
        else {
          let total = (-(state.firstPoids - tabKgs[tabKgs.length - 1].poids)).toFixed(1);
          total = total > 0 ? `+${total}` : total;
          setPertePoids(total);
        }
      }
    }
  }, [state]);

  /*Mise en place du calendrier*/
  function calendrier(state) {
    return state.jours.map((day, index) => {
      let firstDay = new Date(state.firstDay);
      let date = new Date();
      date.setTime(firstDay.getTime() + index * 1000 * 3600 * 24); //better than setDate
      date = new Intl.DateTimeFormat('fr-FR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).format(date);

      return (
        <Day
          key={index}
          date={date}
          state={day}
          firstPoids={state.firstPoids}
          index={index}
          changeDayPoids={changeDayPoids}
          checkValidDay={checkValidDay}
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

  /*Suppression des datas de tous les users*/
  const resetAllUsersData = async () => {
    //Precisier quels users sont concernés
    const usersToDelete = "users-test"; 
    const usersSnapshot = await db.collection(usersToDelete).get();

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

      await db.collection(usersToDelete).doc(userDoc.id).set(copyState);
    });

    console.log('Reset All Users Data', usersToDelete);
  };

  const copyUsersToUsersTest = async () => {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Copiez chaque document dans la collection 'users-test'
          db.collection('users-test').doc(doc.id).set(doc.data());
        });
      });

    console.log('Copy Users to DB TEST');
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

      {/*Reset all users data*/}
      {/* <button onClick={resetAllUsersData}>Reset All Users Data</button> 
      <button onClick={copyUsersToUsersTest}>Copy Users to DB TEST</button> */}

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
          {calendrier(state)}{' '}
          <Total jeuner={jeuner} manquer={manquer} pertePoids={pertePoids} />
        </div>
      )}
    </div>
  );
}
