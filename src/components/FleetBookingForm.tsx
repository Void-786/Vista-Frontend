import React, { useState } from 'react';
import '../styles/fleetBooking.css';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const FleetBookingForm: React.FC = () => {
  const [tripType, setTripType] = useState('roundTrip');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fleet-booking-container">
      <div className="booking-type-tabs">
        <button
          className={`tab ${tripType === 'outstation' ? 'active' : ''}`}
          onClick={() => setTripType('outstation')}
        >
          Outstation
        </button>
        <button
          className={`tab ${tripType === 'local' ? 'active' : ''}`}
          onClick={() => setTripType('local')}
        >
          Local / Airport
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="trip-type-selector">
          <label className={`radio-label ${tripType === 'roundTrip' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === 'roundTrip'}
              onChange={(e) => setTripType(e.target.value)}
            />
            Round Trip
          </label>
          <label className={`radio-label ${tripType === 'oneWay' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === 'oneWay'}
              onChange={(e) => setTripType(e.target.value)}
            />
            One Way Trip
          </label>
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            type="text"
            placeholder="Enter pickup city"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            type="text"
            placeholder="Enter destination city"
            value={dropCity}
            onChange={(e) => setDropCity(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Check Price & Book Cab
        </button>
      </form>
    </div>
  );
};

export default FleetBookingForm;
