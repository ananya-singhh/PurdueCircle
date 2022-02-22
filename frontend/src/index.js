import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DefHomepage from './DefHomepage';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals'; 

/*ReactDOM.render(<App />, document.getElementById('root'));  */

const Routing = () => {
  return(
    <Router>
	  <Header />
      <Routes>
        <Route path="/" element ={<DefHomepage />} />
        <Route path="/Login" element={<Login />} />
		    <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Main />} />
      </Routes>
	  <Footer />
    </Router>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
