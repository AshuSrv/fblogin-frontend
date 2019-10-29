import React, { Component } from 'react';
import './App.css';
import Facebook from './components/Facebook'
import axios from 'axios';

class App extends Component {

  state = {
    username1:null,
    user: {
    username: null,
    accessToken: null,
    data_access_expiration_time: null,
    expiresIn: null,
    signedRequest: null,
    userID: null
    }
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      console.log(resultObject)
      console.log(loginStatus)
      this.setState({
        username1: resultObject.user.name,
        user: {
        username: resultObject.user.name,
        accessToken: resultObject.authResponse.accessToken,
        data_access_expiration_time: resultObject.authResponse.data_access_expiration_time,
        expiresIn: resultObject.authResponse.expiresIn,
        signedRequest: resultObject.authResponse.signedRequest,
        uid: resultObject.authResponse.userID,
        }
      });
    } else {
      alert('Facebook login error');
    }
  }
  componentDidUpdate() {
    axios.post('http://localhost:3001/create', this.state.user)
      .then(response => {
        console.log('auth response', response)
      }).catch(error => {
        console.log('auth error', error);
      });
  }


  render() {
    const { username1 } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Social Media Login</h1>
        </header>

        <div className="App-intro">
          { !username1 &&
            <div>
              <p>Click on one of any button below to login</p>
              <Facebook onLogin={this.onFacebookLogin}>
                <button>Facebook</button>
              </Facebook>
            </div>
          }
          {username1 &&
            <p>Welcome back, {username1}</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
