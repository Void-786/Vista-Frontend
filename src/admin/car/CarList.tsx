import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../../api/apiClient";
import "../../styles/admin-car-list.css";
// import token from "../../api/token";

interface Car {
  id: string;
  name: string;
  type: string;
  seats: number;
  image?: File | string;
}

const CarsList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editCar, setEditCar] = useState<Car | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiClient}/cars/all-cars`);
      setCars(response.data);
    } catch (err) {
      setError("Error fetching cars. Please try again later.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking delete button
  const handleDeleteClick = (carId: string) => {
    setCarToDelete(carId);
    setShowConfirmDelete(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (carToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${apiClient}/cars/admin/delete/delete-car?carId=${carToDelete}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Car deleted successfully");
        setCars((prevCars) => prevCars.filter((car) => car.id !== carToDelete));
      } catch (err) {
        setError("Error deleting car");
      }
      setShowConfirmDelete(false); // Close modal after action
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setShowConfirmDelete(false); // Close modal
  };

  // Handle clicking edit button
  const handleEditClick = (car: Car) => {
    setEditCar(car);
    setShowEditForm(true); // Show the edit form
  };

  // Handle updating car details
  const handleUpdateCar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editCar) {
      try {
        const formData = new FormData();
        formData.append("carId", String(editCar.id));
        formData.append("name", editCar.name);
        if (editCar.image instanceof File) {
          formData.append("image", editCar.image); // Handle image as a File object
        }
        formData.append("type", editCar.type);
        formData.append("seats", String(editCar.seats));
        const token = localStorage.getItem('token');
        await axios.put(`${apiClient}/cars/admin/update/update-car`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });

        alert("Car updated successfully");
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === editCar.id ? editCar : car))
        );
        setShowEditForm(false);
      } catch (err) {
        setError("Error updating car");
      }
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="cars-container">
      <h1>Cars List</h1>
      {loading && <p>Loading cars...</p>}
      {error && <p className="error">{error}</p>}
      <div className="cars-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div className="car-item" key={car.id}>
              <span>{car.name}</span>
              <button className="button-edit" onClick={() => handleEditClick(car)}>
                Edit
              </button>
              <button className="button-delete" onClick={() => handleDeleteClick(car.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No cars found</p>
        )}
      </div>

      {/* Edit Form */}
      {showEditForm && editCar && (
        <div className="edit-car-form">
          <h2>Edit Car</h2>
          <form onSubmit={handleUpdateCar}>
            <div className="form-field">
              <label htmlFor="name">Car Name</label>
              <input
                type="text"
                id="name"
                value={editCar.name}
                onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="type">Car Type</label>
              <input
                type="text"
                id="type"
                value={editCar.type}
                onChange={(e) => setEditCar({ ...editCar, type: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="seats">Seats</label>
              <input
                type="number"
                id="seats"
                value={editCar.seats}
                onChange={(e) => setEditCar({ ...editCar, seats: Number(e.target.value) })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="image">Car Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) =>
                  setEditCar({ ...editCar, image: e.target.files?.[0]})
                }
              />
            </div>

            <div className="button-container">
              <button type="submit">Update Car</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this car?</p>
          <div className="confirm-buttons">
            <button onClick={handleDeleteConfirm} className="confirm-button">
              Yes
            </button>
            <button onClick={handleDeleteCancel} className="cancel-button">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsList;