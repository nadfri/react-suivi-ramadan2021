import React, { useState } from 'react';
import './Connexion.scss';
import fire from '../../firebase';

function Connexion(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	function submitHandler(e) {
		e.preventDefault();
	}

	const login = () => {
		const user = {
			email,
			password,
		};
	};

	const register = () => {
		const user = {
			email,
			password,
		};

		fire
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then(props.history.push("/home"))
			.catch((error) => {
				//Adresse mail deja existante
				console.log('error :>> ', error);
			});
	};

	return (
		<div className='Connexion'>
			<h1>Connexion</h1>
			<form onSubmit={submitHandler} className='form'>
				<label>
					Email: <br />
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

				<div className='buttons'>
					<button type='submit' onClick={login}>
						Connexion
					</button>
					<button
						type='submit'
						disabled={!(password === password2 && password !== '')}
						onClick={register}>
						Inscription
					</button>
				</div>
			</form>
		</div>
	);
}

export default Connexion;
