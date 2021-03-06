import React from "react";
import { Link, withRouter } from "react-router-dom";

class VideoIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleVidClick = this.handleVidClick.bind(this);
  }

  handleVidClick(e) {
    let vidId = this.props.video.id;
    this.props.history.push(`/videos/${vidId}`);
  }

  render() {
    let url = this.props.video.videoUrl;
    let thumbnail = this.props.video.thumbnailUrl;
    let author = "";
    this.props.uploaders.forEach(uploader => {
      if (uploader.id === this.props.video.uploader_id) {
        author = uploader;
      }
    });
    let title =
      this.props.video.title.length > 60
        ? this.props.video.title.slice(0, 60) + "..."
        : this.props.video.title;

    let views =
      this.props.video.views > 1000
        ? Math.floor(this.props.video.views / 1000) + "k"
        : this.props.video.views;

    return (
      <li className="video-item-container" onClick={this.handleVidClick}>
        {/* <video controls>
                    <source src={url}/>
                </video> */}
        {/* <button onClick={this.handleVidClick}>
                    <img src={thumbnail}/>
                </button> */}
        <div className="video-item-container-image">
          <img src={thumbnail} />
        </div>
        <div className="video-details">
          <h1>{title}</h1>
          <p id="vid-item-text">{author.username}</p>
          <p id="vid-item-text">
            {views} Views · {this.props.video.publishedAgo} ago
          </p>
          {/* <label>Description:
                        <p>{this.props.video.description}</p>
                    </label> */}
        </div>
      </li>
    );
  }
}

export default withRouter(VideoIndexItem);
