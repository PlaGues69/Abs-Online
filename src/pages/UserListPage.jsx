import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/userService";
import './Css/UserListPage.css';

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to load users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="user-list-page">
      <h2>👤 All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="user-card">
            <div>
              <strong>{user.username}</strong> — {user.email}
            </div>
            <button
              className="delete-user-btn"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
