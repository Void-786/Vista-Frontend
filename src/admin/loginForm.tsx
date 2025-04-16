import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './../styles/adminLogin.css';
import apiClient from "../api/apiClient";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiClient}/auth/login`, { username, password });
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            alert("Login successful!");
            navigate("/admin");
        } catch (error) {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;