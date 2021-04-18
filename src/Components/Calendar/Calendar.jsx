import { db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import './Calendar.scss';
import settingIco from './Settings/settings.png';
import InfoBar from './InfoBar/InfoBar';
import Day from './Day/Day';
import Total from './Total/Total';
import Settings from './Settings/Settings';
import Loader from '../Loader/Loader';

function Calendar(props) {
	const user = props.user 
	//|| JSON.parse(localStorage.getItem('user'));
	
	/*State*/
	const [displaySettings, setDisplaySettings] = useState(false);
	const [loader, setLoader] = useState(false);
	const [state, setState] = useState(null);
	const [jeuner, setJeuner] = useState(0);
	const [manquer, setManquer] = useState(0);
	const [pertePoids, setPertePoids] = useState(0)

	/*Gestion du Settings*/
	const changeFirstPoids = (value) => setState((prev) => ({ ...prev, firstPoids: value }));
	const changeFirstDay = (value) => setState((prev) => ({ ...prev, firstDay: value }));
	const changeFirstConnect = (value) => setState((prev) => ({ ...prev, firstConnect: value }));
	const changeDisplaySettings = (value) => setDisplaySettings(value);

	/*Suppression DB*/
	const suppressionDB = () => {
		console.log('Suppression');
		setDisplaySettings(false);
	};

	/*Chargement des données*/
	useEffect(() => {
		setLoader(true);
		db.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				setState(doc.data());
				setLoader(false);
				if (doc.data().firstConnect) setDisplaySettings(true);
			})
			.catch((err) => console.log(err));
		return () => {console.log('CleanUp');};
	}, []);

	useEffect(()=> {
		state && updateTotal();
	},[state])

	/*Mise en place du calendrier*/
	function calendrier(state) {
		return state.jours.map((day, index) => {
			let firstDay = new Date(state.firstDay);
			let date = new Date();
			date.setDate(firstDay.getDate() + index);
			date = new Intl.DateTimeFormat('fr-FR').format(date);

			return <Day 
			key={index} 
			date={date} 
			state={day} 
			firstPoids={state.firstPoids}
			index={index}
			changeDayPoids={changeDayPoids}
			checkValidDay={checkValidDay}
			/>;
		});
	}


	/*Fonction Mise à jour via Day/Modale */
	const changeDayPoids = (index, value) => {
		const copyState = {...state};
		copyState.jours[index].poids = value;
		setState(copyState);
		db.collection('users').doc(props.user.uid).update(copyState);
	}

	const checkValidDay = (index, valid) =>{
		const copyState = {...state};
		copyState.jours[index].valid = valid;
		copyState.jours[index].checked = true;
		setState(copyState);
		db.collection('users').doc(props.user.uid).update(copyState);
	}

	/*Mise à jour des Totaux*/
	const updateTotal = () => {
		let countValid = 0;
		let countNotValid = 0;
		state.jours.forEach(jour=> {
			if(jour.valid) countValid++;
 			if(!jour.Valid && jour.checked) countNotValid++
		});

		const tabKgs = state.jours.filter(jour=>jour.poids);
		if(tabKgs.length < 1 ) setPertePoids(0);
		else {
			let total = (-(state.firstPoids - tabKgs[tabKgs.length-1].poids)).toFixed(1);
			total = total>0? `+${total}` : total;
			setPertePoids(total);
		}

		setJeuner(countValid);
		setManquer(countNotValid);
	}



	/*Rendu JSX*/
	return (
		<div className='Calendar'>
			{loader && <Loader />}
			<img
				src={settingIco}
				className='settingIco'
				alt='parameters'
				onClick={() => changeDisplaySettings(true)}
			/>

			{displaySettings ? (
				<Settings
					firstDay={state.firstDay}
					firstPoids={state.firstPoids}
					changeFirstDay={changeFirstDay}
					changeFirstPoids={changeFirstPoids}
					changeDisplaySettings={changeDisplaySettings}
					changeFirstConnect={changeFirstConnect}
					suppressionDB={suppressionDB}
					user={user}
				/>
			) : null}
			<InfoBar />
			{state && (
				<div className='grid'>
					{calendrier(state)} <Total jeuner={jeuner} manquer={manquer} pertePoids={pertePoids}/>
				</div>
			)}
		</div>
	);
}

export default Calendar;
