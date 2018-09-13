import React, { Component } from "react";
import PropTypes from "prop-types";
import PhotoCard from "./PhotoCard";
import fetchJsonp from "fetch-jsonp";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  gridStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexGrow: 1,
    textJustify: "left"
  }
});

const api =
  "https://api.flickr.com/services/feeds/photos_public.gne?format=json";

class PhotoStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Photos: [],
      search: " "
    };
  }
  state = {
    search: " "
  };

  componentDidMount() {
    var that = this;
    fetchJsonp(api, {
      jsonpCallbackFunction: "jsonFlickrFeed"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        that.setState({
          Photos: json.items
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
     
  }

  render() {
    const { classes } = this.props;
    const Photos = this.state.Photos.map(Photos => {
      return (
        <PhotoCard
          key={Photos.link}
          photoTitle={Photos.title}
          titleLink={Photos.link}
          author={Photos.author.slice(20, -2)}
          authorLink={"https://www.flickr.com/people/" + Photos.author_id}
          description={Photos.description.replace(/<(?:.|\n)*?>/gm, "")}
          img={JSON.stringify(Photos.media).slice(6, -2)}
          tags={Photos.tags}
        />
      );
    });

    return (
      <div className={classes.photosList}>
        <Grid item xs={12} className={classes.gridStyle}>
          {Photos}
        </Grid>
      </div>
    );
  }
}

PhotoStream.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoStream);
