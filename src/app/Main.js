/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header />
          <ListSongs />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;