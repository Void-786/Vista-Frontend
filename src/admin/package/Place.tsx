import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin-place.css";

const Place: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="packages-container">
      <h1 className="header">Packages Management</h1>
      <div className="button-container">
        <button onClick={() => navigate("/admin/places/add-place")} className="action-button">Add Place</button>
        <button onClick={() => navigate("/admin/places/update-place")} className="action-button">Update Place</button>

        
        <button onClick={() => navigate("/admin/places/packages/add-package")} className="action-button">Add Package</button>
        <button onClick={() => navigate("/admin/places/packages/update-package")} className="action-button">Update Package</button>

      </div>
    </div>
  );
};

export default Place;