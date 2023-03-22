import { useState } from 'react';
import moment from 'moment-hijri';
import './InfoBar.scss';

const getIslamicDate = () => {
  const islamicDate = moment().format('iYYYY/iM/iD');
  const islamicDateParts = islamicDate.split('/');
  const islamicYear = islamicDateParts[0];
  const islamicMonth = mapIslamicMonth(islamicDateParts[1]);
  const islamicDay = islamicDateParts[2];
  return `${islamicDay} ${islamicMonth} ${islamicYear}`;
};

const mapIslamicMonth = (monthNum) => {
  switch (monthNum) {
    case '1':
      return 'Muharram';
    case '2':
      return 'Safar';
    case '3':
      return 'Rabi Al-Awwal';
    case '4':
      return 'Rabi Al-Thani';
    case '5':
      return 'Jumada Al-Awwal';
    case '6':
      return 'Jumada Al-Thani';
    case '7':
      return 'Rajab';
    case '8':
      return "Sha'ban";
    case '9':
      return 'Ramadan';
    case '10':
      return 'Shawwal';
    case '11':
      return 'Dhu al-Qidah';
    case '12':
      return 'Dhu al-Hijjah';
    default:
      return '';
  }
};

export default function InfoBar() {
  const options = { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' };
  const french = new Intl.DateTimeFormat('fr-FR', options).format(Date.now());
  const islamic = getIslamicDate();

  //State
  const [toggle, setToggle] = useState(true);

  return (
    <div className='InfoBar' onClick={() => setToggle(!toggle)}>
      <span className='date'>{toggle ? islamic : french}</span>
    </div>
  );
}
