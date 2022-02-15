import './App.css';
import React, { useState } from 'react';
import Login from './components/login'

function App() {

  const [setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }

  return (
    <div className="App">
      <Login userLogin={userLogin}/>
    </div>
  );
}

export default App;
