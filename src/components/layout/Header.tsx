import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Header.less';

export const Header = () => {
  const profile = useStore((state) => state.profile);

  /**
   * Dynamically determines the class names for navigation links.
   * - Adds an 'active' class to the link if it matches the current route.
   * @param isActive - Boolean indicating whether the link is active.
   * @returns A string of class names for the navigation link.
   */
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="header">
      <div className="header-container">
        {/* Brand logo and title link */}
        <Link to="/dashboard" className="header-brand">
          <Dumbbell className="brand-icon" />
          <h1 className="brand-title">FitTrack</h1>
        </Link>

        {/* Navigation menu displayed only if a profile exists */}
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
