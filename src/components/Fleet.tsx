import React from 'react';
import '../styles/fleet.css';
import FleetBookingForm from './FleetBookingForm';

const Fleet: React.FC = () => {
  return (
    <div className="fleet-container">
      <div className="fleet-hero">
        <div className="fleet-hero-content">
          <h1>Premium Car Rental Service</h1>
          <p>Experience luxury and comfort with our carefully curated selection of vehicles</p>
        </div>
        <FleetBookingForm />
      </div>

      <div className="fleet-intro">
        <h2>Our Fleet Collection</h2>
        <p>Choose from our range of meticulously maintained vehicles, each offering a perfect blend of comfort, style, and performance.</p>
      </div>
    </div>
  );
};

export default Fleet;
