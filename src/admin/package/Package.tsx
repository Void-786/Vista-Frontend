import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin-package.css";

const Package: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="packages-container">
      <h1 className="header">Packages Management</h1>
      <div className="button-container">
        {id && (
          <div className="place-options">
            <button onClick={() => navigate(`/admin/places/${id}/add-package`)} className="action-button">Add Package</button>
            <button onClick={() => navigate(`/admin/places/${id}/update-package`)} className="action-button">Update Package</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Package;
