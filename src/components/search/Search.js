import React, { Component } from 'react';
import axios from 'axios';

import API_KEY from '../ApiKey';
import ImageResults from '../media-results/ImageResults';
import VideoResults from '../media-results/VideoResults';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class Search extends Component {
  state = {
    searchText: "",
    numberResults: 15,
    apiUrl: "https://pixabay.com/api/",
    totalResults: 0,
    mediaType: "images",
    medias: []
  }

  onSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value}, () => {
      if(this.state.searchText === "") {
        this.setState({medias: []});
      }else {
        this.getResults();
      }
    });
  }

  onSelectChange = (event, index, value) => {
    if(value === "images" || value === "videos") {
      this.setState({mediaType: value});
    }else {
      this.setState({numberResults: value});
    }
  }

  getResults() {
    let url;
    if (this.state.mediaType === "images") {
      url = `${this.state.apiUrl}?key=${API_KEY}&q=${this.state.searchText}&per_page=${this.state.numberResults}&safesearch=true`;
    }else {
      url = `${this.state.apiUrl}videos/?key=${API_KEY}&q=${this.state.searchText}&per_page=${this.state.numberResults}&safesearch=true`;
    }
    axios.get(url)
    .then(response => {
      this.setState({medias: response.data.hits});
      this.setState({totalResults: response.data.totalHits})
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="searchContainer">
        <div className="searchRow">
          <TextField
            name="searchText"
            value={this.state.searchText}
            onChange={this.onSearchChange}
            floatingLabelText="Search for Media"
            fullWidth={true}
            autoFocus={true}
            >
          </TextField>
          <br />
          <div className="selectRow">
            <SelectField
              floatingLabelText="Number of Results"
              value={this.state.numberResults}
              onChange={this.onSelectChange}
              name="numberResults"
            >
              <MenuItem value={5} primaryText="5 Results" />
              <MenuItem value={15} primaryText="15 Results" />
              <MenuItem value={25} primaryText="25 Results" />
              <MenuItem value={50} primaryText="50 Results" />
              <MenuItem value={100} primaryText="100 Results" />
            </SelectField>
            <SelectField
              floatingLabelText="Media Type"
              value={this.state.mediaType}
              onChange={this.onSelectChange}
              name="mediaType"
              style={{margin: '10px', width: '150px'}}
            >
              <MenuItem value={"images"} primaryText="Images" />
              <MenuItem value={"videos"} primaryText="Videos" />
            </SelectField>
          </div>
          <br />
          <p>Currently Displaying: {this.state.medias.length} |  Total Results: {this.state.totalResults}</p>
        </div>
        <div className="mediaResults">
          {this.state.mediaType === "images" && this.state.medias.length > 0 ? <ImageResults images={this.state.medias} /> : null}
          {this.state.mediaType === "videos" && this.state.medias.length > 0  ? <VideoResults videos={this.state.medias} /> : null}
        </div>
      </div>
    )
  }
}

export default Search;
