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

const style = {
  griditem: {
    padding: "0 15px !important"
  },
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

function Welcome({ ...props }) {
  const { classes, children, ...rest } = props;
  return <h1>hello</h1>;
}

function TinyAppPaper(props) {
  console.log("TinyAppPaper props ", props);
  console.log("params ", props.params);
  const { classes, children, ...rest } = props;
  return <Paper>{props.params.text}</Paper>;
}

function TinyAppButton(props) {
  console.log("TinyAppButton props ", props);
  console.log("params ", props.params);
  const { classes, children, ...rest } = props;
  return <Button color="primary">{props.params.label}</Button>;
}

function TinyAppElasticPanel(props) {
  console.log("TinyAppElasticPanel props ", props);
  console.log("params ", props.params);
  const { classes, children, ...rest } = props;
  return <ElasticPanel data={props.data} />;
}

function TinyAppComponent(props) {
  console.log("props ", props);
  const { classes, children, ...rest } = props;
  console.log("TinAppComponent type ", props.type);
  console.log("params ", props.params);
  let ret = "";

  if (props.type == "Paper")
    ret = <TinyAppPaper params={props.params} data={props.data} />;
  else if (props.type == "Button")
    ret = <TinyAppButton params={props.params} data={props.data} />;
  else if (props.type == "ElasticPanel")
    ret = <TinyAppElasticPanel params={props.params} data={props.data} />;

  return ret;
}

function Box(props) {
  const { classes, children, ...rest } = props;
  return (
    <div>
      {props.components.map(value => {
        return (
          <TinyAppComponent
            type={value.type}
            params={value.params}
            data={props.data}
          />
        );
      })}
    </div>
  );
}

function GridLayout(props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container justify="center" spacing={8}>
      <Grid item>
        {props.components.map(value => {
          return (
            <TinyAppComponent
              type={value.type}
              params={value.params}
              data={props.data}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

function DefaultLayout(components, ...props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container justify="center" spacing={8}>
      {props.components.map((value, key) => (
        <Grid key={key} item>
          <Paper>{JSON.stringify(value)}</Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function Layout(props) {
  console.log("props ", props);
  const { classes, children, ...rest } = props;
  console.log("Layout type ", props.layout_type);
  console.log("components ", props.components);
  let ret = (
    <Grid container justify="center" spacing={8}>
      <Grid item>
        <Paper>{children}</Paper>
      </Grid>
    </Grid>
  );

  if (props.layout_type == "box")
    ret = (
      <Box components={props.components} data={props.data}>
        {children}
      </Box>
    );
  if (props.layout_type == "gridlayout")
    ret = (
      <GridLayout components={props.components} data={props.data}>
        {children}
      </GridLayout>
    );

  return ret;
}

class TinyApp extends React.Component {
  constructor(props) {
    console.log("construct TinyApp");
    super(props);
    this.state = {
      app_id: props.app_id,
      app_def: null
    };
  }

  componentWillMount() {
    /*
     * Here we call 'bindCollection', which will update
     * our local 'messages' state whenever our 'chats'
     * Firebase endpoint changes.
     */
    base.bindDoc("tinyapp/" + this.state.app_id, {
      context: this,
      state: "app_def",
      withRefs: true
    });
  }
  render() {
    var app_def = this.state.app_def;
    var app_id = this.state.app_id;
    var app_layout = app_def ? app_def.layout : "";
    var components = app_def ? app_def.components : "";
    var session_data = this.props.session_data;
    if (app_def) console.log("app_def", app_def);
    if (app_def) console.log(app_def.layout);
    if (app_def && !session_data) session_data = this.state.app_def.sample_data;
    if (session_data) console.log("session_data", session_data);
    return !app_def ? (
      <pre>app_def is not found</pre>
    ) : (
      <div style={{ paddingTop: "30px" }}>
        <pre style={{ height: 300, overflow: "auto" }}>
          components: {JSON.stringify(components)}
          app_layout: {JSON.stringify(app_layout)}
        </pre>
        <Layout
          layout_type={app_layout}
          components={components}
          data={session_data}
        />
      </div>
    );
  }
}

export default withRouter(TinyApp);
