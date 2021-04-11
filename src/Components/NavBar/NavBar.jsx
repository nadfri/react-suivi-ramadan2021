import React, { useState } from 'react';
import './NavBar.scss';
import Switch from 'react-switch';

function Navbar(props) {
	const [checked, setChecked] = useState(false);
	const handleChange = nextChecked => {
		setChecked(nextChecked);
	};

	return (
		<nav className='NavBar'>
			<Switch
				onChange={handleChange}
				checked={checked}
				className='react-switch'
                boxShadow="0px 1px 5px rgba(255, 255, 255, 0.5)"
                offColor="#ff0000"

			/>
		</nav>
	);
}

export default Navbar;
