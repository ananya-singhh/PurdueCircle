import React from 'react';
import Button from 'react-bootstrap/Button';
class FollowControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
    
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {      button = <Button onClick={this.handleLogoutClick}>Follow</Button>;    } else {      button = <Button onClick={this.handleLoginClick}>Unfollow</Button>;    }
      return (
        <div>       {button}      </div>
      );
    }
  }
  
  export default FollowControl;