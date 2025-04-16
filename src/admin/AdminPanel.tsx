import React from "react";
import {useNavigate} from "react-router-dom";
import "../styles/admin-panel.css";

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="header">Admin Panel</h1>
        <div className="button-container">
          <button onClick={() => navigate("/admin/cars")} className="button">
            Cars
          </button>
          <button onClick={() => navigate("/admin/places")} className="button">
            Places
          </button>
        </div>
    </div>
  );
};

export default AdminPanel;