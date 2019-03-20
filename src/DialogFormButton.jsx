import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ActionsHandler from "./ActionsHandler";

const styles = theme => ({
  root: {}
});
class DialogFormButton extends React.Component {
  state = {
    open: false,
    params: this.props.params, //{ open_button_caption: "", dialog_title: "", dialog_desc: "", form_model:{key:"value"}, ok_button_caption:"", cancel_button_caption:"" }
    ok_button_action: this.props.ok_button_action // An actions list to be passed to actions handler[setState: {firebase_path: "/", value:{}}]
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTextFieldChange = event => {
    //    console.log(event.target);
    //    console.log(event.target.id);
    this.setState({
      ...this.state,
      params: {
        ...this.state.params,
        form_model: {
          ...this.state.params.form_model,
          [event.target.id]: event.target.value
        },
        submit_model: {
          [event.target.id == "key"
            ? event.target.value
            : this.state.params.form_model["key"]]:
            event.target.id == "value"
              ? event.target.value
              : this.state.params.form_model["value"]
        }
      }
    });
    console.log(this.state.params);
  };

  handleConfirm = event => {
    /*    var tmp_form_model = {};
    Object.keys(this.state.params.form_model).map(key => {
      var item = this.state.params.form_model[key];
      item += "conf";
      tmp_form_model[key] = item;
    });
    console.log(tmp_form_model);
*/
    event.preventDefault();
    var handler = new ActionsHandler(
      {
        ...this.state.params,
        status: "pending"
      },
      this.state.ok_button_action
    );
    var result = handler.handle();
    console.log("result ", result);
    this.setState({ open: false });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        {children ? (
          <IconButton
            aria-label={this.state.params.open_button_caption}
            onClick={this.handleClickOpen}
          >
            {children}
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            {this.state.params.open_button_caption}
          </Button>
        )}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby={this.state.params.dialog_title}
        >
          <DialogTitle id={this.state.params.dialog_title}>
            {this.state.params.dialog_title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.params.dialog_desc}
            </DialogContentText>
            {Object.keys(this.state.params.form_model).map(key => {
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  ref={key}
                  id={key}
                  label={key}
                  onBlur={this.handleTextFieldChange}
                  fullWidth
                  defaultValue={this.state.params.form_model[key]}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.state.params.cancel_button_caption}
            </Button>
            <Button onClick={this.handleConfirm} color="primary">
              {this.state.params.ok_button_caption}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
DialogFormButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(DialogFormButton));
