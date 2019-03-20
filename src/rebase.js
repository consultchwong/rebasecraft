import Rebase from "re-base";
//import firebase from "firebase/app";
//import "firebase/firestore";

import firebase from "firebase";
/*
var app = firebase.initializeApp({
  apiKey: "AIzaSyCETlSYkOH6Cut5Ii31THM3j5iOiHLz89Q",
  authDomain: "qwales1-test-fa2c0.firebaseapp.com",
  databaseURL: "https://qwales1-test-fa2c0.firebaseio.com",
  projectId: "qwales1-test-fa2c0"
});
*/

var _config = {
  /*  apiKey: "AIzaSyB1Wblw6CLqB9-ZJbBfUHHYHIB9DAg_EcU",
  authDomain: "newagent-e56d5.firebaseapp.com",
  databaseURL: "https://newagent-e56d5.firebaseio.com",
  projectId: "newagent-e56d5",
  storageBucket: "newagent-e56d5.appspot.com",
  messagingSenderId: "483037593776"*/
  apiKey: "AIzaSyDRG0yIb6ovqBQVq5jpqgu1f5c3T4f1yFs",
  authDomain: "rebasechat.firebaseapp.com",
  databaseURL: "https://rebasechat.firebaseio.com",
  projectId: "rebasechat",
  storageBucket: "rebasechat.appspot.com",
  messagingSenderId: "297536632050"
};
var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(_config);
}
console.log(firebase.apps);

function _getFSServerTS() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

var db = firebase.firestore(app);
var base = Rebase.createClass(db);

export default base;
export const getFSServerTS = _getFSServerTS;
export const config = _config;
