import React from "react";
import { Link, withRouter } from "react-router-dom";

class VideoShowIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(
      "WHAT DOES VIDEO LOOK LIKE IN VIDEO SHOW INDEX ITEM:   ",
      this.props.video
    );
  }

  handleClick(e) {
    this.props.history.replace(`/videos/${this.props.video.id}`);
  }

  render() {
    let title =
      this.props.video.title.length > 47
        ? this.props.video.title.slice(0, 47) + "..."
        : this.props.video.title;

    let views =
      this.props.video.views > 1000
        ? Math.floor(this.props.video.views / 1000) + "k"
        : this.props.video.views;
    return (
      <li className="video-show-list-item" onClick={this.handleClick}>
        <div className="video-show-list-item-image-container">
          <img src={this.props.video.thumbnailUrl} />
        </div>
        <div className="video-show-list-item-details">
          <h1>{title}</h1>
          <p>{this.props.uploader.username}</p>
          <p>
            {views} Views · {this.props.video.publishedAgo} ago
          </p>
        </div>
      </li>
    );
  }
}

export default withRouter(VideoShowIndexItem);
