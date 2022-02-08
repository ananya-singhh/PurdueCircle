import React from "react";
import {Link } from "react-router-dom";

 function App() {
     return (
       <div>
         <p>
	    PurdueCircle
	    <br />
	     Click the button below to Login ~
	  </p>
	  <Link to="/LoginPage"><button>
	     Login
	  </button>
	  </Link>
	 </div>
      );
}

export default App;
