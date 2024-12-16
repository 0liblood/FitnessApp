import React from 'react';
import './DistributionCard.less';

interface DistributionCardProps {
  title: string;
  distribution: Record<string, number>;
}

export const DistributionCard = ({ title, distribution }: DistributionCardProps) => {
  const total = Object.values(distribution).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="distribution-card">
      <h3 className="card-title">{title}</h3>
      <div className="distribution-list">
        {Object.entries(distribution).map(([key, value]) => (
          <div key={key} className="distribution-item">
            <div className="item-header">
              <span className="item-key">{key}</span>
              <span className="item-value">{Math.round((value / total) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
