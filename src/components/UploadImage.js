import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';

import AddNew from '../components/AddNew';
import FbConfig from '../components/FbConfig';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
};

// Manage Firebase Storage
var storageRef = FbConfig.storage().ref();
var uploadsRef = FbConfig.database().ref('demoUpload');
var metadata = {
  contentType: 'image/jpeg',
  cacheControl: "max-age=" + (60 * 60 * 24 * 365) // One year of seconds
};

var uploadFile = function(file) {
    // Upload the file
    var uploadTask = storageRef.child(file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, function(error) {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      //var downloadURL = uploadTask.snapshot.downloadURL;
      var metadata = uploadTask.snapshot.metadata;

       var key = metadata.md5Hash.replace(/\//g, ':');
       var fileRecord = {
            downloadURL: uploadTask.snapshot.downloadURL,
            key: key,
            metadata: {
              fullPath: metadata.fullPath,
              md5Hash: metadata.md5Hash,
              name: metadata.name
            }
       };
       // push to database
       uploadsRef.child(key).set(fileRecord);
    });
};

export default class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount = () => {
    FbConfig.syncState('/demoUpload', {
      context: this,
      state: 'images',
      asArray: true
    });
  }

  uploadImages = () => {
    console.log('Start upload');

    var files = document.querySelector('#files-input').files;
    var i = files.length;
    var promises = [];

    while (i--) {
        promises.push(uploadFile(files[i]));
    }
  }

  deleteImage = (img) => {
    console.log(img.metadata.name);
    storageRef.child(img.metadata.name).delete().then(() => {
        console.log('DELETED')
        return uploadsRef.child(img.key).remove();
    });
  }

  render() {
    return (
      <div>
        <input id="files-input" label="Files" type="file" multiple></input><br />
        <FlatButton onTouchTap={this.uploadImages} label="Upload" />

        <div style={styles.root}>
            <GridList
              cellHeight={200}
              cols={6}
            >
              {this.state.images.map((img) => (
                <GridTile
                  key={img.key}
                  title={img.metadata.name}
                  subtitle={<span>by <b>{img.metadata.name}</b></span>}
                  actionIcon={<IconButton onTouchTap={this.deleteImage.bind(this, img)}><IconDelete color="white" /></IconButton>}
                >
                  <img src={img.downloadURL} />
                </GridTile>
              ))}
            </GridList>
        </div>
      </div>
    );
  }
}