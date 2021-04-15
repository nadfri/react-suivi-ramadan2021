import React, { useState } from 'react';
import './Settings.scss';

function Settings(props) {
	const [date, setDate] = useState(props.firstDay);
	const [poids, setPoids] = useState(props.firstPoids);

	const submitHandler = (e) => {
		e.preventDefault();
		props.changeFirstDay(date);
		props.changeFirstPoids(poids);
		props.changeDisplaySetting(false);
	};

	return (
		<div className='Settings'>
			<h1>Paramètres</h1>
			<form onSubmit={submitHandler} className='form'>
				<label>
					Modifier le 1er jour du Ramadan:
					<br />
					<input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
				</label>
				<label>
					Votre Poids avant le début du Ramadan: <br />
					<input
						type='number'
						step='0.1'
						placeholder='Poids'
						onChange={(e) => setPoids(e.target.value)}
					/>
				</label>
				<div className='buttons'>
					<button type='submit'>Confirmer</button>
					<button type='button' onClick={() => props.changeDisplaySetting(false)}>
						Annuler
					</button>
				</div>
			</form>
		</div>
	);
}

export default Settings;
