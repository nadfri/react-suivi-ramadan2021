import React, { useState } from 'react';
import './Connexion.scss';
import fire from '../../firebase';
import ToggleBtn from '../ToggleBtn/ToggleBtn';

function Connexion(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [loginError, setLoginError] = useState(false);

	function submitHandler(e) {
		e.preventDefault();
	}

	/******************LOGIN******************/
	const login = () => {
		const user = {
			email,
			password,
		};

		fire
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((res) => props.history.push('/home'))
			.catch((error) => {
				console.log(error);
				switch (error.code) {
					case 'auth/invalide-email':
					case 'auth/user-disabled':
					case 'auth/user-not-found':
					case 'auth/wrong-password':
						setLoginError(true);
						break;
					default:
				}
			});
	};
	/***************Inscription***************/
	const register = () => {
		const user = {
			email,
			password,
		};

		fire
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((res) => props.history.push('/home'))
			.catch((error) => {
				console.log(error);
				switch (error.code) {
					case 'auth/email-already-in-use':
						setEmailError(true);
						break;
					default:
				}
			});
	};

	return (
		<div className='Connexion'>
			<ToggleBtn disabled={true} checked={false} />

			<form onSubmit={submitHandler} className='form'>
				{emailError && <div className='alert'>Adresse email déjà utilisée</div>}
				{loginError && <div className='alert'>Impossible de vous authentifier</div>}
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
						// required
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
						// disabled={!(password === password2 && password !== '')}
						onClick={register}>
						Inscription
					</button>
				</div>
			</form>
		</div>
	);
}

export default Connexion;
