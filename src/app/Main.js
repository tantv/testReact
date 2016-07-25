/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header';
import ListSongs from '../components/test';

const muiTheme = getMuiTheme();

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Header />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
          <ListSongs />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;