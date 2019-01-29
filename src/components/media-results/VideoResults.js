import React, { Component } from 'react';

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
    this.setState({dialogOpen: true, currentVideoTags: video.tags, currentVideo: video.videos.tiny.url});
  }
  handleClose = video => {
    this.setState({dialogOpen: false, currentVideoTags: "", currentVideo: ""});
  }

  setImage(pictureId) {
    return `https://i.vimeocdn.com/video/${pictureId}_640x360.jpg`;
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
            <img src={this.setImage(video.picture_id)} alt="img_here" />
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
          title={this.state.currentVideoTags}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
          <div className="videoWrapper">
            <video src={this.state.currentVideo} controls></video>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default VideoResults;
