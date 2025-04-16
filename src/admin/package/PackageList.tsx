import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../../api/apiClient";
import "../../styles/admin-package-list.css";

interface ItineraryDay {
  day: number;
  heading: string;
  description: string;
}

interface Package {
  id: number;
  title: string;
  duration: string;
  tour_highlight: string;
  price: string;
  locations: string[];
  itinerary_heading: string;
  itinerary: ItineraryDay[];
}

const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [packageToDelete, setPackageToDelete] = useState<number | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editPackage, setEditPackage] = useState<Package | null>(null);

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiClient}/place/package/all-packages`);
      console.log("API Response:", response.data); // Debugging
  
      // Transform data if necessary
      const transformedData = response.data.map((pkg) => ({
        ...pkg,
        itinerary: pkg.itinerary || [], // Ensure itinerary is an array
      }));
  
      setPackages(transformedData);
    } catch (err) {
      setError("Error fetching packages. Please try again later.");
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (packageId: number) => {
    setPackageToDelete(packageId);
    setShowConfirmDelete(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (packageToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${apiClient}/place/package/admin/remove-package?packageId=${packageToDelete}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Package deleted successfully");
        setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== packageToDelete));
      } catch (err) {
        setError("Error deleting package");
      }
      setShowConfirmDelete(false);
    }
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setShowConfirmDelete(false);
  };

  // Handle edit click
  const handleEditClick = (pkg: Package) => {
    setEditPackage(pkg);
    setShowEditForm(true);
  };

  // Handle updating package details
  const handleUpdatePackage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editPackage) {
      try {
        // Create a deep copy of the editPackage to avoid mutating the state directly
        const updatedPackage = JSON.parse(JSON.stringify(editPackage));

        const payload: Package = {
          id: updatedPackage.id,
          title: updatedPackage.title,
          duration: updatedPackage.duration,
          tour_highlight: updatedPackage.tour_highlight,
          price: updatedPackage.price,
          locations: updatedPackage.locations,
          itinerary_heading: updatedPackage.itinerary_heading,
          itinerary: updatedPackage.itinerary,
        };
        const token = localStorage.getItem('token');
        await axios.put(
          `${apiClient}/place/package/admin/update-package?packageId=${updatedPackage.id}`,
          payload,
          { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }}
        );
        
        alert("Package updated successfully");
        setPackages(prev => 
          prev.map(p => p.id === updatedPackage.id ? payload : p)
        );
        setShowEditForm(false);
      } catch (err) {
        setError("Error updating package: " + err.response?.data?.message);
      }
    }
  };
  
  

  // Handle changes in itinerary fields
  const handleItineraryChange = (
    index: number,
    field: keyof ItineraryDay,
    value: string
  ) => {
    if (editPackage) {
      // Create a copy of the itinerary to avoid mutating the state directly
      const updatedItinerary = [...editPackage.itinerary];
      updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
      setEditPackage(prevEditPackage => ({ 
        ...prevEditPackage, 
        itinerary: updatedItinerary 
      }));
    }
  };

  // Add a new day to the itinerary
  const handleAddNewDay = () => {
    if (editPackage) {
      const newDay: ItineraryDay = {
        day: editPackage.itinerary.length + 1,
        heading: "",
        description: "",
      };
      setEditPackage(prevEditPackage => ({
        ...prevEditPackage,
        itinerary: [...prevEditPackage.itinerary, newDay],
      }));
    }
  };

   // Remove a day from the itinerary
   const handleRemoveDay = (indexToRemove: number) => {
    if (editPackage) {
      // Create a copy of the itinerary to avoid mutating the state directly
      const updatedItinerary = editPackage.itinerary.filter((_, index) => index !== indexToRemove);

      // Update day: property after removing the item in itinerary
      const reorderedItinerary = updatedItinerary.map((day, index) => ({
        ...day,
        day: index + 1,
      }));
  
      setEditPackage(prevEditPackage => ({
        ...prevEditPackage,
        itinerary: reorderedItinerary,
      }));
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="package-list-container">
      <h1>Package List</h1>
      {loading && <p>Loading packages...</p>}
      {error && <p className="error">{error}</p>}
      <div className="package-list">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div className="package-item" key={pkg.id}>
              <span>{pkg.title}</span>
              <button className="package-button-edit" onClick={() => handleEditClick(pkg)}>
                Edit
              </button>
              <button className="button-delete" onClick={() => handleDeleteClick(pkg.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No packages found</p>
        )}
      </div>... {/* Edit Form */}
      {showEditForm && editPackage && (
        <div className="edit-package-form">
          <h2>Edit Package</h2>
          <form onSubmit={handleUpdatePackage}>
            <div className="form-field">
              <label htmlFor="title">Package Title</label>
              <input
                type="text"
                id="title"
                value={editPackage.title}
                onChange={(e) => setEditPackage({ ...editPackage, title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                value={editPackage.duration}
                onChange={(e) => setEditPackage({ ...editPackage, duration: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="tour_highlight">Tour Highlight</label>
              <input
                type="text"
                id="tour_highlight"
                value={editPackage.tour_highlight}
                onChange={(e) => setEditPackage({ ...editPackage, tour_highlight: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={editPackage.price}
                onChange={(e) => setEditPackage({ ...editPackage, price: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
  <label htmlFor="locations">Locations (comma separated)</label>
  <input
    type="text"
    id="locations"
    value={editPackage.locations.join(', ')} // Display locations as a comma-separated string
    onChange={(e) => {
      // Allow free typing (no trimming or splitting here)
      setEditPackage({ ...editPackage, locations: [e.target.value] });
    }}
    onBlur={(e) => {
      // Clean the data when the input loses focus
      const cleanedLocations = e.target.value
        .split(',') // Split by comma
        .map((location) => location.trim()) // Trim spaces from each location
        .filter((location) => location !== ''); // Remove empty strings
      setEditPackage({ ...editPackage, locations: cleanedLocations });
    }}
  />
</div>
            <div className="form-field">
              <label htmlFor="itinerary_heading">Itinerary Heading</label>
              <input
                type="text"
                id="itinerary_heading"
                value={editPackage.itinerary_heading}
                onChange={(e) => setEditPackage({ ...editPackage, itinerary_heading: e.target.value })}
              />
            </div>... {/* Itinerary Fields */}
            <div className="itinerary-fields">
              <h3>Itinerary</h3>
              {editPackage.itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <div className="form-field">
                    <label htmlFor={`day-${index}`}>Day</label>
                    <input
                      type="number"
                      id={`day-${index}`}
                      value={day.day}
                      onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`heading-${index}`}>Heading</label>
                    <input
                      type="text"
                      id={`heading-${index}`}
                      value={day.heading}
                      onChange={(e) => handleItineraryChange(index, "heading", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor={`description-${index}`}>Description</label>
                    <textarea
                      id={`description-${index}`}
                      value={day.description}
                      onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                      required
                    />
                  </div>
                   <button
                    type="button"
                    onClick={() => handleRemoveDay(index)}
                    className="remove-day-button"
                  >
                    Remove Day
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddNewDay} className="add-day-button">
                Add New Day
              </button>
            </div>

            <div className="package-button-container">
              <button type="submit">Update Package</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this package?</p>
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

export default PackageList;
