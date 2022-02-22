import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'

function Login() {

    const [user, setUser] = useState({username: "", password: ""})

    let navigate = useNavigate();
    

    function handleLogin() {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/login_user',
            data: {
                username: user.username,
                password: user.password,
            }
        }).then( res => {
            if (res.data.data === "Failed") {
                console.log("bad login")
                alert("Information is incorrect")
            } else {
                console.log(res);
                sessionStorage.setItem('user', user.username)
                navigate("/");
            }
                
        }).catch(error => {
            console.log(error);
            //navigate("/404");
        })
    }

    return (
        <div id="background">
        <div id="LoginPage">

        <form>
        <label>
        Username:
        <input type="text" onChange = {e => setUser({...user, username: e.target.value})} value={user.username}/>
        </label>
        </form>

        <form>
        <label>
        Password:
        <input type="password" onChange = {e => setUser({...user, password: e.target.value})} value={user.password}/>
        </label>
        </form>

        <div id ="loginbutton">
            <button class="button" type="button" onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>
    );

}

 export default Login;