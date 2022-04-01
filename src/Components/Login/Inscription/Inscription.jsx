import React, { useState } from 'react';
import fire, { db } from '../../../firebase';

import { Link } from 'react-router-dom';
import '../Login.scss';

function Inscription(props) {
	/*State*/
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [firstPoids, setFirstPoids] = useState('');
	const [error, setError] = useState('');
	const firstDay = '2022-04-02' //First Day Ramadan 2022  YYYY-MM-DD
	const data=
	{
		firstDay,
		firstPoids,
		firstConnect: true,
		email,
		id:"",
		jours: [
			{ jour: 1,  poids: "", valid: false, checked: false },
			{ jour: 2,  poids: "", valid: false, checked: false },
			{ jour: 3,  poids: "", valid: false, checked: false },
			{ jour: 4,  poids: "", valid: false, checked: false },
			{ jour: 5,  poids: "", valid: false, checked: false },
			{ jour: 6,  poids: "", valid: false, checked: false },
			{ jour: 7,  poids: "", valid: false, checked: false },
			{ jour: 8,  poids: "", valid: false, checked: false },
			{ jour: 9,  poids: "", valid: false, checked: false },
			{ jour: 10, poids: "", valid: false, checked: false },
			{ jour: 11, poids: "", valid: false, checked: false },
			{ jour: 12, poids: "", valid: false, checked: false },
			{ jour: 13, poids: "", valid: false, checked: false },
			{ jour: 14, poids: "", valid: false, checked: false },
			{ jour: 15, poids: "", valid: false, checked: false },
			{ jour: 16, poids: "", valid: false, checked: false },
			{ jour: 17, poids: "", valid: false, checked: false },
			{ jour: 18, poids: "", valid: false, checked: false },
			{ jour: 19, poids: "", valid: false, checked: false },
			{ jour: 20, poids: "", valid: false, checked: false },
			{ jour: 21, poids: "", valid: false, checked: false },
			{ jour: 22, poids: "", valid: false, checked: false },
			{ jour: 23, poids: "", valid: false, checked: false },
			{ jour: 24, poids: "", valid: false, checked: false },
			{ jour: 25, poids: "", valid: false, checked: false },
			{ jour: 26, poids: "", valid: false, checked: false },
			{ jour: 27, poids: "", valid: false, checked: false },
			{ jour: 28, poids: "", valid: false, checked: false },
			{ jour: 29, poids: "", valid: false, checked: false },
			{ jour: 30, poids: "", valid: false, checked: false },
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
				localStorage.setItem('user', JSON.stringify(newUser.user));
				props.history.push('/calendar');
			})
			.catch((error) => setError(error.message));
	}


/********************Rendu JSX********************/
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
