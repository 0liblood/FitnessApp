import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Header.less';

export const Header = () => {
  const profile = useStore((state) => state.profile);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Dumbbell className="brand-icon" />
          <h1 className="brand-title">FitTrack</h1>
        </div>
        {profile && (
          <nav className="header-nav">
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
            <NavLink to="/progress" className={navLinkClasses}>
              Progress
            </NavLink>
            <NavLink to="/workouts" className={navLinkClasses}>
              Workouts
            </NavLink>
            <NavLink to="/activities" className={navLinkClasses}>
              Activities
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses}>
              Profile
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};
