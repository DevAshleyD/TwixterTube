import { REMOVE_LISTENER, ATTACH_LISTENER } from "../actions/window_actions";

const defaultState = false;

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REMOVE_LISTENER:
      return false;

    case ATTACH_LISTENER:
      return true;

    default:
      return state;
  }
};
