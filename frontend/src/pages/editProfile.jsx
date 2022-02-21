import React, { Component } from 'react';

class editProfile extends React.Component {

    render() { 

        return ( 
            <div id="background">
            <div id="EditProfilePage">
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
      
            <div id ="savebutton">
                <a href="/" class="button">Save</a>
            </div>

            <div id ="backbutton">
                <a href="/" class="button">Back</a>
            </div>

      
            </div>
            </div>
        );
    }
}
 
export default editProfile;
