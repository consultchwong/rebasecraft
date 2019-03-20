import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    padding: "8px"
  },
  heading: {
    fontSize: 16,
    flexBasis: "25%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: 14,
    color: theme.palette.text.secondary
  }
});

class ElasticPanel extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        {this.props.data.map((value, key) => {
          console.log("key: ", key);
          return (
            <ExpansionPanel
              expanded={expanded === "panel" + key}
              onChange={this.handleChange("panel" + key)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {value.title}
                </Typography>
                <Typography className={classes.secondaryHeading} />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{value.message}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

ElasticPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ElasticPanel);
