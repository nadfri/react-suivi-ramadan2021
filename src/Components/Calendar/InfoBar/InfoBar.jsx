import React from 'react';
import { useState } from 'react';
import './InfoBar.scss';

function InfoBar() {
	const options = { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' };
	const islamic = new Intl.DateTimeFormat('fr-FR-u-ca-islamic', options).format(Date.now());
	const french  = new Intl.DateTimeFormat('fr-FR', options).format(Date.now());

	//State
	const [toggle, setToggle] = useState(true);

	return (
		<div className='InfoBar' onClick={() => setToggle(!toggle)}>
			<span className='date'>
				{toggle? islamic: french}
			</span>
		</div>
	);
}

export default InfoBar;
