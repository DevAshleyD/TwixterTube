import { connect } from "react-redux";
import { fetchVideos, removeAllVideos } from "../../actions/videos_actions";
import SearchVideoIndex from "./search_video_index";

// change conditional logic on main component on line 23 to include search result portion of state

const msp = (state, ownProps) => {
  let videos = Object.values(state.entities.videos);
  let searchResults = state.entities.searchResults;
  let query = ownProps.match.params.query;
  let url = ownProps.match.url;
  let users = state.entities.users;

  return {
    videos,
    searchResults,
    query,
    url,
    users,
  };
};

const mdp = (dispatch) => {
  return {
    fetchVideos: (query) => dispatch(fetchVideos(query)),
    removeAllVideos: () => dispatch(removeAllVideos()),
  };
};

export default connect(msp, mdp)(SearchVideoIndex);
