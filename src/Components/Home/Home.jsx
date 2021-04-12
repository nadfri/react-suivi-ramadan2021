import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';


function Home(props) {


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
