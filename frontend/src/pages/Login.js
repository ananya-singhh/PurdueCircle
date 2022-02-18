import React from "react";

function Login() {

     return (
      <div id="background">
      <div id="LoginPage">

      <form>
      <label>
      Username:
      <input type="text"/>
      </label>
      </form>

      <form>
      <label>
      Password:
      <input type="password"/>
      </label>
      </form>

      <div id ="loginbutton">
          <a href="/" class="button">Login</a>
      </div>

      </div>
      </div>
     );

 }

 export default Login;