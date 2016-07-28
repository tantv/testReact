import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';

import ReactMaterialUiNotifications from '../components/ReactMaterialUiNotifications'
import Message from 'material-ui/svg-icons/communication/message'
import {deepOrange500} from 'material-ui/styles/colors'
import moment from 'moment'

import FbConfig from '../components/FbConfig';

// Get the currently signed-in user
FbConfig.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    console.log('User is signed in.');
  } else {
    console.log('No user is signed in.');
  }
});

export default class Auths extends React.Component {
  constructor(props) {
    super(props);
  }

  signInWithEmail = (data) => {
    //console.log(JSON.stringify(data, null, 4));
    var _email = data.email;
    var _password = data.password;

    if (!_email || !_password) {
        return console.log('email and password required');
    }

    // Sign in user
    FbConfig.auth().signInWithEmailAndPassword(_email, _password).then(() => {
            console.log('success');
            this._resetForm();
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
  }

  signOut = () => {
    FbConfig.auth().signOut().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
      // An error happened.
    });
  }  

  _resetForm = () => {
    this.refs.form.reset();
  }

  showNotification = () => {
    console.log('xxxxxxxxxxx');
    ReactMaterialUiNotifications.showNotification({
      title: 'Title',
      additionalText: `Some message to be displayed`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      overflowText: "joe@gmail.com",
      timestamp: moment().format('h:mm A')
    })
  } 

  styles = {
    paperStyle: {
      width: 500,
      margin: 'auto',
      padding: 20,
    },
    submitStyle: {
      marginTop: 32,
    },
  }

  errorMessages = {
    emailError: "Please provide a valid email",
    passwordError: "Please provide a password"
  }

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { emailError, passwordError} = this.errorMessages;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Paper style={paperStyle}>
          <Formsy.Form
            ref="form"
            onValidSubmit={this.signInWithEmail}
          >
            <FormsyText
              name="email"
              validations="isEmail"
              validationError={emailError}
              required
              hintText="Email"
              floatingLabelText="Your Email"
              fullWidth={true}
            />
            <FormsyText
              name="password"
              required
              hintText="Password"
              floatingLabelText="Your Password"
              fullWidth={true}
              type="password"
            />
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Login"
              fullWidth={true}
            />
          </Formsy.Form>
          <br />
          <FlatButton onTouchTap={this.signOut} label="Signout" />
        </Paper>
        <br />
        <RaisedButton onTouchTap={this.showNotification} label="Show Notification" />
        <ReactMaterialUiNotifications
            desktop={true}
            transitionName={{
              leave: 'dummy',
              leaveActive: 'fadeOut',
              appear: 'dummy',
              appearActive: 'zoomInUp'
            }}
            transitionAppear={true}
            transitionLeave={true}
          />
      </div>
      </MuiThemeProvider>
    );
  }
}