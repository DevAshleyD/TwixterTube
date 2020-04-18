import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import entitiesReducer from "./reducers/entities_reducer";
import usersReducer from "./reducers/users_reducer";
import * as Action from "./actions/session_actions";
import {
  deleteChildComment,
  addComment,
  deleteComment,
} from "./actions/comments_actions";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  let preLoadedState = {};
  if (window.currentUser) {
    preLoadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser,
        },
      },
      session: {
        currentUser: window.currentUser.id,
      },
    };
    store = configureStore(preLoadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // for development only

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  window.deleteChildComment = deleteChildComment;
  window.addComment = addComment;
  window.deleteComment = deleteComment;
  // window.logout = Action.logout;

  ReactDOM.render(<Root store={store} />, root);
});
