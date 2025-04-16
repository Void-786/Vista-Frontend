import React, { useEffect } from 'react';
import '../styles/bookings.css';

const BookingsPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1>Bookings & Refund Policy</h1>
        <p>Everything you need to know about making bookings and our refund policies.</p>
      </div>

      <div className="bookings-content">
        <section className="booking-section fade-in-section">
          <h2>Booking Methods</h2>
          <p>We offer multiple convenient ways to book your travel packages:</p>
          
          <div className="booking-methods">
            <div className="booking-method">
              <h3>Ready-Made Packages</h3>
              <p>Browse our selection of curated packages, select the one you like, and proceed with the booking. Our team will reach out to confirm details and finalize your reservation.</p>
            </div>
            
            <div className="booking-method">
              <h3>Customized Packages</h3>
              <p>Fill out our customization form with your preferences, and our travel experts will craft a personalized itinerary just for you. Once you approve the plan, we'll proceed with the booking.</p>
            </div>
            
            <div className="booking-method">
              <h3>WhatsApp Booking</h3>
              <p>Message us directly on WhatsApp for a more personalized booking experience. Our team is available to assist you throughout the process and answer any questions you may have.</p>
            </div>
          </div>
        </section>
        
        <section className="payment-section fade-in-section">
          <h2>Payment Policy</h2>
          <div className="booking-info">
            <p>We accept various payment methods to make your booking process as convenient as possible:</p>
            <ul>
              <li>Online payments through secure payment gateways</li>
              <li>Net banking transfers to our company account</li>
              <li>UPI payments for quick and easy transactions</li>
              <li>Flexible option: 50% advance payment and 50% at trip start</li>
            </ul>
            <p>For package bookings, a minimum advance payment of 50% is required to confirm your reservation. The remaining balance can be paid before or at the beginning of your trip, as per your convenience.</p>
          </div>
        </section>
        
        <section className="refund-section fade-in-section">
          <h2>Refund Policy</h2>
          <p>We understand that plans can change. Here's our refund policy for cancellations:</p>
          
          <div className="refund-table">
            <div className="refund-row header">
              <div className="refund-cell">Cancellation Timing</div>
              <div className="refund-cell">Refund Percentage</div>
            </div>
            <div className="refund-row">
              <div className="refund-cell">More than 30 days before departure</div>
              <div className="refund-cell">90% of total amount</div>
            </div>
            <div className="refund-row">
              <div className="refund-cell">15-30 days before departure</div>
              <div className="refund-cell">75% of total amount</div>
            </div>
            <div className="refund-row">
              <div className="refund-cell">7-14 days before departure</div>
              <div className="refund-cell">50% of total amount</div>
            </div>
            <div className="refund-row">
              <div className="refund-cell">Less than 7 days before departure</div>
              <div className="refund-cell">25% of total amount</div>
            </div>
            <div className="refund-row">
              <div className="refund-cell">Day of departure or no-show</div>
              <div className="refund-cell">No refund</div>
            </div>
          </div>
          
          <p style={{ marginTop: '20px' }}>Please note: Refund processing may take 5-7 business days depending on your payment method and bank policies.</p>
        </section>
        
        <section className="transparency-section fade-in-section">
          <h2>Transparency Promise</h2>
          <p>At Vista Tours, we believe in complete transparency in our pricing and policies. There are no hidden charges or surprise fees. The price you see is the price you pay, with all applicable taxes and fees clearly mentioned.</p>
          <p>If you have any questions about our booking or refund policies, please don't hesitate to contact our customer service team. We're here to make your travel planning experience as smooth and enjoyable as possible.</p>
        </section>
      </div>
    </div>
  );
};

export default BookingsPage; 
