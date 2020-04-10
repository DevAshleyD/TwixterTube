import { connect } from "react-redux";
import VideosIndex from "./video_index";
import { fetchVideos, removeAllVideos } from "../../actions/videos_actions";
import { withRouter } from "react-router";
import { attachListener, removeListener } from "../../actions/window_actions";

const msp = (state, ownProps) => {
  let videos = Object.values(state.entities.videos);
  let uploaders = videos.map((video) => {
    let user = state.entities.users[video.uploader_id];
    return user;
  });
  console.log("WHAT DOES INDEX STATE LOOK LIKE:   ", state);
  let url = ownProps.match.url;
  // console.log("WHAT DOES PROPS.MATCH.URL LOOK LIKE:   ", url, url === "/");
  let windowListener = state.ui.windowListener;

  console.log(
    "INSIDE VIDEO INDEX CONTAINER, WHAT DOES windowListener LOOK LIKE:    ",
    windowListener
  );
  return {
    videos: videos,
    uploaders: uploaders,
    url: url,
    windowListener,
  };
};

const mdp = (dispatch) => {
  return {
    fetchVideos: (query) => dispatch(fetchVideos(query)),
    removeAllVideos: () => dispatch(removeAllVideos()),
    attachListener: () => dispatch(attachListener()),
    removeListener: () => dispatch(removeListener()),
  };
};

export default connect(msp, mdp)(VideosIndex);
