import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import { GridList, GridTile } from  'material-ui/GridList';

class VideoResults extends Component {
  state ={
    dialogOpen: false,
    currentVideo: ""
  }

  handleOpen = video => {
    this.setState({dialogOpen: true, currentVideo: video});
  }
  handleClose = video => {
    this.setState({dialogOpen: false, currentVideo: ""});
  }

  render() {
    let videoListContent;
    let { videos } = this.props;

    if(videos) {
      videoListContent = (
        <GridList cols={3}>
          {videos.map(video =>(
            <GridTile
              title={video.tags}
              key={video.id}
              subtitle={
                <span>
                by <strong>{video.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(video)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <video>
                <source src={video.videos.tiny.url} />
              </video>
            </GridTile>
          ))}
        </GridList>
      )
    }else {
      videoListContent = null;
    }
    let actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ]
    return (
      <div>
        {videoListContent}
        <Dialog
          title={this.state.currentVideo.tags}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
          <video>
            <source src={this.state.currentVideo.videos.tiny.url} />
          </video>
        </Dialog>
      </div>
    )
  }
}

VideoResults.propTypes = {
  videos: PropTypes.array.isRequired
}

export default VideoResults;
