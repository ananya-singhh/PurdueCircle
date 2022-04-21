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
import ProfileNew from './ProfileNew';
import EditProfile from './EditProfile';
import SearchResults from './SearchResults';
import SavedPosts from './SavedPosts';
import CreatePost from './CreatePost';
import CreateTopic from './CreateTopic';
import HomePage from './Homepage';
import TopicPage from './TopicPage';
import DMPage from './DMPage';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CommentsPage from './CommentsPage';

/*ReactDOM.render(<App />, document.getElementById('root'));  */

const Routing = () => {
  return(
    <Router>
	  <Header />
      <Routes>
        <Route path="/" element ={<DefHomepage />} />
        <Route path="/SavedPosts" element ={<SavedPosts />} />
        <Route path="/Login" element={<Login />} />
		    <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Main />} />
        <Route path="/Profile/:username" element={<ProfileNew />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/SearchResults/:query" element={<SearchResults />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/CommentsPage" element={<CommentsPage />} />
        <Route path="/createPost/:topic" element={<CreatePost />} />
        <Route path="/createTopic" element={<CreateTopic />} />
        <Route path="/Topic/:name" element={<TopicPage />} />
        <Route path="Profile/:person/DMPage/:name/:target" element={<DMPage />} />
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
