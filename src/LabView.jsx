import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
import TinyApp from "./TinyApp";
import TinyAppSession from "./TinyAppSession";
import TinyAppCreation from "./TinyAppCreation";
import NewChat from "./components/NewChat";
import ElasticPanel from "./ElasticPanel";
import DialogFormButton from "./DialogFormButton";
import StatusSnackBar from "./StatusSnackBar";
import Paper from "@material-ui/core/Paper";
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { SnackbarProvider, withSnackbar } from "notistack";

console.log("Please change to your own firebase address in src/App.js");

class LabView extends React.Component {
  constructor(props) {
    console.log("construct LabView");
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
  }
  render() {
    var params = {
      open_button_caption: "Add Key",
      dialog_title: "Input Key Name",
      dialog_desc: "You may input the key name here.",
      form_model: { key: "", value: "" },
      ok_button_caption: "Confirm",
      cancel_button_caption: "Cancel"
    };
    var actions = [
      {
        addDoc: {
          firebase_collection_path: "/forms2",
          doc_id: "newform2",
          model_name: "form_model"
        },
        setState: {
          firebase_doc_path: "/forms/newform",
          field_name: "new.key",
          model_name: "form_model"
        }
      }
    ];
    return (
      <SnackbarProvider maxSnack={3}>
        <div style={{ padding: "30px" }}>
          <h3> Lab View </h3>

          <DialogFormButton params={params} ok_button_action={actions}>
            <AddCircleOutlineIcon />
          </DialogFormButton>

          <TinyAppCreation />
          {/*<TinyAppSession app_session_id="6groaWHvewCfXVeFuLxq" />*/}
        </div>
      </SnackbarProvider>
    );
  }
}

export default withRouter(LabView);
