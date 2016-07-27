import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import FbConfig from '../components/FbConfig';

const style = {
  padding: 40,
};

export default class Auths extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
  }

  signInWithEmail = () => {
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();

    if (!email || !password) {
        return console.log('email and password required');
    }

    // Sign in user
    FbConfig.auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log('success');
            this.refs.email.reset();
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            switch (errorCode) {
              case 'auth/invalid-email':
                console.log(errorMessage);
                break;

              case 'auth/user-disabled':
                console.log(errorMessage);
                break;

              case 'auth/user-not-found':
                console.log(errorMessage);
                break;

              case 'auth/wrong-password':
                console.log(errorMessage);
                break;
            }
    });

    // Listen to auth state changes
    FbConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in.');
      } else {
        console.log('No user is signed in.');
      }
    });
  }

  signOut = () => {
    FbConfig.auth().signOut().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
      // An error happened.
    });
  }  

  render() {
    return (
      <div>
        <Paper 
          style={style} 
          zDepth={1}
          children={
            <div>
                <TextField
                  hintText="Email"
                  fullWidth={true}
                  ref="email"
                /><br />
                <TextField
                  hintText="Password Field"
                  floatingLabelText="Password"
                  fullWidth={true}
                  ref="password"
                  type="password"
                />
                <FlatButton onTouchTap={this.signInWithEmail.bind()} label="SignIn" />
                <FlatButton onTouchTap={this.signOut.bind()} label="SignOut" />
            </div>
          }
         />
      </div>
    );
  }
}