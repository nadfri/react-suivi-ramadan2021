import React, { useState, useEffect } from 'react';
import './App.scss';
import Connexion from '../Components/Connexion/Connexion';
import { Route, Switch } from 'react-router-dom';
import Home from '../Components/Home/Home';
import fire from '../firebase';

function App() {
	//useState
	const [user, setUser] = useState(null);

	//DidMount
	useEffect(() => {
		authListener();
	}, []);

	const authListener = () => {
		fire.auth().onAuthStateChanged((user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	};

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Connexion} />
				<Route exact path='/home' component={Home} />
			</Switch>
		</div>
	);
}

export default App;
