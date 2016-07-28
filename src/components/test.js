import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionAdd from 'material-ui/svg-icons/action/note-add';
import ActionEdit from 'material-ui/svg-icons/action/settings';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

import Loader from '../components/Loader';
import AddNew from '../components/AddNew';
import UploadImage from '../components/UploadImage';

import Auths from '../components/Auths';

import FbConfig from '../components/FbConfig';


export default class ListSongs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      selectable: true,
      multiSelectable: false,
      showCheckboxes: true,
      enableSelectAll: false,
      stripedRows: false,
      showRowHover: false,
      deselectOnClickaway: true,
      loading: true,
      songs: []
    };
  }

  componentDidMount = () => {
    FbConfig.syncState('/items', {
      context: this,
      state: 'songs',
      asArray: true,
      queries: {
        limitToFirst: 5
      },
      then(){
        this.setState({loading: false})
      }
    });
  }

  _removeSong = (key) => {
    FbConfig.database().ref('items/'+ key).remove().then(snapshot => {
        console.log('DELETED')
    });
  }

  _addSong = () => {
    FbConfig.push('/items', {
      data: {name: 'George - ' + Math.floor((Math.random() * 10) + 1), type: 'Grizzly' + Math.floor((Math.random() * 10) + 1)},
      then(){
        console.log('ADDED');
      }
    });
  }

  _nextPage = () => console.log('test');

  render() {
    return (
      <div>
        {this.state.loading === true ? <Loader /> : ''}
        <Auths />
        <br />
        <UploadImage />
        <Table
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>
              Action
              <ActionAdd onTouchTap={this._addSong.bind()} />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.songs.map( (song) => (
              <TableRow key={song.key} selected={song.selected}>
                <TableRowColumn>{song.name}</TableRowColumn>
                <TableRowColumn>{song.type}</TableRowColumn>
                <TableRowColumn>
                  <ActionDelete color={red500} onTouchTap={this._removeSong.bind(this, song.key)} />
                  <AddNew song={song} label="Edit" />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <h2 onTouchTap={this._nextPage.bind(this)}> next page </h2>
      </div>
    );
  }
}

/* ============ Formsy ==============

import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';

============================

enableButton = () => {
  this.setState({
    canSubmit: true,
  });
}

disableButton = () => {
  this.setState({
    canSubmit: false,
  });
}

submitForm = (data) => {
  console.log(JSON.stringify(data, null, 4));
}

notifyFormError = (data) => {
  console.error('Form error:', data);
}

styles = {
  paperStyle: {
    width: 300,
    margin: 'auto',
    padding: 20,
  },
  switchStyle: {
    marginBottom: 16,
  },
  submitStyle: {
    marginTop: 32,
  },
}

errorMessages = {
  wordsError: "Please only use letters",
  numericError: "Please provide a number",
  urlError: "Please provide a valid URL",
}

==============
render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              required
              hintText="What is your name?"
              floatingLabelText="Name"
            />
            <FormsyText
              name="age"
              validations="isNumeric"
              validationError={numericError}
              hintText="Are you a wrinkly?"
              floatingLabelText="Age (optional)"
            />
            <FormsyText
              name="url"
              validations="isUrl"
              validationError={urlError}
              required
              hintText="http://www.example.com"
              floatingLabelText="URL"
            />
            <FormsySelect
              name="frequency"
              required
              floatingLabelText="How often do you?"
            >
              <MenuItem value={'never'} primaryText="Never" />
              <MenuItem value={'nightly'} primaryText="Every Night" />
              <MenuItem value={'weeknights'} primaryText="Weeknights" />
            </FormsySelect>
            <FormsyDate
              name="date"
              required
              floatingLabelText="Date"
            />
            <FormsyTime
              name="time"
              required
              floatingLabelText="Time"
            />
            <FormsyCheckbox
              name="agree"
              label="Do you agree to disagree?"
              style={switchStyle}
            />
            <FormsyToggle
              name="toggle"
              label="Toggle"
              style={switchStyle}
            />
            <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
              <FormsyRadio
                value="light"
                label="prepare for light speed"
                style={switchStyle}
              />
              <FormsyRadio
                value="not_light"
                label="light speed too slow"
                style={switchStyle}
              />
              <FormsyRadio
                value="ludicrous"
                label="go to ludicrous speed"
                style={switchStyle}
                disabled={true}
              />
            </FormsyRadioGroup>
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
*/
