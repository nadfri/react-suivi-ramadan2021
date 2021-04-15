import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import fire from '../../firebase';

function Home(props) {

	//if(fire.auth().currentUser) props.history.push('/calendar')

	return (
		<div className='Home'>
            <div className="buttons">
			<Link to ="/inscription">S'inscrire</Link> 
			<Link to ="/connexion">Se Connecter</Link> 
            </div>
		</div>
	);
}

export default Home;
