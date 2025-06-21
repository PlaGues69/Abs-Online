import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Css/AdminDashboard.css"; // Optional if you add styling

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin 👑</h2>
      <div className="admin-options">
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/posts")}>Manage Posts</button>
      </div>
    </div>
  );
}
