import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMoon, FiGlobe, FiLock, FiDatabase, FiTrash2 } from 'react-icons/fi';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = ['English', 'हिंदी', 'मराठी', 'தமிழ்', 'తెలుగు', 'বাংলা'];

  const handleClearCache = () => {
    if (window.confirm('Clear all cached data?')) {
      localStorage.clear();
      alert('Cache cleared successfully!');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate('/account')}>
          <FiArrowLeft />
        </button>
        <h2>Settings</h2>
        <div></div>
      </div>

      <div className="settings-content">
        {/* Appearance */}
        <div className="settings-group">
          <h3>Appearance</h3>
          <div className="settings-item">
            <div className="settings-icon">
              <FiMoon />
            </div>
            <div className="settings-info">
              <h4>Dark Mode</h4>
              <p>Switch to dark theme</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="settings-group">
          <h3>Language & Region</h3>
          <div 
            className="settings-item clickable"
            onClick={() => setShowLanguageModal(true)}
          >
            <div className="settings-icon">
              <FiGlobe />
            </div>
            <div className="settings-info">
              <h4>Language</h4>
              <p>{language}</p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="settings-group">
          <h3>Privacy & Security</h3>
          <div 
            className="settings-item clickable"
            onClick={() => navigate('/change-password')}
          >
            <div className="settings-icon">
              <FiLock />
            </div>
            <div className="settings-info">
              <h4>Change Password</h4>
              <p>Update your password</p>
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="settings-group">
          <h3>Data Management</h3>
          <div 
            className="settings-item clickable"
            onClick={handleClearCache}
          >
            <div className="settings-icon">
              <FiDatabase />
            </div>
            <div className="settings-info">
              <h4>Clear Cache</h4>
              <p>Free up storage space</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-group danger-zone">
          <h3>Danger Zone</h3>
          <div 
            className="settings-item clickable danger"
            onClick={handleDeleteAccount}
          >
            <div className="settings-icon danger">
              <FiTrash2 />
            </div>
            <div className="settings-info">
              <h4>Delete Account</h4>
              <p>Permanently delete your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="modal-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="language-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Language</h3>
            <div className="language-list">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`language-option ${language === lang ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
