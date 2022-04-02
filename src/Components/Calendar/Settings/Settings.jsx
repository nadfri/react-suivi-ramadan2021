import React, { useState } from "react";
import { db } from "../../../firebase";
import "./Settings.scss";

import wallpaperMin from "../../../wallpapers/wallpaper.min.webp";
import wallpaper1Min from "../../../wallpapers/wallpaper1.min.webp";
import wallpaper2Min from "../../../wallpapers/wallpaper2.min.webp";
import wallpaper3Min from "../../../wallpapers/wallpaper3.min.webp";
import wallpaper4Min from "../../../wallpapers/wallpaper4.min.webp";
import wallpaper5Min from "../../../wallpapers/wallpaper5.min.webp";
import wallpaper6Min from "../../../wallpapers/wallpaper6.min.webp";

function Settings(props) {
  //State
  const [firstDay, setFirstDay] = useState(props.firstDay);
  const [firstPoids, setFirstPoids] = useState(props.firstPoids);
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationSupp, setConfirmationSupp] = useState(false);
  const [radioWallpaper, setRadioWallpaper] = useState(props.wallpaper);

  const handleWallPaper = (event) => {
    setRadioWallpaper(event.target.value);
  };

  //Formulaire
  const submitHandler = (e) => {
    e.preventDefault();
    props.changeFirstDay(firstDay);
    props.changeFirstPoids(firstPoids);
    props.changeFirstConnect(false);
    props.changeDisplaySettings(false);
    props.setWallpaper(radioWallpaper);
    localStorage.setItem("wallpaper", radioWallpaper);

    db.collection("users")
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
    setFirstPoids("");
    props.changeFirstPoids("");
    setConfirmationSupp(false);
  };

  //Gestion de l'event Annuler
  const cancel = (e) => {
    e.stopPropagation();
    if (e.target.id === "settings" || e.target.id === "annuler")
      props.changeDisplaySettings(false);
  };

  /********************Rendu JSX********************/
  return (
    <div className="Settings" onClick={cancel} id="settings">
      <h1>Paramètres</h1>
      <form onSubmit={submitHandler} className="form">
        {confirmation && (
          <div className="alert">Données Effacées - Mettez les Infos à Jour</div>
        )}
        <label>
          Modifier le 1er jour du Ramadan:
          <br />
          <input
            type="date"
            value={firstDay}
            onChange={(e) => setFirstDay(e.target.value)}
            required
          />
        </label>
        <label>
          Votre Poids avant le début du Ramadan: <br />
          <input
            type="number"
            step="0.1"
            placeholder="Poids"
            value={firstPoids}
            onChange={(e) => setFirstPoids(e.target.value)}
          />
        </label>

        <label>Choisissez un fond d'écran</label>
        <div className="container-radio">
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper"
              checked={radioWallpaper === "wallpaper"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaperMin} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper1"
              checked={radioWallpaper === "wallpaper1"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper1Min} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper2"
              checked={radioWallpaper === "wallpaper2"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper2Min} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper3"
              checked={radioWallpaper === "wallpaper3"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper3Min} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper4"
              checked={radioWallpaper === "wallpaper4"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper4Min} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper5"
              checked={radioWallpaper === "wallpaper5"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper5Min} />
          </label>
          <label>
            <input
              type="radio"
              name="background"
              value="wallpaper6"
              checked={radioWallpaper === "wallpaper6"}
              onChange={handleWallPaper}
              required
            />
            <img alt="" src={wallpaper6Min} />
          </label>
        </div>

        <div className="buttons">
          <button type="submit">Confirmer</button>
          <button type="button" onClick={cancel} id="annuler">
            Annuler
          </button>
        </div>
        <button type="button" className="suppression" onClick={suppressionOnclick}>
          Supprimer Toutes les Données
        </button>
        {confirmationSupp ? (
          <button type="button" className="suppression def" onClick={suppressionDef}>
            Confirmer la Suppression
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Settings;
