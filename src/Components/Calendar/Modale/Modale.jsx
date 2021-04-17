import React, {useState} from 'react';
import './Modale.scss';

function Modale(props) {

    /*State*/
    const [selected, setSelected] = useState("oui");
    const [poids, setPoids] = useState(props.firstPoids);


	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className='Modale'>
			<h1>Le {props.jour} Ramadan</h1>
			<form onSubmit={submitHandler} className='form'>
				<div className='titre'> Avez vous jeuner ce jour: ({props.date})</div>
				<div className='buttons-radio'>
					<div className='button-radio green'>
						<input type='radio' id='oui' name='check' value='oui' checked={selected === 'oui'} onChange={(e)=>setSelected(e.target.value)}/>
						<label htmlFor='oui'>Oui</label>
					</div>
					<div className='button-radio red'>
						<input type='radio' id='non' name='check' value='non' checked={selected === 'non'} onChange={(e)=>setSelected(e.target.value)}/>
						<label htmlFor='non'>Non</label>
					</div>
				</div>

				<div className='titre'>Votre Poids aujourd'hui:</div>
				<input
					type='number'
					step='0.1'
					placeholder='Poids'
					value={poids}
					onChange={(e) => setPoids(e.target.value)}
				/>

				<div className='buttons'>
					<button type='submit'>Confirmer</button>
					<button type='button' onClick={() => props.changeDisplayModale(false)}>
						Annuler
					</button>
				</div>
			</form>
		</div>
	);
}

export default Modale;
