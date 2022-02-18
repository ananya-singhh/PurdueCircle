import './Profile.css';
import React from "react";

function Profile() {

     return (
      <div id="background">
        <div id="profilePage">
            <div id="userDisplay">xXx_mitchdaniels_xXx</div>
            <div id="nameDisplay">Firstname Lastname</div>
            <div id="bioDisplay">I am very tired. Please help me.</div>

            <div id ="editProfButton">
                <a href="/editProfile" class="button">Edit Profile</a>
            </div>
        </div>
      </div>
     );

 }

 export default Profile;
