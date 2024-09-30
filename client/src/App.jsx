import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';     
import Register from './pages/register.jsx'; 
import Homepage from './pages/homepage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />  
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} /> 
          <Route path="/homepage" element={<Homepage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
