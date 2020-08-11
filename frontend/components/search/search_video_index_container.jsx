import { connect } from "react-redux";
import { fetchVideos, removeAllVideos, removeSearchResults } from "../../actions/videos_actions";
import { 
  createSubscription, 
  getSubscription, 
  destroySubscription, 
  removeSubscriptionData } from '../../actions/subscription_actions';
import SearchVideoIndex from "./search_video_index";

// change conditional logic on main component on line 23 to include search result portion of state

const msp = (state, ownProps) => {
  let videos = Object.values(state.entities.videos);
  let searchResults = state.entities.searchResults;
  let query = ownProps.match.params.query;
  let url = ownProps.match.url;
  let users = state.entities.users;
  let currentUser = state.session.currentUser ? state.entities.users[state.session.currentUser] : null;

  return {
    videos,
    searchResults,
    query,
    url,
    users,
    currentUser
  };

};

const mdp = (dispatch) => {
  return {
    fetchVideos: (query) => dispatch(fetchVideos(query)),
    removeAllVideos: () => dispatch(removeAllVideos()),
    createSubscription: (subData) => dispatch(createSubscription(subData)),
    getSubscription: (subData) => dispatch(getSubscription(subData)),
    destroySubscription: (subData) => dispatch(destroySubscription(subData)),
    removeSubscriptionData: (subData) => dispatch(removeSubscriptionData(subData)),
    removeSearchResults: () => dispatch(removeSearchResults())
  };
};

export default connect(msp, mdp)(SearchVideoIndex);
