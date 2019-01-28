import React, { Component } from 'react';
import axios from 'axios';

import ImageResults from '../image-results/ImageResults';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class Search extends Component {
  state = {
    searchText: "",
    numberResults: 15,
    apiUrl: "https://pixabay.com/api/",
    apiKey: "",
    totalResults: 0,
    images: []
  }

  onSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value}, () => {
      if(this.state.searchText === "") {
        this.setState({images: []});
      }else {
        this.getResults();
      }
    });
  }

  onSelectChange = (event, index, value) => {
    this.setState({numberResults: value});
    this.getResults();
  }

  getResults() {
    axios.get(`${this.state.apiUrl}?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.numberResults}&safesearch=true`)
    .then(response => {
      this.setState({images: response.data.hits});
      this.setState({totalResults: response.data.totalHits})
      // console.log(response.data);
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
            floatingLabelText="Search for Images"
            fullWidth={true}
            autoFocus={true}
            >
          </TextField>
          <br />
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
          <br />
          <p>Currently Displaying: {this.state.images.length} |  Total Results: {this.state.totalResults}</p>
        </div>
        <div className="imageResults">{this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : null}</div>
      </div>
    )
  }
}

export default Search;
