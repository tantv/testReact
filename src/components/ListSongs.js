import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import Rebase from 're-base';
import Loader from '../components/Loader';

var base = Rebase.createClass('https://kdreact-e6f59.firebaseio.com');

export default class ListSongs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      selectable: true,
      multiSelectable: true,
      showCheckboxes: true,
      enableSelectAll: true,
      stripedRows: false,
      showRowHover: false,
      deselectOnClickaway: false,
      loading: true,
      songs: []
    };
  }

  componentDidMount() {
   base.syncState('/', {
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
              <TableHeaderColumn>Status</TableHeaderColumn>
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
                <TableRowColumn>{song.id}</TableRowColumn>
                <TableRowColumn>{song.code}</TableRowColumn>
                <TableRowColumn>{song.composer}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}