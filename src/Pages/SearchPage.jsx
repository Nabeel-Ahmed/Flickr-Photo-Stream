import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./../Components/SearchBar";
import Grid from "@material-ui/core/Grid";
import fetchJsonp from "fetch-jsonp";
import PhotoCard from "./../Photos/PhotoCard";
import { withStyles } from "@material-ui/core";

const api =
  "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=";

const styles = theme => ({
  gridStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexGrow: 1,
    textJustify: "left"
  }
});

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Photos: [],
      search: ""
    };
  }

  componentDidMount() {
    var that = this;
    fetchJsonp(api + this.state.search, {
      jsonpCallbackFunction: "jsonFlickrFeed"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(that, "this");
        that.setState({
          Photos: json.items
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      let name = e.target.name;
      let value = e.target.value;
      this.setState(function() {
        return { [name]: value };
      });
      this.componentDidMount();
    }
  };

  render() {
    const { classes } = this.props;
    const Photos = this.state.Photos.map(Photos => {
      return (
        <PhotoCard
          photoTitle={Photos.title}
          titleLink={Photos.link}
          author={Photos.author.slice(20, -2)}
          authorLink={"https://www.flickr.com/people/" + Photos.author_id}
          img={JSON.stringify(Photos.media).slice(6, -2)}
          tags={Photos.tags}
        />
      );
    });

    return (
      <div>
        <Grid item xs={12}>
          <SearchBar
            name="search"
            defaultValue={this.state.search}
            onKeyDown={this.handleKeyDown}
          />
        </Grid>
        <Grid xs={12} className={classes.gridStyle}>
          {Photos}
        </Grid>
      </div>
    );
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchPage);
