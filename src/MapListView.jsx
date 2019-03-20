import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import StarBorder from "@material-ui/icons/StarBorder";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DialogFormButton from "./DialogFormButton";
import ActionsHandler from "./ActionsHandler";
import UpdatableListItem from "./UpdatableListItem";

//icon
import CommentIcon from "@material-ui/icons/Comment";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MapListView extends React.Component {
  state = {
    open: true,
    list_title: this.props.list_title,
    item_key: this.props.item_key,
    keydata: this.props.mapdata,
    level: this.props.level,
    add_key_button_params: {
      open_button_caption: "Add Key",
      dialog_title: "Input Key Name",
      dialog_desc: "You may input the key name here.",
      form_model: { key: "newkey", value: "newvalue" },
      submit_model: { newkey: "newvalue" },
      ok_button_caption: "Confirm",
      cancel_button_caption: "Cancel"
    },
    add_map_button_params: {
      open_button_caption: "Add Map",
      dialog_title: "Input Map Name",
      dialog_desc: "You may input the map name here.",
      form_model: { map_name: "newmap" },
      submit_model: { newmap: {} },
      ok_button_caption: "Confirm",
      cancel_button_caption: "Cancel"
    }
  };

  handleAdd = () => {
    console.log("handleAdd");
    this.setState(state => ({
      keydata: { ...state.keydata, new_tag: "New Value" }
    }));
  };

  handleExpand = () => {
    console.log("handleExpand");
    this.setState(state => ({ open: !this.state.open }));
  };

  render() {
    const { classes } = this.props;
    var keydata = this.props.mapdata;
    var list_title = this.state.list_title;
    console.log("render MapListView");
    console.log(this.state.open);
    console.log(keydata);
    var map_data_type =
      typeof keydata === "object"
        ? Array.isArray(keydata)
          ? "array"
          : "object"
        : "primitive";
    console.log(map_data_type);

    return !keydata ? (
      <pre>keydata is not found</pre>
    ) : (
      <List className={classes.root}>
        <ListItem
          dense
          button
          style={{ paddingLeft: 32 * this.state.level }}
          onClick={this.handleExpand}
        >
          {this.state.open ? (
            <KeyboardArrowDown onClick={this.handleExpand} />
          ) : (
            <KeyboardArrowRight onClick={this.handleExpand} />
          )}

          <ListItemText primary={list_title} />
          <ListItemSecondaryAction>
            <DialogFormButton
              params={this.state.add_key_button_params}
              ok_button_action={[
                {
                  setState: {
                    firebase_doc_path: "/forms/test",
                    model_name: "submit_model"
                  }
                }
              ]}
            >
              <PlaylistAddIcon />
            </DialogFormButton>
            <DialogFormButton
              params={this.state.add_button_params}
              ok_button_action={[
                {
                  setState: {
                    firebase_doc_path: "/forms/test",
                    model_name: "submit_model"
                  }
                }
              ]}
            >
              <AddCircleOutlineIcon />
            </DialogFormButton>
          </ListItemSecondaryAction>
        </ListItem>
        {map_data_type == "primitive" ? (
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                dense
                button
                style={{ paddingLeft: 32 * this.state.level - 16 }}
              >
                <ListItemText inset primary={keydata} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Update" onClick={this.handleUpdate}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>
        ) : (
          Object.keys(keydata).map(key => {
            var value =
              typeof keydata[key] === "object" ? "object" : keydata[key];
            var item_key = this.state.item_key
              ? this.state.item_key + "." + key
              : key;
            console.log("this.state.level", this.state.level);
            console.log("keydata.map key", key);
            console.log("keydata.map item_key", item_key);
            if (typeof keydata[key] === "object")
              return (
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <MapListView
                    mapdata={keydata[key]}
                    classes={this.props.classes}
                    list_title={key}
                    item_key={item_key}
                    level={this.state.level + 1}
                  />
                </Collapse>
              );
            else
              return (
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item_key} | {key}
                    <UpdatableListItem
                      params={{ form_model: { [item_key]: keydata[key] } }}
                      level={this.state.level + 1}
                      item_key={item_key}
                      list_title={list_title + "." + key}
                    />
                  </List>
                </Collapse>
              );
          })
        )}
      </List>
    );
  }
}

MapListView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapListView);
