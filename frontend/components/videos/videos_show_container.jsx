import { connect } from "react-redux";
import VideoShow from "./video_show";
import * as VideoActions from "../../actions/videos_actions";
import * as VideoUtil from "../../util/videos_util";
import { removeAllComments } from "../../actions/comments_actions";

const msp = (state, ownProps) => {
  let currentUser = state.session.currentUser;
  let videos = Object.values(state.entities.videos);
  //   .sort(
  //   () => Math.random() - 0.5
  // );
  // console.log(
  //   "WHAT DOES THIS PAYLOAD LOOK LIKE IN THE CONTAINER:  ",
  //   state.entities.videoShow
  // );
  // let video = state.entities.videos[ownProps.match.params.videoId];
  let video = state.entities.videoShow ? state.entities.videoShow.video : null;
  // if like is positive, set css color to blue of like, vice verse for dislike
  let currentLike = state.entities.videoShow
    ? state.entities.videoShow.like
    : null;

  // let currentLike = state.entities.videos[ownProps.match.params.videoId].like;
  // let video = state.entities.videoShow;
  let uploader = video ? state.entities.users[video.uploader_id] : null;
  let url = ownProps.match.url;
  // console.log("VIDEO IN CONTAINER:   ", video);
  // console.log("UPLOADER IN VIDEO CONTAINER:  ", uploader)
  return {
    videos: videos,
    video: video,
    uploader: uploader,
    currentUser: currentUser,
    url: url,
    currentLike,

    // currentLike
    // fetchVideoUtil: VideoUtil.fetchVideo,
    // fetchVideoAction: VideoActions.receiveVideo,
    // updateViewCountUtil: VideoUtil.updateVideoViewCount

    // updateViewCountAction: VideoActions.updateViews
  };
};

const mdp = (dispatch) => {
  return {
    fetchVideos: () => dispatch(VideoActions.fetchVideos()),

    fetchVideo: (id) => dispatch(VideoActions.fetchVideo(id)),

    updateViewCount: (videoPayload) =>
      dispatch(VideoActions.updateViewCount(videoPayload)),

    removeAllVideos: () => dispatch(VideoActions.removeAllVideos()),
    removeVideoShow: () => dispatch(VideoActions.removeVideoShow()),
    removeAllComments: () => dispatch(removeAllComments()),
  };
};

export default connect(msp, mdp)(VideoShow);
