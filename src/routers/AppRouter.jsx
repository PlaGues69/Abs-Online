import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PostPage from '../pages/postPage'; 
import UserListPage from "../pages/UserListPage";
import AdminDashboard from "../pages/AdminDashboard";


export default function AppRouter() {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className={isNoLayout ? 'no-layout' : 'default-layout'}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserListPage />} />  
        <Route path="/admin/posts" element={<PostPage />} />

      </Routes>
    </div>
  );
}
