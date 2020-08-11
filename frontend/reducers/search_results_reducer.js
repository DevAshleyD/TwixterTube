import {
    RECEIVE_SEARCH_RESULTS_USERS_AND_OR_VIDEOS,
    RECEIVE_ALL_VIDEOS,
    REMOVE_SEARCH_RESULTS
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

        case REMOVE_SEARCH_RESULTS:

            debugger

            return [];

        default:
            return [];

    }

}