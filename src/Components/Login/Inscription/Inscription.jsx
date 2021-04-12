import React, { useState } from 'react';
import fire, { db } from '../../../firebase';

import { Link } from 'react-router-dom';
import '../Login.scss';

function Inscription(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [error, setError] = useState('');

	/***************Inscription***************/
	
	function submitHandler(e) {
		e.preventDefault();

		fire
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				db.doc(`users/${newUser.user.uid}`).set({ email });
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
