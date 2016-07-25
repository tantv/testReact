import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDKAHRceJEvl-NObA4jRq8Xq28QeojwE5E",
  authDomain: "blazing-fire-266.firebaseapp.com",
  databaseURL: "https://blazing-fire-266.firebaseio.com",
  storageBucket: "blazing-fire-266.appspot.com"
};

const fbConfig = firebase.initializeApp(firebaseConfig);

export default class FbApp extends React.Component {
	//fbConfig.database();
}