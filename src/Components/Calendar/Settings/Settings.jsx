import React, { useState } from 'react';
import { db } from '../../../firebase';
import './Settings.scss';

function Settings(props) {
	//State
	const [firstDay, setFirstDay]                 = useState(props.firstDay);
	const [firstPoids, setFirstPoids]             = useState(props.firstPoids);
	const [confirmation, setConfirmation]         = useState(false);
	const [confirmationSupp, setConfirmationSupp] = useState(false);

	//Formulaire
	const submitHandler = (e) => {
		e.preventDefault();
		props.changeFirstDay(firstDay);
		props.changeFirstPoids(firstPoids);
        props.changeFirstConnect(false);
		props.changeDisplaySettings(false);

        db.collection('users').doc(props.user.uid).update({firstPoids,firstDay,firstConnect: false});
	};

	//Gestion de la suppression des données
	const suppressionOnclick = () =>{
		setConfirmationSupp(true);
	}

	const suppressionDef = () =>{
		props.suppressionDB();
		setConfirmation(true);
		setFirstPoids("");
		props.changeFirstPoids("");
		setConfirmationSupp(false);
	}

/********************Rendu JSX********************/
	return (
		<div className='Settings'>
			<h1>Paramètres</h1>
			<form onSubmit={submitHandler} className='form'>
			{confirmation && <div className='alert'>Données Effacées - Mettez les Infos à Jour</div>}
				<label>
					Modifier le 1er jour du Ramadan:
					<br />
					<input type='date' value={firstDay} onChange={(e) => setFirstDay(e.target.value)} />
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
				<div className='buttons'>
					<button type='submit'>Confirmer</button>
					<button type='button' onClick={() => props.changeDisplaySettings(false)}>
						Annuler
					</button>
				</div>
                    <button type="button" className="suppression" onClick={suppressionOnclick}>Supprimer Toutes les Données</button>
                    {confirmationSupp? <button type="button" className="suppression def" onClick={suppressionDef}>Confirmer la Suppression</button> : null}
			</form>
		</div>
	);
}

export default Settings;
