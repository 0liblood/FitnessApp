import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { UserProfile } from '../../types';
import { Save, Trash2 } from 'lucide-react';
import './ProfileForm.less';

interface ProfileFormProps {
  isNewProfile?: boolean;
}

export const ProfileForm = ({ isNewProfile }: ProfileFormProps) => {
  const { profile, setProfile, deleteProfile } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    height: profile?.height || '',
    weight: profile?.weight || '',
    selectedGoals: profile?.goals || [],
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const predefinedGoals = [
    { id: 'calories', label: 'Burn 2000 calories weekly' },
    { id: 'minutes', label: '300 active minutes weekly' },
    { id: 'workouts', label: 'Complete 5 workouts weekly' },
  ];

  /**
   * Toggles a goal in the form data.
   * - If the goal is already selected, it removes it.
   * - If the goal is not selected, it adds it to the selected goals.
   * @param goalId - The ID of the goal to toggle.
   */
  const handleGoalToggle = (goalId: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedGoals.includes(goalId);
      return {
        ...prev,
        selectedGoals: alreadySelected
          ? prev.selectedGoals.filter((id) => id !== goalId)
          : [...prev.selectedGoals, goalId],
      };
    });
  };

  /**
   * Handles form submission.
   * - Prevents default form behavior.
   * - Constructs a new UserProfile object and saves it in the store.
   * - Navigates to the dashboard after saving.
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: UserProfile = {
      id: profile?.id || crypto.randomUUID(),
      name: formData.name,
      height: Number(formData.height),
      weight: Number(formData.weight),
      goals: formData.selectedGoals,
      createdAt: profile?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    setProfile(newProfile);

    // Navigate to dashboard after saving
    navigate('/dashboard');
  };

  /**
   * Deletes the current profile and navigates to the dashboard.
   */
  const handleDelete = () => {
    deleteProfile();
    navigate('/dashboard');
  };

  /**
   * Confirms profile deletion by calling handleDelete and hiding the popup.
   */
  const confirmDelete = () => {
    handleDelete();
    setShowDeletePopup(false);
  };

  /**
   * Cancels the delete confirmation by hiding the popup.
   */
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2 className="form-title">
        {isNewProfile ? 'Create Profile' : 'Edit Profile'}
      </h2>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          placeholder="Enter your name"
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
            placeholder="e.g., 175"
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
            placeholder="e.g., 70"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Select Your Goals</label>
        <div className="checkbox-group styled-goals">
          {predefinedGoals.map((goal) => (
            <div key={goal.id} className="goal-item">
              <input
                type="checkbox"
                id={goal.id}
                checked={formData.selectedGoals.includes(goal.id)}
                onChange={() => handleGoalToggle(goal.id)}
                className="goal-checkbox"
              />
              <label htmlFor={goal.id} className="goal-label">
                {goal.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-button save-button">
          <Save className="button-icon" />
          Save Profile
        </button>
        {!isNewProfile && (
          <button
            type="button"
            onClick={() => setShowDeletePopup(true)}
            className="form-button delete-button"
          >
            <Trash2 className="button-icon" />
            Delete Profile
          </button>
        )}
      </div>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to delete your profile?</p>
            <div className="popup-actions">
              <button className="popup-confirm" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="popup-cancel" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
