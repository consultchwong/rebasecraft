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

class MessageView extends React.Component {
  constructor(props) {
    console.log("construct MessageView");
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount() {
    /*
     * Here we call 'bindCollection', which will update
     * our local 'messages' state whenever our 'chats'
     * Firebase endpoint changes.
     */
    base.bindCollection("chats", {
      context: this,
      state: "messages",
      query: ref => {
        return ref.orderBy("ts");
      },
      withRefs: true
    });
  }
  render() {
    return (
      <div style={{ paddingTop: "30px" }}>
        <ElasticPanel data={this.state.messages} />
        <TinyApp app_id="elasticpanel" />
        <TinyApp app_id="helloworld" />
        <NewChat />
        <Container messages={this.state.messages} />
      </div>
    );
  }
}

export default withRouter(MessageView);
