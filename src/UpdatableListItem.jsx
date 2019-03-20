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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import StatusSnackBar from "./StatusSnackBar";
import { SnackbarProvider, withSnackbar } from "notistack";

const styles = theme => ({
  root: {}
});
class UpdatableListItem extends React.Component {
  state = {
    item_key: this.props.item_key,
    params: this.props.params, //{ open_button_caption: "", dialog_title: "", dialog_desc: "", form_model:{key:"value"}, ok_button_caption:"", cancel_button_caption:"" }
    level: this.props.level,
    update_actions: [
      {
        setState: {
          firebase_doc_path: "/forms/test",
          model_name: "form_model"
        }
      }
    ],
    delete_actions: [
      {
        deleteState: {
          firebase_doc_path: "/forms/test",
          model_name: "form_model"
        }
      }
    ]
  };

  handleTextFieldChange = event => {
    //    console.log(event.target);
    //    console.log(event.target.id);
    this.setState({
      ...this.state,
      params: {
        ...this.props.params,
        form_model: {
          ...this.props.params.form_model,
          [event.target.id]: event.target.value
        }
      }
    });
    //    console.log(this.state.params);
  };

  handleUpdate = event => {
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
      this.state.update_actions
    );
    var result = handler.handle();
    console.log("result ", result);
    this.props.enqueueSnackbar("Update Action Status: " + result.status, {
      variant: "success"
    });
  };

  handleDelete = event => {
    event.preventDefault();
    var handler = new ActionsHandler(
      {
        ...this.state.params,
        status: "pending"
      },
      this.state.delete_actions
    );
    var result = handler.handle();
    console.log("result ", result);
    this.props.enqueueSnackbar("Delete Action Status: " + result.status, {
      variant: "success"
    });
  };

  render() {
    const { classes, children } = this.props;
    var key = Object.keys(this.props.params.form_model)[0];
    var value = this.props.params.form_model[key];

    return (
      <ListItem
        dense
        button
        style={{ paddingLeft: 32 * this.state.level - 16 }}
        key={this.props.item_key}
      >
        <FormControl className={classes.margin}>
          <InputLabel
            htmlFor="custom-css-standard-input"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused
            }}
          >
            {key}
          </InputLabel>
          <Input
            id={this.props.item_key}
            classes={{
              underline: classes.cssUnderline
            }}
            defaultValue={value}
            onBlur={this.handleTextFieldChange}
          />
        </FormControl>
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Remove"
            onClick={this.handleDelete}
            id={this.props.item_key}
          >
            <DeleteSweepIcon />
          </IconButton>
          <IconButton
            aria-label="Update"
            onClick={this.handleUpdate}
            id={this.props.item_key}
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
UpdatableListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(withSnackbar(UpdatableListItem)));
