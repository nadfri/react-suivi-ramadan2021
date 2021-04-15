import React from 'react';
import './Total.scss';

function Total(props) {
	return (
		<div className='Total'>
			<div className='line'>
				Jours Jeunés:
				<span>
					<span className='green'>1</span>/30
				</span>
			</div>
			<div className='line'>
				Jours Manqués:
				<span className='red'>2</span>
			</div>
			<div className='line'>
				Evolution Poids:
				<span>
					<span className='green'>-2.1</span>Kgs
				</span>
			</div>
		</div>
	);
}

export default Total;
