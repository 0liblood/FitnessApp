import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { UserProfile } from '../../types';
import { Save, Trash2 } from 'lucide-react';
import './ProfileForm.less';

export const ProfileForm = () => {
  const { profile, setProfile } = useStore();
  const [formData, setFormData] = useState<UserProfile>({
    id: profile?.id || crypto.randomUUID(),
    name: profile?.name || '',
    height: profile?.height || 0,
    weight: profile?.weight || 0,
    age: profile?.age || undefined,
    gender: profile?.gender || undefined,
    goals: profile?.goals || [], // ensure it's an array
    createdAt: profile?.createdAt || new Date(),
    updatedAt: profile?.updatedAt || new Date(),
  });

  const handleGoalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      goals: e.target.value.split(',').map((goal) => goal.trim()),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      ...formData,
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: formData.age ? Number(formData.age) : undefined,
      updatedAt: new Date(),
    };
    setProfile(updatedProfile);
  };

  const handleDelete = () => {
    setProfile(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2 className="form-title">Complete Your Profile</h2>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="form-input"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          type="number"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Gender</label>
        <select
          value={formData.gender || ''}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserProfile['gender'] })}
          className="form-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Goals (comma-separated)</label>
        <textarea
          value={formData.goals.join(', ')} // convert array back to string for display
          onChange={handleGoalsChange}
          className="form-textarea"
          rows={3}
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-button save-button">
          <Save className="button-icon" />
          Save Profile
        </button>
        <button type="button" onClick={handleDelete} className="form-button delete-button">
          <Trash2 className="button-icon" />
          Delete Profile
        </button>
      </div>
    </form>
  );
};
