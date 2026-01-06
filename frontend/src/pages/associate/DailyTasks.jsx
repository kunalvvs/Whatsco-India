import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiShare2, FiUpload, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { dailyTasks as initialTasks } from '../../data/associateData';
import { calculateProgress } from '../../utils/pcvCalculations';
import './DailyTasks.css';

function DailyTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [referralLink] = useState('https://app.example.com/ref/USER123');
  const [resetTime, setResetTime] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  // Calculate progress
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = calculateProgress(completedTasks, totalTasks);

  // Calculate referral progress
  const referralTasks = tasks.filter(t => t.title.includes('Friend'));
  const completedReferrals = referralTasks.filter(t => t.completed).length;
  const totalReferrals = referralTasks.length;

  // Calculate reset time (next midnight)
  useEffect(() => {
    const updateResetTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setResetTime(`${hours}h:${minutes}m:29s`);
    };

    updateResetTime();
    const interval = setInterval(updateResetTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if all mandatory tasks completed
  const allMandatoryCompleted = tasks
    .filter(t => t.mandatory)
    .every(t => t.completed);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const handleShareLink = (platform) => {
    const message = `Join me on EarnPro and start earning! ${referralLink}`;
    let url = '';

    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me on EarnPro!')}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me on EarnPro!')}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  const handleUploadClick = (task) => {
    setSelectedTask(task);
    setShowUploadModal(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleCompleteTask = () => {
    if (selectedTask && screenshot) {
      setTasks(tasks.map(t => 
        t.id === selectedTask.id ? { ...t, completed: true } : t
      ));
      setShowUploadModal(false);
      setSelectedTask(null);
      setScreenshot(null);
      alert('Task completed successfully! ✅');
    } else {
      alert('Please upload a screenshot first!');
    }
  };

  return (
    <div className="daily-tasks-page">
      {/* Header */}
      <div className="tasks-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Daily Tasks</h2>
        <div></div>
      </div>
      <p className="tasks-subtitle">Complete all tasks to earn income</p>

      <div className="tasks-content">
        {/* Overall Progress */}
        <div className="progress-card">
          <div className="progress-header">
            <h3>Overall Progress</h3>
            <div className="reset-timer">
              <FiAlertTriangle />
              <span>Reset in: {resetTime}</span>
            </div>
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <div className="progress-text">{completedTasks}/{totalTasks} Tasks Completed</div>
          </div>
        </div>

        {/* Referral Progress */}
        <div className="referral-progress-card">
          <div className="referral-icon">👥</div>
          <div className="referral-content">
            <h3>Referral Progress</h3>
            <div className="referral-bar">
              <div 
                className="referral-fill" 
                style={{width: `${(completedReferrals / totalReferrals) * 100}%`}}
              ></div>
            </div>
            <p>{completedReferrals}/10 Friends Sent Referral Link</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="referral-link-card">
          <h3>💎 Your Referral Link</h3>
          <div className="link-container">
            <input 
              type="text" 
              value={referralLink} 
              readOnly 
              className="link-input"
            />
            <button className="link-btn copy" onClick={handleCopyLink}>
              <FiCopy />
            </button>
          </div>
          
          <div className="share-buttons">
            <button className="share-btn whatsapp" onClick={() => handleShareLink('whatsapp')}>
              <FiShare2 /> WhatsApp
            </button>
            <button className="share-btn telegram" onClick={() => handleShareLink('telegram')}>
              <FiShare2 /> Telegram
            </button>
            <button className="share-btn facebook" onClick={() => handleShareLink('facebook')}>
              <FiShare2 /> Facebook
            </button>
            <button className="share-btn twitter" onClick={() => handleShareLink('twitter')}>
              <FiShare2 /> Twitter
            </button>
            <button className="share-btn copy" onClick={handleCopyLink}>
              <FiCopy /> Copy
            </button>
          </div>
        </div>

        {/* Income Paused Warning */}
        {!allMandatoryCompleted && (
          <div className="income-warning">
            <FiAlertTriangle className="warning-icon" />
            <div className="warning-content">
              <h4>Income Paused!</h4>
              <p>
                आपको daily tasks complete करने होंगे। सारी income missed हो रही है। 
                सभी task daily complete करें। Fake screenshot upload ना करें।
              </p>
            </div>
          </div>
        )}

        {/* Today's Tasks */}
        <div className="tasks-section">
          <h3 className="section-title">Today's Tasks</h3>
          
          <div className="tasks-list">
            {tasks.map((task, index) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-number">{index + 1}</div>
                
                <div className="task-content">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>

                {task.completed ? (
                  <div className="task-status completed">
                    <FiCheckCircle />
                    <span>Upload Screenshot & Complete</span>
                  </div>
                ) : (
                  <button 
                    className="task-btn"
                    onClick={() => handleUploadClick(task)}
                  >
                    <FiUpload />
                    <span>Upload Screenshot & Complete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="important-note-card">
          <div className="note-icon">⚠️</div>
          <div className="note-content">
            <h4>Important Note</h4>
            <ul>
              <li>80% tasks को 11:30 midnight तक करना होगा मतलब कोई भी income मिलेगी।</li>
              <li>Screenshot upload करना जरूरी है। (अगर गेम से करें तो हर screenshot अलग होगा)</li>
              <li>सभी tasks complete करने पर ही income मिलेगी।</li>
              <li>Fake screenshot upload ना करें। करने पर आपका आईडी ब्लॉक होगी।</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Screenshot</h3>
            <p className="modal-subtitle">{selectedTask?.title}</p>
            
            <div className="upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileSelect}
                id="screenshot-input"
                style={{display: 'none'}}
              />
              <label htmlFor="screenshot-input" className="upload-label">
                {screenshot ? (
                  <div className="file-selected">
                    <FiCheckCircle />
                    <span>{screenshot.name}</span>
                  </div>
                ) : (
                  <>
                    <FiUpload />
                    <span>Click to upload screenshot</span>
                  </>
                )}
              </label>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowUploadModal(false);
                  setScreenshot(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-complete"
                onClick={handleCompleteTask}
                disabled={!screenshot}
              >
                <FiCheckCircle />
                Complete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyTasks;
