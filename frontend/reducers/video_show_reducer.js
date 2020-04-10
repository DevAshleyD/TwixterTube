import {
  RECEIVE_VIDEO,
  UPDATE_VIEW_COUNT,
  REMOVE_VIDEO_SHOW,
} from "../actions/videos_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = {};

  switch (action.type) {
    case RECEIVE_VIDEO:
      // console.log(
      //   "IN THE ACTIONS SHOW WHAT VIDEO SHOW PAYLOAD LOOKS LIKE: ",
      //   action.payload
      // );
      //   newState = Object.assign({}, state, {
      //     [action.payload.video.id]: action.payload.video
      //   });
      // newState = Object.assign({}, state, {
      //   like: action.payload.like,
      //   video: action.payload.video,
      //   user: action.payload.user,
      // });
      // console.log("WHAT VIDEO SHOW LOOKS LIKE IN REDUCER:   ", newState);
      return action.payload;

    case UPDATE_VIEW_COUNT:
      return action.payload;

    case REMOVE_VIDEO_SHOW:
      return {};

    default:
      return state;
  }
};
