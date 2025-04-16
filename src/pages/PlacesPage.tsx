import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/places.css';
import apiClient from '../api/apiClient';
import axios from 'axios';

interface Place {
  id: string,
  name: string,
  image: string
}

const PlacesPage: React.FC = () => {

  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${apiClient}/places/all-places`);
        setPlaces(response.data);
      } catch (error) {
        setError('Error fetching places');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="best-places-container">
      <div className="best-places">
        <h2>Explore Amazing places</h2>
        <div className="best-places-grid">
          {places.map((place) => (
            <div key={place.id} className="best-places-card">
              <img src={`data:image/jpeg;base64,${place.image}`} alt={place.name} />
              <div className="best-places-overlay">
                <h3>{place.name}</h3>
                <Link to={`/itinerary/${Number(place.id)}`} className="view-places">
                  Explore Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
