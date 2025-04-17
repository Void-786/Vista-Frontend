import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';
import FeedbackSection from '../components/FeedbackSection';
import axios from 'axios';
import apiClient from '../api/apiClient';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiClient}/contact/submit`, formData);

      if (response.status === 200) {
        setSubmitStatus('success');
        // Optionally reset the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        console.error("Form submission failed:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="contact-page">

      <FeedbackSection />

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <FaPhoneAlt className="info-icon" />
              <h3>Phone</h3>
              <p>+91 9520616718</p>
            </div>

            <div className="info-card">
              <FaEnvelope className="info-icon" />
              <h3>Email</h3>
              <p>faizullahkhan2209@gmail.com</p>
            </div>

            <div className="info-card">
              <FaMapMarkerAlt className="info-icon" />
              <h3>Address</h3>
              <p>817-A, Mehrauli, New Delhi, India</p>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>

            {submitStatus === 'success' && (
              <div className="success-message">Message sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="error-message">Error sending message. Please try again.</div>
            )}

          </div>
        </div>
      </div>

      <a href="https://wa.me/+919520616718" className="whatsapp-button">
        <FaWhatsapp /> Chat on WhatsApp
      </a>
    </div>
  );
};

export default ContactPage;
