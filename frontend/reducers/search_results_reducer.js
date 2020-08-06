import {
    RECEIVE_SEARCH_RESULTS_USERS_AND_OR_VIDEOS,
    RECEIVE_ALL_VIDEOS
} from '../actions/videos_actions';

export default (state = [], action) => {
    Object.freeze(state);
    
    switch(action.type) {

        case RECEIVE_SEARCH_RESULTS_USERS_AND_OR_VIDEOS:
            let payload = action.payload;

            debugger

            return payload;

        case RECEIVE_ALL_VIDEOS:
        
            debugger

            return [];

        default:
            return [];

    }

}