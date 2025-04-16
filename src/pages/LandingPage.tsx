import React from 'react';
import HomeSection from '../components/HomeSection';
import QueryForm from '../components/QueryForm';
import CarsPage from './CarsPage';
import PlacesPage from './PlacesPage';
import ContactPage from './ContactPage';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="landing-sections">
        <section id="home" className="section">
          <HomeSection />
        </section>

        <section id="query" className="section">
          <div className="form-section">
            <h2 className="main-title">Submit Your <span>Query</span></h2>
            <QueryForm />
          </div>
        </section>

        <section id="cars" className="section">
          <CarsPage />
        </section>

        <section id="packages" className="section">
          <PlacesPage />
        </section>

        <section id="contact" className="section">
          <ContactPage />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
