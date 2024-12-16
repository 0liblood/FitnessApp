import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Activity } from '../../types';
import { Save } from 'lucide-react';
import './ActivityForm.less';

export const ActivityForm = () => {
  const addActivity = useStore((state) => state.addActivity);
  const [formData, setFormData] = useState({
    type: 'walking',
    duration: 30,
    caloriesBurned: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activity: Activity = {
      id: crypto.randomUUID(),
      ...formData,
      date: new Date(),
    };
    addActivity(activity);
    setFormData({
      type: 'walking',
      duration: 30,
      caloriesBurned: 0,
      notes: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <div className="form-group">
        <label className="form-label">Activity Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="form-select"
        >
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="hiking">Hiking</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Calories Burned</label>
        <input
          type="number"
          value={formData.caloriesBurned}
          onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="form-textarea"
          rows={3}
        />
      </div>

      <button type="submit" className="form-button">
        <Save className="button-icon" />
        Log Activity
      </button>
    </form>
  );
};
