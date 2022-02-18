import React from "react";

function SignUp() {

     return (
        <div id="background">
        <div id="SignUpPage">
        <form>
      <label>
      Username:
      <input type="text"/>
      </label>
      </form>

      <form>
      <label>
      Email:
      <input type="text"/>
      </label>
      </form>

      <form>
      <label>
      Password:
      <input type="password"/>
      </label>
      </form>
  
        <div id ="signupbutton">
            <a href="/" class="button">Sign Up</a>
        </div>
  
        </div>
        </div>
     );

 }

 export default SignUp;