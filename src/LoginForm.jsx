import * as React from "react";
import ReactDOM from "react-dom";
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
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Fab
} from "@material-ui/core";
import MDIIcon from "@mdi/react";
import {
  mdiAccountQuestion,
  mdiGoogle,
  mdiGithubCircle,
  mdiTwitter
} from "@mdi/js";
import { Face, Fingerprint } from "@material-ui/icons";
import base from "./rebase";
import { getFSServerTS } from "./rebase";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    console.log("construct LoginForm");
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged is called.");
      if (user) {
        //  this.setState({ isAuthenticated: true });
        console.log(user);
        if (user.isAnonymous) console.log("Anonymous user");
        if (!user.isAnonymous) {
          base
            .addToCollection(
              "profiles",
              {
                name: user.displayName,
                profile_pic_url: user.photoURL,
                ts: getFSServerTS()
              },
              user.email
            )
            .then(() => {
              console.log("addToCollection is completed");
              //document is added to the collection
            })
            .catch(err => {
              console.log("addToCollection err:" + err);
              //handle error
            });
        }

        // User is signed in.
      } else {
        // No user is signed in.
        console.log("Not signed in but onAuthStateChanged is called.");
      }
    });
    this.state = { isAuthenticated: false };
  }

  componentWillMount() {
    console.log("ComponentWillMount");
  }

  componentDidMount() {
    console.log("ComponentDidMount");
  }

  handleAnonymousLogin = event => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  render() {
    console.log("this.state.isAuthenticated ", this.state.isAuthenticated);
    const { classes } = this.props;

    return this.state.isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          <Paper className={classes.padding}>
            <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="username"
                    label="Username"
                    type="email"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Button
                    disableFocusRipple
                    disableRipple
                    style={{ textTransform: "none" }}
                    variant="text"
                    color="primary"
                    onClick={() => {
                      console.log("ForgetPassword.onClick");
                      return <Link to="/dashboard" />;
                    }}
                  >
                    Forgot password ?
                  </Button>
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-evenly">
                <Grid item>
                  <Fab
                    size="large"
                    color="secondary"
                    aria-label="Google Login"
                    onClick={() => {
                      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                      firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                  >
                    <MDIIcon path={mdiGoogle} size={2} color="white" />
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab
                    size="large"
                    color="primary"
                    aria-label="Anonymous Login"
                    onClick={() => {
                      console.log("LoginForm.onClick");
                    }}
                  >
                    <MDIIcon
                      path={mdiAccountQuestion}
                      size={2}
                      color="white"
                      onClick={this.handleAnonymousLogin}
                    />
                  </Fab>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: "10px" }} />
            </div>
          </Paper>
        </div>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            console.log(user);
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return "signed in";
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </FirebaseAuthProvider>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));
