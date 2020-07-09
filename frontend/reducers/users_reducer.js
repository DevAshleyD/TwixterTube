import { 
    RECEIVE_CURRENT_USER,
    RECEIVE_ALL_USERS
} from '../actions/session_actions';

import {
    RECEIVE_ALL_VIDEOS, RECEIVE_VIDEO,
    RECEIVE_ALL_VIDEOS_FROM_AUTHOR
} from '../actions/videos_actions';

import {
    RECEIVE_CONTENT_CREATOR
} from '../actions/user_actions'

export default ( state = {}, action ) => {
    Object.freeze(state);
    let newState = {};
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
            
        case RECEIVE_ALL_VIDEOS:
            newState = Object.assign({}, state, action.payload.users);
            return newState;

        case RECEIVE_VIDEO:
            newState = Object.assign({}, state, { [action.payload.user.id]: action.payload.user });
            return newState;

        case RECEIVE_CONTENT_CREATOR:
            return Object.assign({}, state, { [action.user.id]: action.user })

        // case RECEIVE_ALL_VIDEOS_FROM_AUTHOR:
        //     return Object.assign({}, state, { [action.payload.author.id]: action.payload.author })
        
        default:
            return state;
    };
}