import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/itinerary.css';
import apiClient from '../api/apiClient';
import { FaCalendarAlt } from 'react-icons/fa';

interface Itinerary {
  day: string;
  heading: string;
  description: string;
}

interface PackageFormData {
  title: string;
  duration: string;
  tour_highlight: string;
  price: string;
  locations: string[];
  itinerary_heading: string;
  itinerary: Itinerary[];
  placeId: number;
  id: number;
}

const PackageItinerary: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [placeName, setPlaceName] = useState('');
  const [tourPackages, setTourPackages] = useState<PackageFormData[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageFormData | null>(null);
  const [includeAccommodations, setIncludeAccommodations] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // Add state for the booking popup
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    startDate: '',
    includeAccommodations: true,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${apiClient}/place/package/filter-by-place/${placeId}`);
        setTourPackages(response.data);
        if (response.data.length > 0) {
          setSelectedPackage(response.data[0]);
        }
      } catch (err) {
        setError('Failed to fetch tour packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [placeId]);

  const handleSelectPackage = (pkg: PackageFormData) => {
    setSelectedPackage(pkg);
  };

  useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const response = await axios.get(`${apiClient}/places/get-place/${placeId}`);
        setPlaceName(response.data.name);
      } catch (error) {
        console.error("Error fetching place name:", error);
      }
    };
  
    if (placeId) {
      fetchPlaceName();
    }
  }, [placeId]);

  // Update handleBookNow to show the popup
  const handleBookNow = () => {
    if (!selectedPackage) {
      alert('Please select a package before booking.');
      return;
    }
  
    setBookingData((prevData) => ({
      ...prevData,
      placeName, // Ensure placeName is set
      packageName: selectedPackage.title, // Ensure package name is set
      packagePrice: selectedPackage.price, // Ensure package price is set
    }));
  
    setShowBookingPopup(true);
  };

  // Handle input changes in the booking form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
        alert('No package selected.');
        return;
    }

    try {
        await axios.post(`${apiClient}/booking/submit`, {
            ...bookingData,
            packageId: selectedPackage.id,
            includeAccommodations
        });

        alert("Booking request submitted successfully! Check your email for confirmation.");
        setShowBookingPopup(false);
        setBookingData({
            fullName: '',
            mobileNumber: '',
            email: '',
            startDate: '',
            includeAccommodations: true,
        })
    } catch (error) {
        alert("Error submitting booking. Please try again later.");
    }
};


  if (loading) return <div>Loading packages...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!loading && tourPackages.length === 0) {
    return <div className="no-packages-message">No tour packages available for this place yet. Check back soon!</div>;
  }

  return (
    <div className="itinerary-container">
      {/* Package select section */}
      <div className="package-selector">
        <h2>Choose Your Package</h2>
        <div className="package-options">
          {tourPackages.map(pkg => (
            <div 
              key={pkg.id}
              className={`package-card ${selectedPackage && selectedPackage.id === pkg.id ? 'selected' : ''}`}
              onClick={() => handleSelectPackage(pkg)}
            >
              <div className="package-header">
                <h3>{pkg.title}</h3>
                <div className="package-duration">⏱️ {pkg.duration}</div>
              </div>
              <div className="package-price">💰 {pkg.price}</div>
              <button className="select-package-btn">
                {selectedPackage && selectedPackage.id === pkg.id ? (
                  <>
                    <span className="btn-icon">✓</span>
                    Selected
                  </>
                ) : (
                  <>
                    <span className="btn-icon">→</span>
                    Select Package
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tour highlights section */}
      {selectedPackage && (
        <div className="tour-highlights">
          <div className="highlights-content">
            <h2>Tour Highlights</h2>
            <div className="duration">{selectedPackage.duration}</div>
            <p className="highlights-description">{selectedPackage.tour_highlight}</p>

            <div className="route-path">
              {selectedPackage.locations.map((city, index) => (
                <React.Fragment key={city}>
                  <span className="city">{city}</span>
                  {index < selectedPackage.locations.length - 1 && (
                    <span className="route-dots">•••••➣</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* Itinerary Section */}
      <div className="itinerary-container">
        <h1 className="itinerary-title">Itinerary</h1>
        <p className="itinerary-subtitle">
          {selectedPackage?.itinerary_heading}
        </p>
        
        <div className="timeline">
          {selectedPackage?.itinerary.map((day) => (
            <div key={day.day} className="timeline-item">
              <div className="day-marker">Day {day.day}</div>
              <div className="timeline-content">
                <h3>{day.heading}</h3>
                <p>{day.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="booking-options">
        <label>
          <input
            type="checkbox"
            checked={includeAccommodations}
            onChange={() => setIncludeAccommodations(!includeAccommodations)}
          />
          Include Accommodations (Extra Charges Apply)*
        </label>
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
      </div>

      {/* Booking Popup */}
      {showBookingPopup && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <div className="booking-popup-header">
              <h2>Complete Your Booking</h2>
              <button className="close-popup" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowBookingPopup(false);
              }}>×</button>
            </div>
            
            <div className="booking-popup-content">
              <div className="package-summary">
                <h3>{selectedPackage?.title}</h3>
                <p>{selectedPackage?.duration}</p>
                <p className="package-price">{selectedPackage?.price}</p>
                {includeAccommodations && <p className="addon">+ Accommodations</p>}
              </div>
              
              <form onSubmit={handleSubmitBooking}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={bookingData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="emailId">Email ID</label>
                  <input
                    type="email"
                    id="emailId"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <div className="input-with-icon">
                      <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={bookingData.startDate}
                          onChange={handleInputChange}
                          required
                      />
                      <FaCalendarAlt className="calendar-icon" />
                  </div>
                </div>

                
                <button type="submit" className="book-now-btn submit-booking">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default PackageItinerary;
