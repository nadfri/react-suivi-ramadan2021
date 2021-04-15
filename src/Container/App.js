//Librairies
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import fire from '../firebase';
//CSS
import './App.scss';
import wallpaper from './wall1.jpg';
//Composants
import Home from '../Components/Home/Home';
import Connexion from '../Components/Login/Connexion/Connexion';
import Inscription from '../Components/Login/Inscription/Inscription';

import Calendar from '../Components/Calendar/Calendar';
import Forget from '../Components/Login/Forget/Forget';
import ToggleBtn from '../Components/Login/ToggleBtn/ToggleBtn';

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
					<Route exact path='/'            render={ ()=> !user? <Home/> : <Redirect to="/calendar"/>} />
					<Route exact path='/connexion'   component={Connexion} />
					<Route exact path='/inscription' component={Inscription} />
					<Route exact path='/calendar'    component= {render => <Calendar user={user}/>} />
					<Route exact path='/forget'      component={Forget} />
					<Route component={Home} />

				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
