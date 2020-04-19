import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  // if want to implement logger, put as input/parameter in
  // applyMiddleware
};

export default configureStore;
