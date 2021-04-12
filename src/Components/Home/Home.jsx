import React from 'react';
import ToggleBtn from '../ToggleBtn/ToggleBtn';
import './Home.scss';


function Home(props) {
	return (
		<div className='Home'>
            <ToggleBtn checked={true}/>
			<h1>HOME</h1>
		</div>
	);
}

export default Home;
