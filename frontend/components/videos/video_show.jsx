import React from "react";
import { Link, withRouter } from "react-router-dom";
import NavBarContainer from "../nav_bar/nav_bar_container";
import VideoShowIndexItem from "../videos/video_show_index_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { addLike, changeLike, removeLike } from "../../util/likes_util";
import CommentsIndexContainer from "../comments/comments_index_container";
import ModalSideBarContainer from "../sidebar/modal_sidebar_container";

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
    // let views = this.props.video ? this.props.video.views + 1 : 1;
    this.state = {
      currentUser: this.props.currentUser,
      video: this.props.video,
      loaded: false,
      views: 0,
      dislike: false, // highlight for dislike
      like: false, // highlight for like
      numberDislikes: 0,
      numberLikes: 0,
      height: "",
      videoContainer: null,
      videoShow: null,
      // url: this.props.match.url
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleVideoLike = this.handleVideoLike.bind(this);
    this.handleVideoDislike = this.handleVideoDislike.bind(this);
    this.videoContainer = React.createRef();
    this.videoShow = React.createRef();

    // this.getHeight = this.getHeight.bind(this);
    // this.shuffle = this.shuffle.bind(this);
  }

  // shuffle(array) {
  //     array.sort(() => Math.random() - 0.5);
  // }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    console.log("VIDEO SHOW WHAT IS UPLOADER:  ", this.props.uploader)

    let that = this;
    let id = this.props.match.params.videoId;

    this.props.fetchVideos();
    this.props.fetchVideo(id).then(() => {
      // console.log(
      //   "DOES VIDEO EXIST AFTER COMPONENTDIDMOUNT:  ",
      //   that.props.video
      // );
      that.props
        .updateViewCount({
          id: id,
          views: that.props.video.views + 1,
        })
        .then((s) => {
          if (!that.props.currentLike) {
            that.setState({
              loaded: true,
              views: that.props.video.views,
              numberLikes: that.props.video.likes,
              numberDislikes: that.props.video.dislikes,

              // url: this.props.match.url
            });
          } else {
            if (that.props.currentLike.liked) {
              that.setState({
                loaded: true,
                views: that.props.video.views,
                like: true,
                numberLikes: that.props.video.likes,
                numberDislikes: that.props.video.dislikes,
              });
            } else {
              that.setState({
                loaded: true,
                views: that.props.video.views,
                dislike: true,
                numberLikes: that.props.video.likes,
                numberDislikes: that.props.video.dislikes,
              });
            }
          }
        });
    });

    // this.setState({
    //   videoShow: this.videoShow,
    //   videoContainer: this.videoContainer,
    // });

    // window.addEventListener("resize", () => {
    //   console.log("WHAT IS WINDOW availHeight:  ", window.screen.availHeight);
    //   console.log("WHAT IS WINDOW height:  ", window.screen.height);
    // });
  }

  componentWillUnmount() {
    this.props.removeAllVideos();
    this.props.removeAllComments();
    this.props.removeVideoShow();
  }

  // getHeight() {
  //   this.setState({
  //     height: $("#video-wrapper").context.activeElement.clientHeight,
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    let that = this;
    let id = this.props.match.params.videoId;
    console.log("COMPONENT-DID-UPDATE UPLOADER:  ", this.props.uploader)

    if (this.props.match.url !== prevProps.match.url) {
      this.props.removeAllComments();
      this.props.fetchVideos();

      this.props.fetchVideo(id).then(() => {
        that.props
          .updateViewCount({
            id: id,
            views: that.props.video.views + 1,
          })
          .then((s) => {
            if (!that.props.currentLike) {
              that.setState({
                views: that.props.video.views,
                like: false,
                dislike: false,
                numberLikes: that.props.video.likes,
                numberDislikes: that.props.video.dislikes,
              });
            } else {
              if (that.props.currentLike.liked) {
                that.setState({
                  views: that.props.video.views,
                  like: true,
                  dislike: false,
                  numberLikes: that.props.video.likes,
                  numberDislikes: that.props.video.dislikes,
                });
              } else {
                that.setState({
                  views: that.props.video.views,
                  like: false,
                  dislike: true,
                  numberLikes: that.props.video.likes,
                  numberDislikes: that.props.video.dislikes,
                });
              }
            }
          });
      });
    }
  }

  handleEdit(e) {
    this.props.history.push(`/videos/${this.props.video.id}/edit`);
  }

  handleVideoLike() {
    if (!this.props.currentUser) {
      this.props.history.push("/login");
    } else {
      if (!!this.props.currentLike) {
        if (this.props.currentLike.liked === false) {
          changeLike({
            id: this.props.currentLike.id,
            liked: true,
            likeable_id: this.props.video.id,
            likeable_type: "Video",
          }).then(() =>
            this.props.fetchVideo(this.props.match.params.videoId).then(() => {
              this.setState({ dislike: false, like: true });
            })
          );
        } else {
          removeLike(this.props.currentLike.id).then(() =>
            this.props.fetchVideo(this.props.match.params.videoId).then(() => {
              this.setState({ dislike: false, like: false });
            })
          );
        }
      } else {
        addLike({
          liked: true,
          likeable_id: this.props.video.id,
          likeable_type: "Video",
        }).then(() =>
          this.props.fetchVideo(this.props.match.params.videoId).then(() => {
            this.setState({
              like: true,
              dislike: false,
            });
          })
        );
      }
    }
  }

  handleVideoDislike() {
    if (!this.props.currentUser) {
      this.props.history.push("/login");
    } else {
      if (!!this.props.currentLike) {
        if (this.props.currentLike.liked === true) {
          changeLike({
            id: this.props.currentLike.id,
            liked: false,
            likeable_id: this.props.video.id,
            likeable_type: "Video",
          }).then(() =>
            this.props.fetchVideo(this.props.match.params.videoId).then(() => {
              this.setState({ dislike: true, like: false });
            })
          );
        } else {
          removeLike(this.props.currentLike.id).then(() =>
            this.props.fetchVideo(this.props.match.params.videoId).then(() => {
              this.setState({ dislike: false, like: false });
            })
          );
        }
      } else {
        addLike({
          liked: false,
          likeable_id: this.props.video.id,
          likeable_type: "Video",
        }).then(() =>
          this.props.fetchVideo(this.props.match.params.videoId).then(() => {
            this.setState({
              like: false,
              dislike: true,
            });
          })
        );
      }
    }
  }

  render() {
    // if (!this.state.video) {
    //   return null;
    // }

    if (!this.state.loaded) {
      // console.log("DON'T LOAD VIDEO SHOW YET");
      return null;
    }

    let maxHeight = window.screen.height * 0.5675 + "px";

    // if (!!this.state.videoContainer.current) {
    //   maxHeight = this.state.videoContainer.current.offsetHeight * 0.38 + "px";
    //   console.log("WHAT IS WINDOW:   ", window);
    // }
    // console.log("SHOWING VIDEO SHOW NOW");
    let url = this.props.video.videoUrl;
    let videos = [];
    this.props.videos.slice(0, 10).forEach((video) => {
      if (this.props.video.id === video.id) {
        return null;
      }
      videos.push(
        <VideoShowIndexItem
          video={video}
          key={video.id}
          uploader={this.props.uploader}
        />
      );
      // videos.sort(() => Math.random() - 0.5);  // shuffles videos array
    });
    let editButton =
      this.props.currentUser &&
      this.props.video.uploader_id === this.props.currentUser ? (
        <button onClick={this.handleEdit} className="edit-button">
          Edit
        </button>
      ) : null;

    let like = this.state.like ? "thumbs-up-selected" : "thumbs-up";
    let dislike = this.state.dislike ? "thumbs-up-selected" : "thumbs-down";

    return (
      <div>
        <NavBarContainer url={this.props.url} />
        <ModalSideBarContainer />
        <div className="video-show-wrapper">
          <span> </span>
          <div className="video-show-page">
            <div
              className="video-show-page-wrapper"
              id="video-wrapper"
              ref={this.videoContainer}
            >
              <div className="video-show-page-internal-wrapper">
                <div className="video-show-left-box"> </div>
                <div className="video-show-container">
                  <div className="video-show-container-internal">
                    <div className="video-container">
                      <video
                        controls
                        key={url}
                        id="video-section"
                        ref={this.videoShow}
                        style={{ maxHeight: maxHeight }}
                      >
                        <source src={url} />
                      </video>
                    </div>

                    <div className="video-show-details">
                      <div className="video-show-details-top">
                        <div className="video-show-details-top-top">
                          <h1>{this.props.video.title}</h1>
                          {editButton}
                        </div>
                        <div className="video-show-details-top-bottom">
                          <p>
                            {this.numberWithCommas(this.state.views)} Views ·{" "}
                            {this.props.video.published}
                          </p>
                          <div className="like-system-container">
                            <div className="like-thumbs-container">
                              <div
                                className={like}
                                onClick={this.handleVideoLike}
                              >
                                <FontAwesomeIcon
                                  icon={faThumbsUp}
                                  id="thumbs-up-icon"
                                />
                                <strong>{this.props.video.likes}</strong>
                              </div>
                              <div
                                className={dislike}
                                onClick={this.handleVideoDislike}
                              >
                                <FontAwesomeIcon
                                  icon={faThumbsDown}
                                  id="thumbs-down-icon"
                                />
                                <strong>{this.props.video.dislikes}</strong>
                              </div>
                            </div>
                            <div className="like-bar"></div>
                          </div>
                        </div>
                        {/* <button onClick={this.handleEdit} className="edit-button">Edit</button> */}
                      </div>
                      <div className="video-show-details-bottom-container">
                          <Link to={this.props.uploader ? `/user/${this.props.uploader.id}` : `/`} style={{ textDecoration: "none", color: "white" }}>
                            <p className="current-user-icon-detail">
                              {this.props.uploader.username
                                .slice(0, 1)
                                .toUpperCase()}
                            </p>
                          </Link>
                        <div className="video-show-details-bottom">
                          <Link to={this.props.uploader ? `/user/${this.props.uploader.id}` : `/`} style={{ textDecoration: "none", color: "black" }}>
                            <h1>{this.props.uploader.username}</h1>
                          </Link>
                          <h2>Published on {this.props.video.published}</h2>
                          <p>{this.props.video.description}</p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="comments-container"></div> */}
                    <CommentsIndexContainer
                      videoId={this.props.video.id}
                      fetchVideo={this.props.fetchVideo}
                    />
                  </div>
                </div>
                <div className="video-show-index-container">
                  <h3>Up Next</h3>
                  <ul className="video-show-index-list">{videos}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideoShow);
