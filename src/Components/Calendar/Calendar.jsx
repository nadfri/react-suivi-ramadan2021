import fire from '../../firebase';

function Calendar(props) {

	const currentUser = fire.auth().currentUser;
	if (!currentUser) props.history.push('/');

    

	return <div>CALENDAR</div>;
}

export default Calendar;
