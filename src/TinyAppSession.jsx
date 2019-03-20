import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
import TinyApp from "./TinyApp";
import NewChat from "./components/NewChat";
import ElasticPanel from "./ElasticPanel";
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

class TinyAppSession extends React.Component {
  constructor(props) {
    console.log("construct TinyAppSession");
    console.log(props);
    super(props);
    this.state = {
      app_session_id: props.app_session_id,
      app_session: null,
      app_session_state: []
    };
  }
  componentWillMount() {
    /*
     * Here we call 'bindCollection', which will update
     * our local 'messages' state whenever our 'chats'
     * Firebase endpoint changes.
     */
    base.bindDoc("tinyappsession/" + this.state.app_session_id, {
      context: this,
      state: "app_session",
      withRefs: true
    });
    base.bindCollection(
      "tinyappsession/" + this.state.app_session_id + "/history",
      {
        context: this,
        state: "app_session_state",
        query: ref => {
          return ref.orderBy("ts");
        },
        withRefs: true
      }
    );
  }
  render() {
    var app_session = this.state.app_session;
    console.log("app_session", app_session);
    var app_session_state = this.state.app_session_state;
    console.log("app_session_state", app_session_state);

    return !app_session ? (
      "<pre>app_session error </pre>"
    ) : (
      <div style={{ paddingTop: "30px" }}>
        <TinyApp
          app_id={this.state.app_session.tinyapp}
          session_data={app_session_state}
        />
      </div>
    );
  }
}

export default withRouter(TinyAppSession);
