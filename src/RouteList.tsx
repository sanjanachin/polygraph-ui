import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Polygraph from './pages/Polygraph';
import About from './pages/About';
import Login from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RouteListProps {
  user: string;
}

function RouteList(props: RouteListProps) {
  const { user } = props;
  return (
    <Routes>
      <Route path="/" element={<Polygraph user={user} />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
