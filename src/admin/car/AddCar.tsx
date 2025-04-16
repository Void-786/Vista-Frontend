import React, { useState } from 'react';
import axios from 'axios';
import apiClient from '../../api/apiClient';
import "../../styles/admin-add-car.css";

const AddCar: React.FC = () => {
  
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState("");
  const [seats, setSeats] = useState<number | undefined>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("type", type);
    formData.append("seats", seats?.toString() || "");

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          `${apiClient}/cars/admin/add/new-car`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Car added successfully!");
      setError("");
      resetForm();
  } catch (err) {
      setError("Error adding car. Please try again.");
      setMessage("");
      console.error(err);
  }  
  };

  const resetForm = () => {
    setName("");
    setImage(null);
    setType("");
    setSeats(undefined);
  };

  return (
    <div className="create-car-container">
      <h2 className="create-car-header">Add Car</h2>
      <form onSubmit={handleSubmit} className="create-car-form">
        <div className="form-field">
          <label htmlFor="name" className="label">Car Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-field">
          <label htmlFor="image" className="label">Car Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            required
            className="input-field"
          />
        </div>

        <div className="form-field">
          <label htmlFor="type" className="label">Car Type</label>
          <input
            type="text"
            id="type"
            placeholder="Enter car type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-field">
          <label htmlFor="seats" className="label">Seats</label>
          <input
            type="number"
            id="seats"
            placeholder="Enter number of seats"
            value={seats || ""}
            onChange={(e) => setSeats(Number(e.target.value))}
            required
            className="input-field"
          />
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Success Message */}
        {message && <p className="success-message">{message}</p>}

        <div className="button-container">
          <button
            type="submit"
            className="submit-button"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;