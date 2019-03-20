import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container";
import NewChat from "./components/NewChat";
import base from "./rebase";
import MessageView from "./MessageView.jsx";
import LoginForm from "./LoginForm.jsx";
import MenuAppBar from "./MenuAppBar.jsx";
import AuthExample from "./AuthExample.jsx";
import LabView from "./LabView.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./rebase";
import * as firebase from "firebase/app";

console.log("Please change to your own firebase address in src/App.js");
function PrivateRoute({
  component: Component,
  logincomponent: LoginComponent,
  ...rest
}) {
  console.log("Calling PrivateRoute", Component);
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <IfFirebaseUnAuthed>
        <Route {...rest} render={props => <LoginComponent {...props} />} />
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        <Route {...rest} render={props => <Component {...props} />} />
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  );
}

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <MenuAppBar />
          <Switch>
            <Route exact path="/labview" component={LabView} />
            <Route exact path="/authsample" component={AuthExample} />
            <Route exact path="/login" component={LoginForm} />
            <PrivateRoute
              exact
              path="/"
              component={MessageView}
              logincomponent={LoginForm}
            />
            <PrivateRoute
              path="/message"
              component={MessageView}
              logincomponent={LoginForm}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
