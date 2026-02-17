import './Settings.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { USERS } from '../../../utils';
import { useTheme } from '../../../Context/Context';
import { themes } from '../../../themes/themes';

import { BsEnvelopeAtFill } from 'react-icons/bs';
import { FaLinkedin, FaGithub, FaHistory } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { FaMedal } from 'react-icons/fa';
import { BiSolidBookHeart } from 'react-icons/bi';

export default function Settings(props) {
  const { theme, setTheme } = useTheme();
  const [radioThemeID, setRadioThemeID] = useState(theme.id);

  const [firstDay, setFirstDay] = useState(props.firstDay);
  const [firstPoids, setFirstPoids] = useState(props.firstPoids);
  const [hasHistory, setHasHistory] = useState(false);
  const [detteTotale, setDetteTotale] = useState(0);

  const [confirmation, setConfirmation] = useState(false);
  const [confirmationSupp, setConfirmationSupp] = useState(false);

  // Vérifier si l'utilisateur a un historique et des dettes
  useEffect(() => {
    db.collection(USERS)
      .doc(props.user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetteTotale(doc.data().detteTotale || 0);
        }
      })
      .catch((err) => console.warn('Dette non récupérée:', err.message));

    db.collection(USERS)
      .doc(props.user.uid)
      .collection('history')
      .limit(1)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) setHasHistory(true);
      })
      .catch((err) => console.warn('Historique non accessible:', err.message));
  }, [props.user.uid]);

  const handleDecreaseDette = () => {
    if (detteTotale > 0) {
      const newDette = detteTotale - 1;
      setDetteTotale(newDette);
      db.collection(USERS).doc(props.user.uid).update({ detteTotale: newDette });
    }
  };

  const handleTheme = (event) => {
    setRadioThemeID(event.target.value);
  };

  //Formulaire
  const submitHandler = (e) => {
    e.preventDefault();
    props.changeFirstDay(firstDay);
    props.changeFirstPoids(firstPoids);
    props.changeFirstConnect(false);
    props.changeDisplaySettings(false);

    setTheme(themes.find((theme) => theme.id === radioThemeID));
    localStorage.setItem('themeID', radioThemeID);

    db.collection(USERS)
      .doc(props.user.uid)
      .update({ firstPoids, firstDay, firstConnect: false });
  };

  //Gestion de la suppression des données
  const suppressionOnclick = () => {
    setConfirmationSupp(true);
  };

  const suppressionDef = () => {
    props.suppressionDB();
    setConfirmation(true);
    setFirstPoids('');
    props.changeFirstPoids('');
    setConfirmationSupp(false);
  };

  //Gestion de l'event Annuler
  const cancel = (e) => {
    e.stopPropagation();
    if (e.target.id === 'settings' || e.target.id === 'annuler')
      props.changeDisplaySettings(false);
  };

  /********************Rendu JSX********************/
  return (
    <div className='Settings' onClick={cancel} id='settings' role='button' aria-pressed={props.displaySettings}>
      <h1>Paramètres</h1>
      <form onSubmit={submitHandler} className='form'>
        {confirmation && (
          <div className='alert'>Données Effacées - Mettez les Infos à Jour</div>
        )}
        <label>
          Modifier le 1er jour du Ramadan:
          <br />
          <input
            type='date'
            value={firstDay}
            onChange={(e) => setFirstDay(e.target.value)}
            required
          />
        </label>
        <label>
          Votre Poids avant le début du Ramadan: <br />
          <input
            type='number'
            step='0.1'
            placeholder='Poids'
            value={firstPoids}
            onChange={(e) => setFirstPoids(e.target.value)}
          />
        </label>

        <label>Choisissez un fond d'écran</label>
        <div className='container-radio'>
          {themes.map((theme) => (
            <label key={theme.id}>
              <input
                type='radio'
                name='radio-theme'
                value={theme.id}
                checked={radioThemeID === theme.id}
                onChange={handleTheme}
                required
              />
              <img alt='' src={theme.srcMin} />
            </label>
          ))}
        </div>

        <div className='buttons'>
          <button type='submit'>Confirmer</button>
          <button type='button' onClick={cancel} id='annuler'>
            Annuler
          </button>
        </div>

        <div className='history-section'>
          <Link
            to='/historic'
            className={`btn-history ${hasHistory ? 'has-data' : ''}`}
          >
            <FaHistory /> Historique
            {hasHistory && <span className='badge'>1</span>}
          </Link>
        </div>

        {detteTotale > 0 && (
          <div className='dette-section'>
            <p>Jours à rattraper : <strong>{detteTotale}</strong></p>
            <button type='button' onClick={handleDecreaseDette}>
              J'ai rattrapé un jour
            </button>
          </div>
        )}

        <button type='button' className='suppression' onClick={suppressionOnclick}>
          Supprimer Toutes les Données
        </button>
        {confirmationSupp ? (
          <button type='button' className='suppression def' onClick={suppressionDef}>
            Confirmer la Suppression
          </button>
        ) : null}

        <a
          href='https://quizzislam.netlify.app/'
          className='link'
          target='_blank'
          rel='noreferrer'>
          Tester vos connaissances avec ce Quizz <FaMedal className='icon' />
        </a>

        <p className='about'>
          Développé par{' '}
          <a href='mailto:nadfri@gmail.com'>
            NadfriJS
            <BsEnvelopeAtFill className='icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/nader-frigui-23509025/'
            target='_blank'
            rel='noreferrer'>
            <FaLinkedin className='icon' />
          </a>
          <a href='https://github.com/nadfri' target='_blank' rel='noreferrer'>
            <FaGithub className='icon' />
          </a>
          <a href='https://www.youtube.com/c/nadfrijs' target='_blank' rel='noreferrer'>
            <IoLogoYoutube className='icon' />
          </a>
        </p>

        <a
          href='https://masjidbox.com/donations/mosquee-de-savigny-le-temple/faites-un-don-pour-votre-mosquee'
          target='_blank'
          rel='noreferrer'
          className='link mt-0'>
          Participer à la construction d'un collège musulman{' '}
          <BiSolidBookHeart className='icon' />
        </a>
      </form>
    </div>
  );
}
