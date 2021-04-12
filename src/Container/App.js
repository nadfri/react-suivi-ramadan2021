//Librairies
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import fire from '../firebase';
//CSS
import './App.scss';
import wallpaper from './wall1.jpg';
//Composants
import Home from '../Components/Home/Home';
import Connexion from '../Components/Login/Connexion/Connexion';
import Inscription from '../Components/Login/Inscription/Inscription';
import ToggleBtn from '../Components/ToggleBtn/ToggleBtn';
import Calendar from '../Components/Calendar/Calendar';
import Forget from '../Components/Login/Forget/Forget';

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
		<div className='App' style={{ backgroundImage: `url(${wallpaper})` }}>
			<BrowserRouter>
				<ToggleBtn/>

				<Switch>
					<Route exact path='/'            component={Home} />
					<Route exact path='/connexion'   component={Connexion} />
					<Route exact path='/inscription' component={Inscription} />
					<Route exact path='/calendar'    component={Calendar} />
					<Route exact path='/forget'    component={Forget} />

				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
