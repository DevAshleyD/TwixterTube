import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import videosReducer from "./videos_reducer";
import videoShowReducer from "./video_show_reducer";
import commentsReducer from "./comments_reducer";
import searchResultsReducer from './search_results_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  videos: videosReducer,
  videoShow: videoShowReducer,
  comments: commentsReducer,
  searchResults: searchResultsReducer
  // currentLike:
});

export default entitiesReducer;
