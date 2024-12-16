import React, { useState } from 'react';
import { ActivityList } from './ActivityList';
import { ActivityForm } from './ActivityForm';
import { Plus, X } from 'lucide-react';
import './ActivityDashboard.less';

export const ActivityDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Activities</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="dashboard-button"
        >
          {showForm ? (
            <>
              <X className="icon" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="icon" />
              Log Activity
            </>
          )}
        </button>
      </div>

      {showForm ? (
        <div className="dashboard-form-container">
          <ActivityForm />
        </div>
      ) : (
        <ActivityList />
      )}
    </div>
  );
};
