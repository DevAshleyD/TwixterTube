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
import { fetchSubscriptions } from './util/subscription_util';
import {
  removeSubscriptionData,
  getSubscription,
  createSubscription,
  destroySubscription
} from './actions/subscription_actions';

import {
  fetchMostViewedVideo,
  fetchVideos
} from './actions/videos_actions';

// import {fetchContentCreatorVids} from './actions/videos_actions';
import { 
  fetchContentCreatorVids,
  fetchVideo,
  // fetchVideos
  // fetchMostViewedVideo
} from './util/videos_util';

import {
  fetchBanner,
  fetchAuthor,
  fetchAuthorAbout
} from './util/user_util'

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
  
  // FOR DEVELOPMENT ONLY!!!!

  window.fetchVideos = fetchVideos;
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  
  window.fetchSubscriptions = fetchSubscriptions;

  window.fetchAuthor = fetchAuthor;

  window.fetchAuthorAbout = fetchAuthorAbout;
  
  // sub actions
  
  window.removeSubscriptionData = removeSubscriptionData;
  window.createSubscription = createSubscription;
  window.getSubscription = getSubscription;
  window.destroySubscription = destroySubscription;

  // content creator actions videos

  window.fetchContentCreatorVids = fetchContentCreatorVids;
  window.fetchVideo = fetchVideo;

  window.fetchMostViewedVideo = fetchMostViewedVideo;

  window.fetchBanner = fetchBanner;

  // window.deleteChildComment = deleteChildComment;
  // window.addComment = addComment;
  // window.deleteComment = deleteComment;

  // window.logout = Action.logout;

  // FOR DEVELOPMENT ONLY!!!!

  ReactDOM.render(<Root store={store} />, root);
});
