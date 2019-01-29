import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import { GridList, GridTile } from  'material-ui/GridList';

class MediaResults extends Component {
  state ={
    dialogOpen: false,
    currentMedia: ""
  }

  handleOpen = media => {
    this.setState({dialogOpen: true, currentMedia: media});
  }
  handleClose = media => {
    this.setState({dialogOpen: false, currentMedia: ""});
  }

  render() {
    let mediaListContent;
    let { medias } = this.props;

    if(medias) {
      mediaListContent = (
        <GridList cols={3}>
          {medias.map(media =>(
            <GridTile
              title={media.tags}
              key={media.id}
              subtitle={
                <span>
                by <strong>{media.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(media)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
            if(media.largeImageURL) {
              <img src={media.largeImageURL} alt="image_here" />
            }else if (media.videos) {
              <video>
              <source src={media.videos.tiny.url} />
              </video>
            }
            </GridTile>
          ))}
        </GridList>
      )
    }else {
      mediaListContent = null;
    }
    let actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ]
    return (
      <div>
        {mediaListContent}
        <Dialog
          title={this.state.currentMedia.tags}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
        if(currentMedia.largeImageURL) {
          <img src={this.state.currentMedia.largeImageURL} alt="img_here" style={{width: '100%'}} />
        }else if (currentMedia.videos) {
          <video>
            <source src={this.state.currentMedia.videos.tiny.url} />
          </video>
        }
        </Dialog>
      </div>
    )
  }
}

MediaResults.propTypes = {
  medias: PropTypes.array.isRequired
}

export default MediaResults;
