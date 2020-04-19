import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  REMOVE_ALL_COMMENTS,
  REMOVE_CHILD_COMMENT,
} from "../actions/comments_actions";

import { RECEIVE_VIDEO } from "../actions/videos_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_VIDEO:
      if (!action.payload.comments) {
        return state;
      } else {
        return action.payload.comments;
      }

    case REMOVE_ALL_COMMENTS:
      return {};

    case RECEIVE_COMMENT:
      debugger;

      if (!!action.comment.parent_id) {
        newState = Object.assign({}, state);
        if (!newState[action.comment.parent_id].child_comments) {
          newState[action.comment.parent_id].child_comments = {};
        }
        newState[action.comment.parent_id].child_comments[action.comment.id] =
          action.comment;
      } else {
        newState = Object.assign({}, state, {
          [action.comment.id]: action.comment,
        });
      }

      return newState;

    case REMOVE_COMMENT:
      debugger;
      newState = Object.assign({}, state);
      delete newState[action.commentId];
      return newState;

    case REMOVE_CHILD_COMMENT:
      debugger;
      newState = Object.assign({}, state);
      delete newState[action.parentId].child_comments[action.commentId];
      return newState;

    default:
      return state;
  }
};
