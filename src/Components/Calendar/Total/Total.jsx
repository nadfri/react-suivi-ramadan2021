import React from 'react';
import './Total.scss';

function Total(props) {
	return (
		<div className='Total'>
			<div className='line'>
				Jours Jeunés:
				<span>
					<span className='green'>{props.jeuner}</span>/30
				</span>
			</div>
			<div className='line'>
				Jours Manqués:
				<span className='red'>{props.manquer}</span>
			</div>
			<div className='line'>
				Evolution Poids:
				<span>
					<span className={props.pertePoids <= 0 ? 'green' : 'red'}>
						{props.pertePoids}
					</span>{' '}
					Kgs
				</span>
			</div>
		</div>
	);
}

export default Total;
