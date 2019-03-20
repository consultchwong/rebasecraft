import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
import NewChat from "./components/NewChat";
import ElasticPanel from "./ElasticPanel";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import base from "./rebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
//import { config } from "../config";
import { config } from "./rebase";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

console.log("Please change to your own firebase address in src/App.js");

class ActionsHandler {
  constructor(context, actions) {
    console.log("construct ActionsHandler");
    this.context = context;
    this.actions = actions;
  }

  rebaseAddDoc(props) {
    console.log("rebaseAddDoc", props);
    base.addToCollection(
      props.firebase_collection_path,
      this.context[props.model_name],
      props.doc_id
    );
  }

  rebaseSetState(props) {
    console.log("setState", props);
    base
      .updateDoc(props.firebase_doc_path, this.context[props.model_name])
      .then(() => {
        //document is updated
        console.log("updateDoc Success");
      })
      .catch(err => {
        console.log("updateDoc failed", err);
        //handle error
      });
  }
  rebaseDeleteState(props) {
    console.log("deleteState", props);
    var delModel = {
      [Object.keys(
        this.context[props.model_name]
      )[0]]: firebase.firestore.FieldValue.delete()
    };
    base
      .updateDoc(props.firebase_doc_path, delModel)
      .then(() => {
        //document is updated
        console.log("removeDoc Success");
      })
      .catch(err => {
        console.log("removeDoc failed", err);
        //handle error
      });
  }
  handle() {
    console.log("handle context", this.context);
    console.log("handle actions", this.actions);
    this.actions.map(item => {
      console.log("handle map", item);
      if (item.addDoc) {
        this.rebaseAddDoc(item.addDoc);
      }

      if (item.setState) {
        this.rebaseSetState(item.setState);
      }
      if (item.deleteState) {
        this.rebaseDeleteState(item.deleteState);
      }
    });
    return { ...this.context, status: "completed" };
  }
}

export default ActionsHandler;
