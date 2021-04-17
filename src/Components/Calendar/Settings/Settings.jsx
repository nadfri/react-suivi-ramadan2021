import React, { useState } from 'react';
import './Settings.scss';
import { db } from '../../../firebase';

function Settings(props) {
	const [firstDay, setFirstDay] = useState(props.firstDay);
	const [firstPoids, setFirstPoids] = useState(props.firstPoids);

	const submitHandler = (e) => {
		e.preventDefault();
		props.changeFirstDay(firstDay);
		props.changeFirstPoids(firstPoids);
        props.changeFirstConnect(false);
		props.changeDisplaySettings(false);

        db.collection('users').doc(props.user.uid).update({firstPoids,firstDay,firstConnect: false});
	};


	return (
		<div className='Settings'>
			<h1>Paramètres</h1>
			<form onSubmit={submitHandler} className='form'>
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
                    <button className="suppression" onClick={props.suppressionDB}>Supprimer toutes les données</button>
			</form>
		</div>
	);
}

export default Settings;
