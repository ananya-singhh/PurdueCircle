import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import App from "./App";
import LoginPage from "./LoginPage";

const rootElement = document.getElementByID("root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<App/>}/>
    <Route path="/LoginPage" element={<LoginPage/>}</Route> 
    </Routes>
    </BrowserRouter>,
  rootElement
);
