import React from 'react';
import './Home.scss';
import Navbar from '../NavBar/NavBar';

function Home(props) {
	return (
		<div className='Home'>
			<Navbar />
			<h1>HOME</h1>
		</div>
	);
}

export default Home;
