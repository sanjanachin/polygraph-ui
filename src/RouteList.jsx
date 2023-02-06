import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Polygraph from './pages/Polygraph';
import About from './pages/About';
import Login from './pages/Login';

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Polygraph />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
