import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FbConfig from '../components/FbConfig';

export default class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edited: false,
      key: '',
      name: '',
      type: '',
      textLabel: this.props.label
    };
  }

  handleOpen = (props) => {
    this.setState({open: true});
    if(this.props.song) {
      this.setState({
        edited: true,
        key: this.props.song.key,
        name: this.props.song.name,
        type: this.props.song.type
      })
    }
  }

  handleClose = () => {
    this.setState({
      edited: false,
      open: false
    });
  }

  _addSong = () => {
    var _data = {
      name: this.refs.name.getValue(),
      type: this.refs.type.getValue()
    };

    if(this.state.edited) {
      FbConfig.post('/items/'+this.state.key, {
        data: _data,
        then(){
          console.log('UPDATED');
        }
      });
    } else {
      FbConfig.push('/items', {
        data: _data,
        then(){
          console.log('ADDED');
        }
      });
    }
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
        <FlatButton onTouchTap={this.handleOpen} label={this.state.textLabel} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <TextField 
            hintText="Name"
            defaultValue={this.state.name}
            fullWidth={true} 
            ref="name" />

          <TextField 
            hintText="Type"
            defaultValue={this.state.type}
            fullWidth={true} 
            ref="type" />

          <TextField 
            hintText="Images"
            fullWidth={true} 
            type="file"
            ref="images" />

        </Dialog>
      </div>
    );
  }
}