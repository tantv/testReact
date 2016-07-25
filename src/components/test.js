import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionAdd from 'material-ui/svg-icons/action/note-add';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

import Rebase from 're-base';
import Loader from '../components/Loader';

var base = Rebase.createClass('https://blazing-fire-266.firebaseio.com');

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
      deselectOnClickaway: false,
      loading: true,
      songs: []
    };
  }

  componentDidMount() {
    base.syncState('/items', {
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

  _removeSong = (index) => {
    console.log(index);
    var arr = this.state.songs.concat([]);
    arr.splice(index, 1);

    /*
     * Calling setState here will update the '/chats' ref on our Firebase.
     * Notice that I'm also updating the 'show' state.  Because there is no
     * binding to our 'show' state, it will update the local 'show' state normally,
     * without going to Firebase.
     */

    this.setState({
      songs: arr
    });
  }

  _addSong = () => {
    base.push('/items', {
      data: {name: 'George - ' + Math.floor((Math.random() * 10) + 1), type: 'Grizzly'},
      then(){
        console.log('ADDED');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.loading === true ? <Loader /> : ''}
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
            {this.state.songs.map( (song, index) => (
              <TableRow key={index} selected={song.selected}>
                <TableRowColumn>{song.key}</TableRowColumn>
                <TableRowColumn>{song.name}</TableRowColumn>
                <TableRowColumn>
                  <ActionDelete color={red500} onTouchTap={this._removeSong.bind(this, index)} />
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}