import Rebase from 're-base';

var firebaseConfig = {
  apiKey: "AIzaSyDKAHRceJEvl-NObA4jRq8Xq28QeojwE5E",
  authDomain: "blazing-fire-266.firebaseapp.com",
  databaseURL: "https://blazing-fire-266.firebaseio.com",
  storageBucket: "blazing-fire-266.appspot.com"
};

var FbConfig = Rebase.createClass(firebaseConfig);

export default FbConfig;