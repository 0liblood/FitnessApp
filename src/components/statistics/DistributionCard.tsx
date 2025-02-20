import React from 'react';
import './DistributionCard.less';

interface DistributionCardProps {
  title: string;
  distribution: Record<string, number>;
}

export const DistributionCard = ({ title, distribution }: DistributionCardProps) => {
  // Calculate the total value of all distribution items
  const total = Object.values(distribution).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="distribution-card">
      <h3 className="card-title">{title}</h3>
      <div className="distribution-list">
        {/* Iterate through the distribution object to display each item */}
        {Object.entries(distribution).map(([key, value]) => (
          <div key={key} className="distribution-item">
            <div className="item-header">
              {/* Display the key and percentage value for each distribution item */}
              <span className="item-key">{key}</span>
              <span className="item-value">{Math.round((value / total) * 100)}%</span>
            </div>
            {/* Render a progress bar showing the percentage visually */}
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
