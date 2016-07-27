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