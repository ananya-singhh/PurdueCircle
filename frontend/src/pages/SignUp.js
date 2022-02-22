import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

  const [user, setUser] = useState({username: "", email: "", password: ""})
  let navigate = useNavigate();

  var passwordValidator = require('password-validator');
  var schema = new passwordValidator();

  schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  // .has().uppercase()                              // Must have uppercase letters
  // .has().lowercase()                              // Must have lowercase letters
  // .has().digits(1)                                // Must have at least 2 digits
  // .has().not().spaces();                          // Should not have spaces
  

  function handleSignup() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      console.log("good email")
    } else {
      alert("Email is invalid")
      return;
    }

    if (!schema.validate(user.password)) {
      alert("Password is invalid")
      return;
    }

    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/create_user',
      data: {
          username: user.username,
          password: user.password,
          email: user.email,
      }
    }).then( res => {
        if (res.data.data) {
            if (res.data.data === "username") {
              alert("Username is taken")
            } else alert("Email is already in use!");
        } else {
            sessionStorage.setItem('user', user.username);
            navigate("/");
        }
        
    }).catch(error => {
        console.log(error);
        //navigate("/404"); //do error stuff
    })
  }

  return (
    <div id="background">
    <div id="SignUpPage">
    <form>
    <label>
    Username:
    <input type="text" onChange = {e => setUser({...user, username: e.target.value})} value={user.username}/>
    </label>
    </form>

    <form>
    <label>
    Email:
    <input type="email" onChange = {e => setUser({...user, email: e.target.value})} value={user.email}/>
    </label>
    </form>

    <form>
    <label>
    Password:
    <input type="password" onChange = {e => setUser({...user, password: e.target.value})} value={user.password}/>
    </label>
    </form>

    <div id ="signupbutton">
        <button href="/" class="button" type="button" onClick={handleSignup}>Sign Up</button>
    </div>

    </div>
    </div>
    );

}

 export default SignUp;