import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiSave } from 'react-icons/fi';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    bio: 'Passionate about premium leather goods'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data
    localStorage.setItem('userProfile', JSON.stringify(formData));
    alert('Profile updated successfully!');
    navigate('/account');
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-header">
        <button className="back-btn" onClick={() => navigate('/account')}>
          <FiArrowLeft />
        </button>
        <h2>Edit Profile</h2>
        <div></div>
      </div>

      <div className="profile-photo-section">
        <div className="profile-photo-wrapper">
          <img 
            src="https://cdn.prod.website-files.com/63900c6064cbc128de0c6227/639b0f7b3749e7f1507c3326_team-img-01.jpg" 
            alt="Profile" 
          />
          <button className="change-photo-btn">
            <FiCamera />
          </button>
        </div>
        <p className="photo-hint">Tap to change photo</p>
      </div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>PIN Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="save-profile-btn">
          <FiSave />
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
