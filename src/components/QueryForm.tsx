import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaEnvelope, FaArrowUp, FaPaperPlane } from 'react-icons/fa';
import '../styles/queryForm.css';
import axios from 'axios';
import apiClient from '../api/apiClient';

const QueryForm: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    travelers: '',
    childrenCount: '',
    tripType: 'Round Trip', // Default to round trip.  Capitalized for consistency
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null); // 'success' or 'error' or null

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the form data to the console before sending it
    console.log("Form Data being sent:", formData);
    console.log("Selected Cities being sent:", selectedCities);

    try {
      const response = await axios.post(`${apiClient}/query/submit-query`, {
        ...formData,
        cities: selectedCities
      });

      if (response.status === 200) {
        setSubmitStatus('success');
        // Optionally reset the form
        setFormData({
          startDate: '',
          endDate: '',
          travelers: '',
          childrenCount: '',
          tripType: 'Round Trip', // Keep capitalized and consistent on reset
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        setSelectedCities([]);
      } else {
        setSubmitStatus('error');
        console.error("Form submission failed:", response.status, response.data); // Log more info
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    }
  };

  const handleAddCity = () => {
    setSelectedCities([...selectedCities, '']);
  };

  const handleCityChange = (index: number, value: string) => {
    const updatedCities = [...selectedCities];
    updatedCities[index] = value;
    setSelectedCities(updatedCities);
  };

  // Function to handle trip type change
    const handleTripTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, tripType: e.target.value });
    };


  return (
    <div className="query-form-container">
      {/* ... rest of your form code remains mostly the same */}
      <div className="query-form-wrapper">
        <div className="form-background">
          <div className="background-images">
            {/* <img src="/src/assets/images/carousel/Varanasi-Ghats.jpg" alt="Varanasi Ghat" className="bg-image-1" />
            <img src="/src/assets/images/carousel/Haridwar-Rishikesh-Tour-package.jpg" alt="Rishikesh Adventure" className="bg-image-2" />
            <img src="/src/assets/images/carousel/taj-photo-yamuna-river-scaled.webp" alt="Taj Mahal" className="bg-image-3" /> */}
          </div>
        </div>
        <div className="form-content">
          <div className="form-header">
            <div className="header-content">
              {/* <img src="/src/assets/images/carousel/PTI01-22-2024-000010B-0_1705901965915_1705919545381.webp" alt="Ram Temple" className="header-image" /> */}
              <h2 className="form-title">Submit Your <span>Query</span></h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Start Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                  <FaCalendarAlt />
                </div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                  <FaCalendarAlt />
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>No. Of Travellers</label>
                <div className="input-with-icon">
                  <input
                    type="number"
                    placeholder="Enter Total No."
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  />
                  <FaUser />
                </div>
              </div>
              <div className="form-group">
                <label>Number of Children (below 12)</label>
                <div className="input-with-icon">
                  <input
                    type="number"
                    placeholder="Enter Number of Children"
                    value={formData.childrenCount}
                    onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                  />
                  <FaUser />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Trip Type</label>
              <div className="trip-type-selector">
                <label className={`radio-label ${formData.tripType === 'Round Trip' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tripType"
                    value="Round Trip"
                    checked={formData.tripType === 'Round Trip'}
                    onChange={handleTripTypeChange}
                  />
                  Round Trip
                </label>
                <label className={`radio-label ${formData.tripType === 'One Way Trip' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tripType"
                    value="One Way Trip"
                    checked={formData.tripType === 'One Way Trip'}
                    onChange={handleTripTypeChange}
                  />
                  One Way Trip
                </label>
              </div>
            </div>

            <div className="cities-section">
              <label>Cities To Be Added</label>
              {selectedCities.map((city, index) => (
                <div key={index} className="input-with-icon">
                  <input
                    type="text"
                    placeholder="Add Cities"
                    value={city}
                    onChange={(e) => handleCityChange(index, e.target.value)}
                  />
                  <FaArrowUp />
                </div>
              ))}
              <button type="button" className="add-city-btn" onClick={handleAddCity}>
                Add Cities +
              </button>
            </div>

            <div className="personal-details">
              <h3>Personal Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name(As Per Passport)</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <FaUser />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name(As Per Passport)</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <FaUser />
                  </div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Email ID</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <FaEnvelope />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="phone-input">
                    <select>
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Submit Your Query <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
      {submitStatus === 'success' && (
        <div className="success-message">Form submitted successfully!</div>
      )}
      {submitStatus === 'error' && (
        <div className="error-message">Error submitting form. Please try again.</div>
      )}
      <button className="scroll-top">
        <FaArrowUp />
      </button>
    </div>
  );
};

export default QueryForm;
