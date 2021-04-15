import React, { useState } from 'react';
import fire, { db } from '../../../firebase';

import { Link } from 'react-router-dom';
import '../Login.scss';

function Inscription(props) {
	/*State*/
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [firstPoids, setFirstPoids] = useState(null);
	const [error, setError] = useState('');
	const firstDay = '2021-04-13' //First Day Ramadan 2021  YYYY-MM-DD
	const data=
	{
		firstDay,
		firstPoids,
		firstConnect: true,
		email,
		id:"",
		jours: [
			{ jour: 1,  poids: null, valid: false, checked: false },
			{ jour: 2,  poids: null, valid: false, checked: false },
			{ jour: 3,  poids: null, valid: false, checked: false },
			{ jour: 4,  poids: null, valid: false, checked: false },
			{ jour: 5,  poids: null, valid: false, checked: false },
			{ jour: 6,  poids: null, valid: false, checked: false },
			{ jour: 7,  poids: null, valid: false, checked: false },
			{ jour: 8,  poids: null, valid: false, checked: false },
			{ jour: 9,  poids: null, valid: false, checked: false },
			{ jour: 10, poids: null, valid: false, checked: false },
			{ jour: 11, poids: null, valid: false, checked: false },
			{ jour: 12, poids: null, valid: false, checked: false },
			{ jour: 13, poids: null, valid: false, checked: false },
			{ jour: 14, poids: null, valid: false, checked: false },
			{ jour: 15, poids: null, valid: false, checked: false },
			{ jour: 16, poids: null, valid: false, checked: false },
			{ jour: 17, poids: null, valid: false, checked: false },
			{ jour: 18, poids: null, valid: false, checked: false },
			{ jour: 19, poids: null, valid: false, checked: false },
			{ jour: 20, poids: null, valid: false, checked: false },
			{ jour: 21, poids: null, valid: false, checked: false },
			{ jour: 22, poids: null, valid: false, checked: false },
			{ jour: 23, poids: null, valid: false, checked: false },
			{ jour: 24, poids: null, valid: false, checked: false },
			{ jour: 25, poids: null, valid: false, checked: false },
			{ jour: 26, poids: null, valid: false, checked: false },
			{ jour: 27, poids: null, valid: false, checked: false },
			{ jour: 28, poids: null, valid: false, checked: false },
			{ jour: 29, poids: null, valid: false, checked: false },
			{ jour: 30, poids: null, valid: false, checked: false },
		],
	}
	

	/***************Inscription***************/
	function submitHandler(e) {
		e.preventDefault();

		fire
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				db.collection("users").doc(newUser.user.uid).set({...data,id: newUser.user.uid})
				props.history.push('/calendar');
			})
			.catch((error) => setError(error.message));
	}

	return (
		<div className='logBox'>
			<h1>Inscription</h1>

			<form onSubmit={submitHandler} className='form'>
				{error !== '' && <div className='alert'>{error}</div>}
				<label>
					Email:
					<br />
					<input
						type='email'
						placeholder='Email'
						required
						autoComplete='username'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Votre Poids avant le Ramadan:
					<br />
					<input
						type='number'
						step="0.1"
						placeholder='Poids'
						onChange={(e) => setFirstPoids(e.target.value)}
					/>
				</label>
				<label>
					Mot de Passe: <br />
					<input
						type='password'
						placeholder='Mot de Passe'
						minLength='6'
						required
						autoComplete='new-password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					Confirmation: <br />
					<input
						type='password'
						placeholder='Confirmation'
						minLength='6'
						required
						autoComplete='new-password'
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</label>

				<button type='submit' disabled={!(password === password2 && password !== '')}>
					S'inscrire
				</button>
				<Link to='/connexion' className='deja'>
					Déja inscrit? Se connecter
				</Link>
			</form>
		</div>
	);
}

export default Inscription;
