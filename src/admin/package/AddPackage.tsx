import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/add-package.css";
import apiClient from '../../api/apiClient';

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
}

interface Place {
    id: number;
    name: string;
}

const AddPackageForm: React.FC = () => {
    const [formData, setFormData] = useState<PackageFormData>({
        title: '',
        duration: '',
        tour_highlight: '',
        price: '',
        locations: [],
        itinerary_heading: '',
        itinerary: [],
        placeId: 0
    });

    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get(`${apiClient}/places/all-places`);
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, locations: e.target.value.split(',') });
    };

    const handleItineraryChange = (index: number, field: keyof Itinerary, value: string) => {
        const updatedItinerary = formData.itinerary.map((item, i) => (
            i === index ? { ...item, [field]: value } : item
        ));
        setFormData({ ...formData, itinerary: updatedItinerary });
    };

    const addItineraryDay = () => {
        setFormData({
            ...formData,
            itinerary: [...formData.itinerary, { day: '', heading: '', description: '' }],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formattedData = { ...formData };
            const token = localStorage.getItem('token');
            await axios.post(`${apiClient}/place/package/admin/add-package?placeId=${formData.placeId}`, formattedData, { headers: { Authorization:`Bearer ${token}` } });
            alert('Package added successfully');
        } catch (error) {
            console.error('Failed to add package:', error);
            alert('Failed to add package');
        }
    };

return (
      <div className="add-package-container">
          <h2>Add Package</h2>
          <form className="add-package-form" onSubmit={handleSubmit}>
              <select
                  name="placeId"
                  value={formData.placeId}
                  onChange={(e) => setFormData({ ...formData, placeId : parseInt(e.target.value) })}
                  required
              >
                  <option value="">Select a Place</option>
                  {places.map((place) => (
                      <option key={place.id} value={place.id}>
                          {place.name}
                      </option>
                  ))}
              </select>

              <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
              <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
              <input type="text" name="tour_highlight" placeholder="Tour Highlight" value={formData.tour_highlight} onChange={handleChange} />
              <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
              <input type="text" placeholder="Locations (comma separated)" onChange={handleLocationChange} />
              <input type="text" name="itinerary_heading" placeholder="Itinerary Heading" value={formData.itinerary_heading} onChange={handleChange} />

              {formData.itinerary.map((day, index) => (
                  <div key={index}>
                      <input
                          type="text"
                          placeholder="Day"
                          value={day.day}
                          onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                      />
                      <input
                          type="text"
                          placeholder="Itinerary Heading"
                          value={day.heading}
                          onChange={(e) => handleItineraryChange(index, 'heading', e.target.value)}
                      />
                      <textarea
                          placeholder="Description"
                          value={day.description}
                          onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                      />
                  </div>
              ))}

              {/* Button container for centering */}
              <div className="button-container">
                  <button type="button" className="add-itinerary-button" onClick={addItineraryDay}>Add Itinerary Day</button>
                  <button type="submit" className="submit-button">Add Package</button>
              </div>
          </form>
      </div>
);
};

export default AddPackageForm;