import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/car-management.css";

const Car: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cars-container">
      <h1 className="header">Cars Management</h1>
      <div className="button-container">
        <button onClick={() => navigate("/admin/cars/add-car")} className="action-button">Add Car</button>
        <button onClick={() => navigate("/admin/cars/update-car")} className="action-button">Update Car</button>
      </div>
    </div>
  );
};

export default Car;