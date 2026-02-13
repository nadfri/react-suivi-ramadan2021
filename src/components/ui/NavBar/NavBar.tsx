import { NavLink } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsGraphDownArrow } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { SlSettings } from 'react-icons/sl';
import './NavBar.css';

export function NavBar() {
  const navLinks = [
    { to: '/', icon: IoCalendarOutline, label: 'Calendrier' },
    { to: '/graph', icon: BsGraphDownArrow, label: 'Statistiques' },
    { to: '/history', icon: FaRegClock, label: 'Historique' },
    { to: '/settings', icon: SlSettings, label: 'Paramètres' },
  ];

  return (
    <nav className="NavBar grid grid-cols-4 bg-white w-full h-16 sm:h-20 border-t border-gray-200 shadow-lg">
      {navLinks.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'active nav-link'
              : 'nav-link'
          }
          title={label}
        >
          <Icon className="text-2xl sm:text-3xl" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
