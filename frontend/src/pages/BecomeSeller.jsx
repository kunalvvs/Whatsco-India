import { useState } from 'react';
import { FiUpload, FiCheck, FiPackage, FiTrendingUp, FiUsers, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import './BecomeSeller.css';

function BecomeSeller() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    email: '',
    phone: '',
    
    // Business Details
    businessName: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Bank Details
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    
    // Documents
    gstCertificate: null,
    panCard: null,
    addressProof: null,
    cancelledCheque: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller application submitted:', formData);
    alert('Application submitted successfully! We will review and get back to you within 24-48 hours.');
  };

  return (
    <div className="become-seller-page">
      {/* Hero Section */}
      <div className="seller-hero">
        <h1>Become a Seller</h1>
        <p>Start your online business journey with us and reach millions of customers</p>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Why Sell With Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiUsers />
            </div>
            <h3>Millions of Customers</h3>
            <p>Access to a large customer base across India</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiTrendingUp />
            </div>
            <h3>Grow Your Business</h3>
            <p>Tools and insights to scale your business</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiDollarSign />
            </div>
            <h3>Low Commission</h3>
            <p>Competitive rates with transparent pricing</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <FiPackage />
            </div>
            <h3>Easy Management</h3>
            <p>Manage orders, inventory, and payments easily</p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="registration-section">
        <div className="form-container">
          {/* Progress Steps */}
          <div className="progress-steps">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                <div className="step-number">
                  {currentStep > step ? <FiCheck /> : step}
                </div>
                <span className="step-label">
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Business'}
                  {step === 3 && 'Bank'}
                  {step === 4 && 'Documents'}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={currentStep === 4 ? handleSubmit : handleNext}>
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="form-step">
                <h3>Personal Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="form-step">
                <h3>Business Details</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Business Type *</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="individual">Individual</option>
                      <option value="proprietorship">Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="llp">LLP</option>
                      <option value="private">Private Limited</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>PAN Number *</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="ABCDE1234F"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Business Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Bank Details */}
            {currentStep === 3 && (
              <div className="form-step">
                <h3>Bank Account Details</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Account Number *</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>IFSC Code *</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      placeholder="IFSC Code"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Bank Name *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Bank name"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <div className="form-step">
                <h3>Upload Documents</h3>
                <div className="upload-grid">
                  <div className="upload-box">
                    <input
                      type="file"
                      id="gst"
                      onChange={(e) => handleFileChange(e, 'gstCertificate')}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="gst">
                      <FiUpload />
                      <span>{formData.gstCertificate ? formData.gstCertificate.name : 'GST Certificate'}</span>
                      <small>Optional</small>
                    </label>
                  </div>
                  
                  <div className="upload-box">
                    <input
                      type="file"
                      id="pan"
                      onChange={(e) => handleFileChange(e, 'panCard')}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <label htmlFor="pan">
                      <FiUpload />
                      <span>{formData.panCard ? formData.panCard.name : 'PAN Card *'}</span>
                      <small>Required</small>
                    </label>
                  </div>
                  
                  <div className="upload-box">
                    <input
                      type="file"
                      id="address"
                      onChange={(e) => handleFileChange(e, 'addressProof')}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <label htmlFor="address">
                      <FiUpload />
                      <span>{formData.addressProof ? formData.addressProof.name : 'Address Proof *'}</span>
                      <small>Required</small>
                    </label>
                  </div>
                  
                  <div className="upload-box">
                    <input
                      type="file"
                      id="cheque"
                      onChange={(e) => handleFileChange(e, 'cancelledCheque')}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <label htmlFor="cheque">
                      <FiUpload />
                      <span>{formData.cancelledCheque ? formData.cancelledCheque.name : 'Cancelled Cheque *'}</span>
                      <small>Required</small>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" className="btn-secondary" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              <button type="submit" className="btn-primary">
                {currentStep === 4 ? 'Submit Application' : 'Next'}
                {currentStep < 4 && <FiArrowRight />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BecomeSeller;
