import {
  RECEIVE_ALL_VIDEOS,
  RECEIVE_VIDEO,
  REMOVE_VIDEO,
  UPDATE_VIEW_COUNT,
  REMOVE_ALL_VIDEOS,
  RECEIVE_ALL_VIDEOS_FROM_AUTHOR,
  RECEIVE_MOST_VIEWED_VIDEO_FROM_AUTHOR,
  REMOVE_VIDEOS_FROM_CHANNEL
} from "../actions/videos_actions";

import {
  RECEIVE_CONTENT_CREATOR_ABOUT
} from '../actions/user_actions'

// RECEIVE_MOST_VIEWED_VIDEO_FROM_AUTHOR

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_VIDEOS:
      if (action.payload.videos) {
        return action.payload.videos;
      } else {
        return {};
      }

    // case RECEIVE_VIDEO:
    //   console.log(
    //     "IN THE ACTIONS SHOW WHAT PAYLOAD LOOKS LIKE: ",
    //     action.payload
    //   );
    //   // [action.payload.video.id]: action.payload.video
    //   // reason for sending payload to see if there is a like property
    //   // then check on component of like property exists, then do
    //   // proper css for highlighting proper like / dislike node
    //   newState = Object.assign({}, state, {
    //     [action.payload.video.id]: action.payload
    //   });
    //   return newState;

    // case UPDATE_VIEW_COUNT:
    //   newState = Object.assign({}, state, {
    //     [action.payload.video.id]: action.payload.video
    //   });
    //   return newState;

    // case RECEIVE_ALL_VIDEOS_FROM_AUTHOR:
    //   newState

    case REMOVE_VIDEO:
      newState = Object.assign({}, state);
      delete newState[action.videoId];
      return newState;

    case REMOVE_ALL_VIDEOS:
      return {};

    case RECEIVE_ALL_VIDEOS_FROM_AUTHOR:
      // let author = action.payload.author;
      debugger
      newState = action.payload.videos;
      debugger
      return newState;

    case RECEIVE_MOST_VIEWED_VIDEO_FROM_AUTHOR:
      let video = action.video;
      debugger
      if (video.id === null) {
        debugger
        return [];
      } else {
        debugger
        return [video];
      }

    case REMOVE_VIDEOS_FROM_CHANNEL:
      debugger
      return [];

    case RECEIVE_CONTENT_CREATOR_ABOUT:
      debugger
      return [];
    
    default:
      return state;
  }
};
