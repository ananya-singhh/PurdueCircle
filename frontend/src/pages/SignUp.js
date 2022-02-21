import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

  const [user, setUser] = useState({username: "", email: "", password: ""})
  let navigate = useNavigate();

  useEffect(() => {
    document.cookie = "user=; SameSite=Lax; Secure";
  });

  function handleSignup() {
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
            if (res.data.data === "username"){
              alert("Username is taken")
            } else alert("Email is already in use!")
        } else {
            document.cookie = 'user=' + res.data.username + ';';
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