import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../../api/apiClient";
import "../../styles/admin-place-list.css";

interface Place {
  id: string;
  name: string;
  image?: File | string
}

const PlacesList: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [placeToDelete, setPlaceToDelete] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editPlace, setEditPlace] = useState<Place | null>(null);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiClient}/places/all-places`);
      setPlaces(response.data);
    } catch (err) {
      setError("Error fetching places. Please try again later.");
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking delete button
  const handleDeleteClick = (placeId: string) => {
    setPlaceToDelete(placeId);
    setShowConfirmDelete(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (placeToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${apiClient}/places/admin/delete/delete-place?placeId=${placeToDelete}
          `, { headers: { Authorization: `Bearer ${token}` } });
        alert("Place deleted successfully");
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== placeToDelete));
      } catch (err) {
        setError("Error deleting place");
      }
      setShowConfirmDelete(false); // Close modal after action
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setShowConfirmDelete(false); // Close modal
  };

  // Handle clicking edit button
  const handleEditClick = (place: Place) => {
    setEditPlace(place);
    setShowEditForm(true); // Show the edit form
  };

  // Handle updating car details
  const handleUpdateCar = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editPlace) {
      try {
        const formData = new FormData();
        formData.append("placeId", String(editPlace.id));
        formData.append("name", editPlace.name);
        if (editPlace.image instanceof File) {
          formData.append("image", editPlace.image); // Handle image as a File object
        }
        const token = localStorage.getItem('token');
        await axios.put(`${apiClient}/places/admin/update/update-place`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });

        alert("Place updated successfully");
        setPlaces((prevPlaces) =>
          prevPlaces.map((place) => (place.id === editPlace.id ? editPlace : place))
        );
        setShowEditForm(false);
      } catch (err) {
        setError("Error updating place");
      }
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="places-list-container">
      <h1>Places List</h1>
      {loading && <p>Loading places...</p>}
      {error && <p className="error">{error}</p>}
      <div className="place-list">
        {places.length > 0 ? (
          places.map((place) => (
            <div className="place-item" key={place.id}>
              <span>{place.name}</span>
              <button className="button-edit" onClick={() => handleEditClick(place)}>
                Edit
              </button>
              <button className="button-delete" onClick={() => handleDeleteClick(place.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No places found</p>
        )}
      </div>

      {/* Edit Form */}
      {showEditForm && editPlace && (
        <div className="edit-place-form">
          <h2>Edit Place</h2>
          <form onSubmit={handleUpdateCar}>
            <div className="form-field">
              <label htmlFor="name">Place Name</label>
              <input
                type="text"
                id="name"
                value={editPlace.name}
                onChange={(e) => setEditPlace({ ...editPlace, name: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="image">Place Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) =>
                  setEditPlace({ ...editPlace, image: e.target.files?.[0] || null })
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
          <p>Are you sure you want to delete this place?</p>
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

export default PlacesList;