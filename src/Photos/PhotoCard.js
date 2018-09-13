import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 300,
    textAlign: "left"
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        <img src={props.img} alt="from Flickr" />
        <Typography component="p">
          <a href={props.titleLink}>{props.photoTitle} </a>
          by&nbsp;
          <a href={props.authorLink}>{props.author}</a>
        </Typography>
        Description:
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: props.description }}
        />
        <Typography component="p">Tags: {props.tags}</Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
