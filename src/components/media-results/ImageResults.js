import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import { GridList, GridTile } from  'material-ui/GridList';

class ImageResults extends Component {
  state ={
    dialogOpen: false,
    currentImage: ""
  }

  handleOpen = img => {
    this.setState({dialogOpen: true, currentImage: img});
  }
  handleClose = img => {
    this.setState({dialogOpen: false, currentImage: ""});
  }

  render() {
    let imageListContent;
    let { images } = this.props;

    if(images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img =>(
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="image_here" />
            </GridTile>
          ))}
        </GridList>
      )
    }else {
      imageListContent = null;
    }
    let actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ]
    return (
      <div>
        {imageListContent}
        <Dialog
          title={this.state.currentImage.tags}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImage.largeImageURL} alt="img_here" style={{width: '100%'}} />
        </Dialog>
      </div>
    )
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
}

export default ImageResults;
