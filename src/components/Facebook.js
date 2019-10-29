import React, { Component } from 'react';

class Facebook extends Component {

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    console.log("componentDidMount");
    
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    console.log("componentWillUnmount");
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin = () => {
    this.FB = window.FB;
    this.checkLoginStatus();
    console.log("initializeFacebookLogin");
  }

  /**
   * Check login status
   */
  checkLoginStatus = () => {
    this.FB.getLoginStatus(this.facebookLoginHandler);
    console.log("checkLoginStatus");
  }

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin = () => {
    if (!this.FB) return;

    this.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        console.log("this.FB.getLoginStatus");
        
        this.facebookLoginHandler(response);
      } else {
        this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
        console.log("this.FB.login");
      }
    }, );
  }

  /**
   * Handle login response
   */
  facebookLoginHandler = response => {
    if (response.status === 'connected') {
      this.FB.api('/me', userData => {
        let result = {
          ...response,
          user: userData
        };
        this.props.onLogin(true, result);
      });
      console.log("facebookLoginHandler");
      
    } else {
      this.props.onLogin(false);
    }
  }

  render() {
    let {children} = this.props;
    return (
      <div onClick={this.facebookLogin}>
        {children}
      </div>
    );
  }
}

export default Facebook