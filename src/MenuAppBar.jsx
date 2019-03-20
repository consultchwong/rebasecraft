import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MUISwitch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter
} from "react-router-dom";
import * as firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseUnAuthed,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./rebase";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const LoginMenuItem = withRouter(({ history }) => (
  <MenuItem
    onClick={() => {
      history.push("/login");
    }}
  >
    Login
  </MenuItem>
));

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Messages
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <FirebaseAuthProvider {...config} firebase={firebase}>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>
                      <NavLink to="/labview">Lab View</NavLink>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <NavLink to="/authsample">authsample</NavLink>
                    </MenuItem>
                    <IfFirebaseUnAuthed>
                      <Link to="/login" push>
                        <MenuItem onClick={this.handleClose}>
                          another login
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={this.handleClose}>
                        <Link to="/login">登入</Link>
                      </MenuItem>
                    </IfFirebaseUnAuthed>
                    <IfFirebaseAuthed>
                      <Link to="/message">
                        <MenuItem onClick={this.handleClose}>messages</MenuItem>
                      </Link>
                      <MenuItem
                        onClick={() => {
                          firebase.auth().signOut();
                        }}
                      >
                        Sign Out
                      </MenuItem>
                    </IfFirebaseAuthed>
                  </Menu>
                </FirebaseAuthProvider>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(MenuAppBar));
