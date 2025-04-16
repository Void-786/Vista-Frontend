import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cars.css';
import { FaCar, FaUsers } from 'react-icons/fa';
import apiClient from '../api/apiClient';

const CarsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, [activeCategory]);

  const fetchCars = async () => {
    try {
      const response = activeCategory === 'all'
        ? await axios.get(`${apiClient}/cars/all-cars`)
        : await axios.get(`${apiClient}/cars/${activeCategory}`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div className="cars-page">
      <h2 className="fleet-title">Our Fleet</h2>
      <div className="category-filter">
        <button 
          className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Vehicles
        </button>
        <button 
          className={`filter-btn ${activeCategory === 'Sedan' ? 'active' : ''}`}
          onClick={() => setActiveCategory('Sedan')}
        >
          Sedans
        </button>
        <button 
          className={`filter-btn ${activeCategory === 'MUV' ? 'active' : ''}`}
          onClick={() => setActiveCategory('MUV')}
        >
          MUVs
        </button>
        <button 
          className={`filter-btn ${activeCategory === 'SUV' ? 'active' : ''}`}
          onClick={() => setActiveCategory('SUV')}
        >
          SUVs
        </button>
      </div>

      <div className="cars-grid">
        {cars.map((car: any) => (
          <div 
            key={car.id} 
            className={`car-card ${selectedCar === car.id ? 'selected' : ''}`}
            onClick={() => setSelectedCar(car.id)}
          >
            <h3 className="car-name">{car.name}</h3>
            <img src={`data:image/jpeg;base64, ${car.image}`} alt={car.name} className="car-image" />
            <div className="car-info">
              <div className="car-specs">
                <div className="spec">
                  <FaUsers className="icon" />
                  <span>{car.seats} Seater</span>
                </div>
                <div className="spec">
                  <FaCar className="icon" />
                  <span>{car.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;