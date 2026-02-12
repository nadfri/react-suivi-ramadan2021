import React, { useState, useEffect } from 'react';
import './PwaButton.scss';

function PwaButton() {
	//State
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState(null);

	useEffect(() => {
		const handler = (event) => {
			event.preventDefault();
			console.log('PWA:Installation Possible...');
			setTimeout(() => {
				setSupportsPWA(true);
				setPromptInstall(event);
			}, 500);

			setTimeout(() => setSupportsPWA(false), 7000);
		};

		window.addEventListener('beforeinstallprompt', handler);

		return () => window.removeEventListener('beforeinstallprompt', handler);
	}, []);

	const click = () => promptInstall.prompt();

	return (
		<button className={supportsPWA ? 'PwaButton slide' : 'PwaButton'} onClick={click}>
			Cliquez ici pour Installer l'App 👍
		</button>
	);
}

export default PwaButton;
