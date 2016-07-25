import React from 'react';
import AppBar from 'material-ui/AppBar';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import FbConfig from '../components/FbConfig';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  // handleToggle() {
  //   this.setState({open: !this.state.open});
  // }

  // handleClose() {
  //   this.setState({open: false});
  // }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  _addSong = () => {
    FbConfig.push('/items', {
      data: {name: 'George - ' + Math.floor((Math.random() * 10) + 1), type: 'Grizzly' + Math.floor((Math.random() * 10) + 1)},
      then(){
        console.log('ADDED');
      }
    });
  }

  render() {
    return (
      <div>
        <AppBar
  		    title="Home page"
  		    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconElementRight={<FlatButton onTouchTap={this._addSong.bind()} label="Add New" />}
  		  />

		    <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}