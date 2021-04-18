import React, { useState } from 'react';
import './Day.scss';

function Day(props) {
	const { poids, valid, checked, jour } = props.state;

	//State
	const [modalDisplay, setModalDisplay] = useState(false);
	const [selected, setSelected]         = useState('oui');
	const [poidsUpdate, setPoidsUpdate]   = useState(props.firstPoids);

	//Gestion des classes CSS
	let classesBack, classesIcons;
	if (valid) {
		classesBack = 'backSuccess';
		classesIcons = 'success';
	} else if (!valid && checked) {
		classesIcons = 'echec';
		classesBack = 'backEchec';
	} else {
		classesIcons = '';
		classesBack = '';
	}

	//Soumission Formulaire
	const submitHandler = (e) => {
		e.preventDefault();
		setModalDisplay(false);
		props.changeDayPoids(props.index, poidsUpdate);
		if (selected === 'oui') props.checkValidDay(props.index, true);
		else props.checkValidDay(props.index, false);
	};

	//Gestion de la modale
	const openModal = (e) => {
		e.stopPropagation();
		setModalDisplay(true);
	};
	const cancelClick = (e) => {
		e.stopPropagation();
		if(e.target.id === "modaleAnnuler" || e.target.id === "modale")
		setModalDisplay(false);
	};


	/********************Rendu JSX********************/
	return (
		<div className={`Day ${classesBack}`} onClick={openModal}>
			<div className='date'>{props.date}</div>
			<div className='jour'>{jour}</div>
			<div className='poids-valid'>
				<span className='poids'>{poids}Kgs</span>
				<span className={`valid ${classesIcons}`}>{valid ? '✔' : '✘'}</span>
			</div>

			{/***********************MODALE******************/}
			{modalDisplay && (
				<div className='Modale' onClick={cancelClick} id="modale">
					<h1>Le {jour} Ramadan</h1>
					<form onSubmit={submitHandler} className='form'>
						<div className='titre'> Avez vous jeuner ce jour: ({props.date})</div>
						<div className='buttons-radio'>
							<div className='button-radio green'>
								<input
									type='radio'
									id='oui'
									name='check'
									value='oui'
									checked={selected === 'oui'}
									onChange={(e) => setSelected(e.target.value)}
								/>
								<label htmlFor='oui'>Oui</label>
							</div>
							<div className='button-radio red'>
								<input
									type='radio'
									id='non'
									name='check'
									value='non'
									checked={selected === 'non'}
									onChange={(e) => setSelected(e.target.value)}
								/>
								<label htmlFor='non'>Non</label>
							</div>
						</div>

						<div className='formPoids'>
							<label className='titre'>Votre Poids aujourd'hui:</label>
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
							<button type='button' onClick={cancelClick} id="modaleAnnuler">
								Annuler
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default Day;
