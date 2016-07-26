import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FbConfig from '../components/FbConfig';

export default class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  _addSong = () => {
    FbConfig.push('/items', {
      data: { 
        name: this.refs.name.getValue(), 
        type: this.refs.type.getValue()
      },
      then(){
        console.log('ADDED');
      }
    });
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._addSong.bind()}
      />,
    ];

    return (
      <div>
        <FlatButton onTouchTap={this.handleOpen} label="Add New" />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <TextField 
            hintText="Name" 
            fullWidth={true} 
            errorText="This field is required"
            ref="name"
            />

          <TextField 
            hintText="Type" 
            fullWidth={true} 
            errorText="This field is required"
            ref="type"
            />

        </Dialog>
      </div>
    );
  }
}