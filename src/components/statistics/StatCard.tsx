import React from 'react';
import { LucideIcon } from 'lucide-react';
import './StatCard.less';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-details">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {description && <p className="stat-description">{description}</p>}
        </div>
        <div className="stat-icon-container">
          <Icon className="stat-icon" />
        </div>
      </div>
    </div>
  );
};
