import React from 'react';
import './Day.scss';

function Day(props) {

	const{poids,valid,checked,jour} = props.state;

	let classes;
	if(valid) classes = "succes";
	else if (!valid && checked )classes = "echec";

	return (
		<div className='Day'>
			<div className='date'>{props.date}</div>
			<div className='jour'>{jour}</div>
			<div className='poids-valid'>
				<span className="poids">{poids}Kgs</span>
				<span className={`valid ${classes}`}>{valid? "✔" : "✘"}</span>
			</div>
		</div>
	);
}

export default Day;
