import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className='Home'>
			<div className='buttons'>
				<Link to='/inscription' className='btn-primary'>S'inscrire</Link>
				<Link to='/connexion' className='btn-primary'>Se Connecter</Link>
			</div>
		</div>
	);
}

export default Home;
