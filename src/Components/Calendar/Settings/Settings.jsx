import './Settings.scss';
import React, { useState } from 'react';
import { db } from '../../../firebase';
import { USERS } from '../../../utils';
import { useTheme } from '../../../Context/Context';
import { themes } from '../../../themes/themes';

export default function Settings(props) {
  const { theme, setTheme } = useTheme();
  const [radioThemeID, setRadioThemeID] = useState(theme.id);

  const [firstDay, setFirstDay] = useState(props.firstDay);
  const [firstPoids, setFirstPoids] = useState(props.firstPoids);
  
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationSupp, setConfirmationSupp] = useState(false);

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
    <div className='Settings' onClick={cancel} id='settings'>
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
        <button type='button' className='suppression' onClick={suppressionOnclick}>
          Supprimer Toutes les Données
        </button>
        {confirmationSupp ? (
          <button type='button' className='suppression def' onClick={suppressionDef}>
            Confirmer la Suppression
          </button>
        ) : null}
      </form>
    </div>
  );
}
