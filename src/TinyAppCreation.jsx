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
import CommentIcon from "@material-ui/icons/Comment";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import MapListView from "./MapListView";
import base from "./rebase";

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

class TinyAppCreation extends React.Component {
  constructor(props) {
    super(props);
    base.bindDoc("forms/test", {
      context: this,
      state: "app_def",
      withRefs: false
    });
    this.state = {
      checked: [0],
      open: true,
      app_def: {} /*{
      id: "AppDefForm",
      components: [
        {
          params: { data: [{ message: "message", title: "title" }] },
          type: "ElasticPanel"
        }
      ],
      layout: "box",
      sample_data: [{ message: "hello", title: "ok?" }]
    }*/
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  handleExpand = () => {
    this.setState(state => ({ open: !state.open }));
  };

  componentWillMount() {
    /*
     * Here we call 'bindCollection', which will update
     * our local 'messages' state whenever our 'chats'
     * Firebase endpoint changes.
     */
    console.log("TinyAppCreation componentWillMount");
  }

  render() {
    const { classes } = this.props;
    var mapdata = this.state.app_def.sample_data;
    var mapdata2 = this.state.app_def.components;
    var mapdata3 = this.state.app_def.layout;
    return (
      <div>
        <MapListView
          mapdata={this.state.app_def}
          list_title="app_def"
          level={0}
        />
      </div>
    );
  }
}

TinyAppCreation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TinyAppCreation);
