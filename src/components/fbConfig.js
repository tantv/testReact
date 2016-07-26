import Rebase from 're-base';

var firebaseConfig = {
  apiKey: "AIzaSyDKAHRceJEvl-NObA4jRq8Xq28QeojwE5E",
  authDomain: "blazing-fire-266.firebaseapp.com",
  databaseURL: "https://blazing-fire-266.firebaseio.com",
  storageBucket: "blazing-fire-266.appspot.com"
};

var firebaseConfig2 = {
  apiKey: "AIzaSyBtsR8x4WCDS2IKc91kmTNtmWXBzBWUE0o",
  authDomain: "kdreact-e6f59.firebaseapp.com",
  databaseURL: "https://kdreact-e6f59.firebaseio.com",
  storageBucket: "kdreact-e6f59.appspot.com"
};

var FbConfig = Rebase.createClass(firebaseConfig);

export default FbConfig;

// FbConfig.database().ref('items').once('value').then(snapshot => {
//     //if you are using asArray
//     var theNewState = [];
//     snapshot.forEach(function (childSnapshot){
//       var val = childSnapshot.val();
//       theNewState.push(val);
//     });
//     this.setState({
//       'songs': theNewState
//     });
// });

//allow read, write: if request.auth != null;