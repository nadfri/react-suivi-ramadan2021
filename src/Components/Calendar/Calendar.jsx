import fire, { db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import InfoBar from './InfoBar/InfoBar';
import './Calendar.scss';
import Day from './Day/Day';
import Total from './Total/Total';
import Settings from '../Settings/Settings';
import params from './params.png';
import Loader from '../Loader/Loader';

function Calendar(props) {
	const user = props.user;
	//if (!user) props.history.push('/');

	const [firstDay, setfirstDay] = useState('2021-04-13'); //YYYY-MM-DD
	const [firstPoids, setFirstPoids] = useState(null);
	const [displaySetting, setDisplaySetting] = useState(false);
	const [loader, setLoader] = useState(true);
	const [state, setState] = useState(null);

	/*Gestion du Settings*/
	const changeFirstPoids = (value) => setFirstPoids(value);
	const changeFirstDay = (value) => setfirstDay(value);
	const changeDisplaySetting = (value) => setDisplaySetting(value);

	/*Chargement des données*/
	useEffect(() => {
		if (user) {
			db.collection('users')
				.doc(user.uid)
				.get()
				.then((doc) => {
					changeDisplaySetting(false);
					setState(doc.data());
					setLoader(false);
				})
				.catch((err) => console.log(err));
		}

		return () => console.log('CleanUp');
	}, []);

	/*Mise en place du calendrier*/
	function calendrier(state) {
		return state.jours.map((day, index) => {
			let firstDay = new Date(state.firstDay);
			let date = new Date();
			date.setDate(firstDay.getDate() + index);
			date = new Intl.DateTimeFormat('fr-FR').format(date);

			return <Day key={index} date={date} state={day} />;
		});
	}

	/*Rendu JSX*/
	return (
		<div className='Calendar'>
			{loader && <Loader />}
			<img
				src={params}
				className='params'
				alt='parameters'
				onClick={() => changeDisplaySetting(true)}
			/>
			{displaySetting ? (
				<Settings
					firstDay={firstDay}
					firstPoids={firstPoids}
					changeFirstDay={changeFirstDay}
					changeFirstPoids={changeFirstPoids}
					changeDisplaySetting={changeDisplaySetting}
				/>
			) : null}
			<InfoBar />
			{state && (
				<div className='grid'>
					{calendrier(state)} <Total />
				</div>
			)}
		</div>
	);
}

export default Calendar;
