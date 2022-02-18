import React from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
