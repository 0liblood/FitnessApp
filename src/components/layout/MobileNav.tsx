import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Dumbbell, 
  Activity, 
  User 
} from 'lucide-react';
import './MobileNav.less';

export const MobileNav = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `mobile-nav-link ${isActive ? 'active' : ''}`;

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-container">
        <NavLink to="/dashboard" className={navLinkClasses}>
          <LayoutDashboard className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/progress" className={navLinkClasses}>
          <TrendingUp className="nav-icon" />
          <span>Progress</span>
        </NavLink>
        <NavLink to="/workouts" className={navLinkClasses}>
          <Dumbbell className="nav-icon" />
          <span>Workouts</span>
        </NavLink>
        <NavLink to="/activities" className={navLinkClasses}>
          <Activity className="nav-icon" />
          <span>Activities</span>
        </NavLink>
        <NavLink to="/profile" className={navLinkClasses}>
          <User className="nav-icon" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
